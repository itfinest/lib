/**
 * @author Ertha Dwi Setiyawan
 */
document.addEventListener('DOMContentLoaded', () => {
    const WS_URL = 'wss://maserta.my.id:7676/ws';
    const DEFAULT_TOKEN = 'erthaganteng';
    const SEND_DEBOUNCE_MS = 300;
    const RECONNECT_MIN_MS = 2000;
    const RECONNECT_MAX_MS = 30000;

    const SVG_GEAR =
        '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mt-spin">' +
        '<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>' +
        '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>' +
        '</svg>';
    const SVG_CHECK =
        '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>';

    const state = {
        base: readDataUser(),
        cid: getClientId(),
        ip: null,
        device: null,
        battery: null,
        location: null,
        logout: findLogoutUrl(),
    };
    const browser = getBrowser();
    let socket = null;
    let reconnectDelay = RECONNECT_MIN_MS;
    let sendTimer = null;

    // Socket dibuka lebih dulu agar pengguna langsung tercatat online; data yang lambat (IP, baterai,
    // lokasi) dikirim ulang begitu tersedia, karena server menimpa payload pada setiap event newuser.
    openSocket();
    getDevice().then(v => { state.device = v; scheduleSend(); });
    getIP().then(v => { state.ip = v; scheduleSend(); });
    getBattery().then(v => { state.battery = v; scheduleSend(); });
    getLocation().then(v => { state.location = v; scheduleSend(); });

    function openSocket() {
        const token = typeof window.uo_access_token === 'string' && window.uo_access_token ? window.uo_access_token : DEFAULT_TOKEN;
        socket = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}&cid=${encodeURIComponent(state.cid)}`);

        socket.onopen = () => {
            reconnectDelay = RECONNECT_MIN_MS;
            sendUser();
        };
        socket.onerror = e => console.warn('WebSocket error:', e);
        socket.onclose = () => {
            // Jeda bertambah dua kali lipat sampai 30 detik, dengan sedikit acak agar klien tidak menyambung serentak.
            const delay = reconnectDelay + Math.floor(Math.random() * 1000);
            reconnectDelay = Math.min(reconnectDelay * 2, RECONNECT_MAX_MS);
            setTimeout(openSocket, delay);
        };
        socket.onmessage = handleMessage;
    }

    function handleMessage(e) {
        let msg;
        try {
            msg = JSON.parse(e.data);
        } catch {
            return;
        }

        if (msg.event === 'id' && typeof msg.data === 'string') {
            // Server mengganti ID yang bentrok; ID yang diterima dipakai untuk koneksi berikutnya.
            state.cid = msg.data;
            try { sessionStorage.setItem('uo_cid', msg.data); } catch { /* sessionStorage tidak tersedia, ID berlaku untuk halaman ini saja */ }
            return;
        }
        if (msg.event !== 'private') return;

        const cmd = msg.data?.data;
        if (!cmd || typeof cmd.act !== 'string') return;

        if (cmd.act === 'logout') {
            const url = safeHttpUrl(cmd.url);
            if (url) window.location.href = url;
        } else if (cmd.act === 'maintenance') {
            showModal(cmd.title, cmd.message);
        } else if (cmd.act === 'finish_maintenance') {
            showModal(cmd.title, cmd.message, true);
        }
    }

    function scheduleSend() {
        clearTimeout(sendTimer);
        sendTimer = setTimeout(sendUser, SEND_DEBOUNCE_MS);
    }

    function sendUser() {
        if (!socket || socket.readyState !== WebSocket.OPEN) return;
        socket.send(JSON.stringify({ event: 'newuser', data: buildUserData() }));
    }

    function buildUserData() {
        const payload = { ...state.base.payload };
        const link = payload.Link || window.location.href;
        delete payload.Link;

        if (state.ip) payload.IP = state.ip;
        if (state.device) payload.Device = state.device;
        if (state.battery) payload.Baterai = state.battery;
        payload.Browser = browser;
        if (state.location) {
            payload.Lokasi = `<a href="https://www.google.com/maps?q=${state.location.coords}" target="_blank" rel="noopener noreferrer">` +
                `${state.location.coords} (±${state.location.accuracy} m)</a>`;
        }
        payload.Link = link;
        if (state.logout) payload.logout = state.logout;

        return replaceBrowserPlaceholder({ serialkey: state.base.serialkey, payload });
    }

    function readDataUser() {
        const source = typeof window.data_user === 'object' && window.data_user !== null ? window.data_user : null;
        const copy = source ? JSON.parse(JSON.stringify(source)) : {};
        return {
            serialkey: typeof copy.serialkey === 'string' && copy.serialkey ? copy.serialkey : window.location.hostname,
            payload: typeof copy.payload === 'object' && copy.payload !== null && !Array.isArray(copy.payload) ? copy.payload : {},
        };
    }

    // Aplikasi klien boleh menaruh teks "[browser]" di data_user; semua kemunculannya diganti nama browser.
    function replaceBrowserPlaceholder(value) {
        if (typeof value === 'string') return value.split('[browser]').join(browser);
        if (Array.isArray(value)) return value.map(replaceBrowserPlaceholder);
        if (value && typeof value === 'object') {
            const out = {};
            for (const [k, v] of Object.entries(value)) out[k] = replaceBrowserPlaceholder(v);
            return out;
        }
        return value;
    }

    function getClientId() {
        try {
            const saved = sessionStorage.getItem('uo_cid');
            if (saved) return saved;
            const id = randomHex(16);
            sessionStorage.setItem('uo_cid', id);
            return id;
        } catch {
            return randomHex(16);
        }
    }

    function safeHttpUrl(value, base = window.location.href) {
        if (typeof value !== 'string' || !value) return null;
        try {
            const url = new URL(value, base);
            return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
        } catch {
            return null;
        }
    }

    function findLogoutUrl() {
        for (const a of document.querySelectorAll('a')) {
            for (const attr of a.attributes) {
                if (!/^(data-)?href$/i.test(attr.name)) continue;
                const url = safeHttpUrl(attr.value);
                if (!url) continue;
                const { pathname, search } = new URL(url);
                if (/log-?out|sign-?out|keluar/i.test(pathname + search)) return url;
            }
        }
        return null;
    }

    function getLocation() {
        return new Promise(resolve => {
            if (!('geolocation' in navigator)) return resolve(null);
            navigator.geolocation.getCurrentPosition(
                p => resolve({
                    coords: p.coords.latitude.toFixed(6) + ',' + p.coords.longitude.toFixed(6),
                    accuracy: Math.round(p.coords.accuracy),
                }),
                () => resolve(null),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 }
            );
        });
    }

    async function getIP() {
        try {
            const cached = sessionStorage.getItem('user_ip');
            if (cached) return cached;
        } catch { /* sessionStorage tidak tersedia, IP diambil ulang */ }
        try {
            const ip = (await (await fetch('https://api.ipify.org?format=json')).json()).ip;
            try { sessionStorage.setItem('user_ip', ip); } catch { /* cache opsional */ }
            return ip;
        } catch {
            return null;
        }
    }

    function getBrowser() {
        const ua = navigator.userAgent;
        const pick = (name, re) => (name + ' ' + (ua.match(re)?.[1] || '')).trim();
        if (ua.includes('Edg/')) return pick('Edge', /Edg\/([\d.]+)/);
        if (ua.includes('OPR/')) return pick('Opera', /OPR\/([\d.]+)/);
        if (ua.includes('SamsungBrowser/')) return pick('Samsung Internet', /SamsungBrowser\/([\d.]+)/);
        if (ua.includes('Firefox/')) return pick('Firefox', /Firefox\/([\d.]+)/);
        if (ua.includes('FxiOS/')) return pick('Firefox', /FxiOS\/([\d.]+)/);
        if (ua.includes('CriOS/')) return pick('Chrome', /CriOS\/([\d.]+)/);
        if (ua.includes('Chrome/')) return pick('Chrome', /Chrome\/([\d.]+)/);
        if (ua.includes('Safari/')) return pick('Safari', /Version\/([\d.]+)/);
        return 'Tidak diketahui';
    }

    async function getDevice() {
        const ua = navigator.userAgent;
        const uaData = navigator.userAgentData;
        // Browser berbasis Chromium menyamarkan versi OS dan model di UA; nilai aslinya ada di high entropy hints.
        let hints = {};
        if (uaData?.getHighEntropyValues) {
            try {
                hints = await uaData.getHighEntropyValues(['platformVersion', 'model', 'bitness']);
            } catch { /* hints tidak diizinkan, pakai UA */ }
        }

        const mem = navigator.deviceMemory ? navigator.deviceMemory + ' GB' : '';
        const isIPadDesktopUA = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
        const isMobile = uaData?.mobile ?? /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
        let emoji = '💻', device = 'Desktop', os = '', arch = '';

        if (isIPadDesktopUA || /iPad/.test(ua)) {
            emoji = '📟'; device = 'iPad';
            const v = ua.match(/OS ([\d_]+)/)?.[1];
            os = v ? 'iPadOS ' + v.replace(/_/g, '.') : 'iPadOS';
        } else if (/iPhone/.test(ua)) {
            emoji = '📱'; device = 'iPhone';
            const v = ua.match(/iPhone OS ([\d_]+)/)?.[1];
            os = v ? 'iOS ' + v.replace(/_/g, '.') : 'iOS';
        } else if (/Android/i.test(ua)) {
            emoji = '📱';
            os = 'Android ' + (ua.match(/Android\s([\d.]+)/i)?.[1] || '');
            const uaModel = ua.match(/Android\s[\d.]+;\s*([^);]+)/i)?.[1]?.trim();
            device = hints.model || (uaModel && uaModel !== 'K' ? uaModel : '') || (isMobile ? 'Android' : 'Tablet Android');
        } else if (/Windows NT/.test(ua)) {
            const major = parseInt((hints.platformVersion || '').split('.')[0], 10);
            os = major >= 13 ? 'Windows 11' : ua.includes('Windows NT 10.0') ? 'Windows 10'
                : ua.includes('Windows NT 6.3') ? 'Windows 8.1' : ua.includes('Windows NT 6.1') ? 'Windows 7' : 'Windows';
            arch = hints.bitness ? hints.bitness + '-bit' : (/WOW64|Win64|x64/.test(ua) ? '64-bit' : '32-bit');
        } else if (/Macintosh|Mac OS X/.test(ua)) {
            os = 'macOS';
        } else if (/CrOS/.test(ua)) {
            os = 'ChromeOS';
        } else if (/Linux/.test(ua)) {
            os = 'Linux';
            if (/x86_64|aarch64/.test(ua)) arch = '64-bit';
        }

        const info = [os.trim(), arch, mem].filter(Boolean).join(' ');
        return info ? `${emoji} ${device} (${info})` : `${emoji} ${device}`;
    }

    async function getBattery() {
        if (!navigator.getBattery) return null;
        try {
            const b = await navigator.getBattery();
            return (b.charging ? '⚡ Mengisi daya' : '🔋') + ' ' + Math.round(b.level * 100) + '%';
        } catch {
            return null;
        }
    }

    function randomHex(len) {
        const bytes = new Uint8Array(len / 2);
        crypto.getRandomValues(bytes);
        return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    }

    function modalConfig(isFinished) {
        return isFinished
            ? {
                icon: SVG_CHECK,
                defaultTitle: 'Pemeliharaan Selesai',
                defaultMessage: 'Sistem sudah dapat digunakan kembali. Silakan muat ulang halaman.',
                buttonColor: '#047857',
                titleColor: '#065f46',
                buttonText: 'Tutup',
                progressBar: '',
            }
            : {
                icon: SVG_GEAR,
                defaultTitle: 'Pemeliharaan Sistem',
                defaultMessage: 'Sistem sedang dalam perbaikan. Mohon tunggu beberapa saat.',
                buttonColor: '#b45309',
                titleColor: '#92400e',
                buttonText: 'Tutup',
                progressBar: '<div class="mt-progress"><div></div></div>',
            };
    }

    // Judul dan pesan dari server hanya disisipkan lewat textContent, tidak pernah lewat innerHTML.
    function buildModalHtml() {
        return `
<style>
  #maintenance-modal { position: fixed; inset: 0; z-index: 2147483000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
  #maintenance-modal .mt-overlay { position: absolute; inset: 0; background: rgba(17, 24, 39, 0.5); }
  #maintenance-modal .mt-card { position: relative; width: 100%; max-width: 400px; background: #fff; border-radius: 12px; padding: 28px 24px 24px; text-align: center; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18); }
  #maintenance-modal .maintenance-icon-container { display: flex; justify-content: center; margin-bottom: 16px; }
  #maintenance-modal .maintenance-title { margin: 0 0 8px; font-size: 18px; font-weight: 600; line-height: 1.4; }
  #maintenance-modal .maintenance-message { margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: #4b5563; }
  #maintenance-modal .maintenance-progress { display: flex; justify-content: center; }
  #maintenance-modal .mt-progress { width: 100%; max-width: 280px; height: 4px; margin: 4px 0 16px; background: #e5e7eb; border-radius: 2px; overflow: hidden; }
  #maintenance-modal .mt-progress > div { width: 40%; height: 100%; background: #b45309; border-radius: 2px; animation: mt-progress 1.6s ease-in-out infinite; }
  #maintenance-close { min-width: 120px; min-height: 44px; padding: 10px 20px; border: 0; border-radius: 8px; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; }
  #maintenance-close:focus-visible { outline: 2px solid #111827; outline-offset: 2px; }
  #maintenance-modal .mt-spin { animation: mt-spin 4s linear infinite; }
  #maintenance-modal.mt-enter .mt-card { animation: mt-in 200ms ease-out; }
  #maintenance-modal.mt-leave { animation: mt-out 200ms ease-in forwards; }
  @keyframes mt-progress { from { transform: translateX(-100%); } to { transform: translateX(250%); } }
  @keyframes mt-spin { to { transform: rotate(360deg); } }
  @keyframes mt-in { from { opacity: 0; transform: translateY(8px); } }
  @keyframes mt-out { to { opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    #maintenance-modal *, #maintenance-modal { animation: none !important; }
  }
</style>
<div class="mt-overlay"></div>
<div class="mt-card" role="dialog" aria-modal="true" aria-labelledby="maintenance-title" aria-describedby="maintenance-message">
  <div class="maintenance-icon-container"></div>
  <h2 class="maintenance-title" id="maintenance-title"></h2>
  <p class="maintenance-message" id="maintenance-message"></p>
  <div class="maintenance-progress"></div>
  <button type="button" id="maintenance-close"></button>
</div>`;
    }

    function showModal(title, message, isFinished = false) {
        const cfg = modalConfig(isFinished);
        let modal = document.getElementById('maintenance-modal');
        if (modal) clearTimeout(modal._closeTimer);

        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'maintenance-modal';
            modal.innerHTML = buildModalHtml();
            document.body.appendChild(modal);

            const close = () => {
                modal.classList.remove('mt-enter');
                modal.classList.add('mt-leave');
                modal._closeTimer = setTimeout(() => {
                    modal.style.display = 'none';
                    modal.classList.remove('mt-leave');
                    modal.dataset.open = '0';
                    document.body.style.overflow = modal.dataset.prevOverflow || '';
                }, 200);
            };
            modal.querySelector('#maintenance-close').addEventListener('click', close);
            modal.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
        }

        modal.querySelector('.maintenance-icon-container').innerHTML = cfg.icon;
        const t = modal.querySelector('.maintenance-title');
        t.textContent = typeof title === 'string' && title ? title : cfg.defaultTitle;
        t.style.color = cfg.titleColor;
        modal.querySelector('.maintenance-message').textContent = typeof message === 'string' && message ? message : cfg.defaultMessage;
        modal.querySelector('.maintenance-progress').innerHTML = cfg.progressBar;
        const btn = modal.querySelector('#maintenance-close');
        btn.textContent = cfg.buttonText;
        btn.style.background = cfg.buttonColor;

        // Kunci scroll dipasang setiap kali modal tampil, termasuk tampilan kedua dan seterusnya.
        // Nilai overflow asli hanya dicatat saat modal berpindah dari tertutup ke terbuka.
        if (modal.dataset.open !== '1') {
            modal.dataset.prevOverflow = document.body.style.overflow || '';
            modal.dataset.open = '1';
        }
        document.body.style.overflow = 'hidden';
        modal.style.display = 'flex';
        modal.classList.remove('mt-leave');
        modal.classList.add('mt-enter');
        btn.focus();
    }
});
