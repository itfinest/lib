function convertSpeed(e){var t=-1;do{e/=1024,t++}while(e>1024);return Math.max(e,.1).toFixed(1)+" "+["KB","MB","GB","TB","PB","EB","ZB","YB"][t]}function formatFileSize(e,t){var r=["Bytes","KB","MB","GB","TB"];if(0==e)return"n/a";var a=parseInt(Math.floor(Math.log(e)/Math.log(1024)));return 0==a?e+" "+r[a]:(e/Math.pow(1024,a)).toFixed(1)+" "+r[a]}var codemirrorEditor,_OBJECT_URL,filename;(parsingurl=new URLSearchParams(window.location.search),page=parsingurl.get("page"),act=parsingurl.get("act"),dir=parsingurl.get("dir"),type=parsingurl.get("type"),file=parsingurl.get("file"),$(".btn-backup").on("click",function(e){e.preventDefault();var t=$(this);if(files=[],$(".cekfiles").each(function(){!0===$(this).is(":checked")&&files.push($(this).val())}),0===files.length)return toastr.error("Belum ada file yang dipilih!","Warning"),!1;t.html('<i class="fa fa-circle-o-notch fa-spin"></i> Proses Backup'),$("button").attr("disabled",!0),$.post(`${baseurl}`,{backup:"",files:files},function(e){let r=JSON.parse(e);!0===r.status?window.location.reload():(toastr.error(r.pesan,"Warning"),t.html('<i class="fa fa-database"></i> Backup'),$("button").removeAttr("disabled",!0))})}),$(".click-menu").on("click",function(e){e.preventDefault();var t=$(this);$(".menus"+t.data("hash")).html('<div class="text-center"><small><i class="fa fa-circle-o-notch fa-spin"></i> Processing</small></div>'),$.post(`${baseurl}?page=list_breadcrumb`,{path:t.data("path")},function(e){$(".menus"+t.data("hash")).html(atob(e))})}),$(".btn-copy").on("click",function(e){if(e.preventDefault(),files=[],$(".cekfiles").each(function(){!0===$(this).is(":checked")&&files.push($(this).val())}),0===files.length)return toastr.error("Belum ada file yang dipilih!","Warning"),!1;window.location.href=`${baseurl}?page=copy&dir=${dir}&files=${files.join("@")}`}),$(".btn-move").on("click",function(e){if(e.preventDefault(),files=[],$(".cekfiles").each(function(){!0===$(this).is(":checked")&&files.push($(this).val())}),0===files.length)return toastr.error("Belum ada file yang dipilih!","Warning"),!1;window.location.href=`${baseurl}?page=move&dir=${dir}&files=${files.join("@")}`}),$("#showpass").on("click",function(e){!0===$(this).is(":checked")?$(".pass").attr("type","text"):$(".pass").attr("type","password")}),"setting"===page&&$("#form-setting").on("submit",function(e){e.preventDefault();var t=$(this);$.ajax({url:`${baseurl}?page=simpan`,type:"post",data:t.serializeArray(),success:function(e){window.location.reload()}})}),loadListDirectory=(()=>{$(".list_directory").html('<div class="mt-3"><div class="box"></div><div class="box"></div><div class="box"></div></div>'),$.get(`${baseurl}?page=list`,{folder:folder},function(e){$(".list_directory").html(e)})}),"edit"!==page&&"confirmation"!==page&&"add"!==page&&loadListDirectory(),"edit"===page)&&($(".loading").show(),$.post(`${baseurl}`,{read_file:"",file:file},function(e){$(".loading").hide(),$("#codearea").fadeIn("slow").show(),document.querySelector("#codearea").value=window.atob(window.atob(window.atob(e))),codemirrorEditor=CodeMirror.fromTextArea(document.getElementById("codearea"),{lineNumbers:!0,theme:"monokai",matchBrackets:!0,mode:{name:"javascript",startOpen:!0},indentUnit:4,indentWithTabs:!0,lineWrapping:!0})}),$(window).bind("keydown",function(e){if(e.ctrlKey||e.metaKey)switch(String.fromCharCode(e.which).toLowerCase()){case"s":e.preventDefault();var t=codemirrorEditor.getValue(),r=$(".pathfile").val(),a=$(".password").val(),o=new XMLHttpRequest;if(""===a.trim())return toastr.error("Password can't empty!","Warning"),!1;$("button").html('<i class="fa fa-circle-o-notch fa-spin"></i> Saving...').attr("disabled",!0),o.onload=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.response);1==e.status?toastr.success(e.response,"Information"):toastr.error(e.response,"Warning"),$("button").html('<i class="fa fa-save"></i> Simpan').removeAttr("disabled")}else alert("Target server reached, but it returned an error")},o.onerror=function(){},o.open("POST",baseurl,!0),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),o.send("savefile=&path="+r+"&password="+a+"&content="+encodeURIComponent(t))}}),$(".btn-simpan-file").on("click",function(e){e.preventDefault();var t=$(this),r=codemirrorEditor.getValue(),a=$(".pathfile").val(),o=$(".password").val(),n=new XMLHttpRequest;if(""===o.trim())return toastr.error("Password can't empty!","Warning"),!1;$(this).html('<i class="fa fa-circle-o-notch fa-spin"></i> Saving...').attr("disabled",!0),n.onload=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.response);1==e.status?toastr.success(e.response,"Information"):toastr.error(e.response,"Warning"),t.html('<i class="fa fa-save"></i> Simpan').removeAttr("disabled")}else alert("Target server reached, but it returned an error")},n.onerror=function(){},n.open("POST",baseurl,!0),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),n.send("savefile=&path="+a+"&password="+o+"&content="+encodeURIComponent(r))}));("add"===page&&"folder"===type&&$("#form-add-folder").on("submit",function(e){e.preventDefault();var t=$(this);$("button").attr("disabled",!0),$.ajax({url:`${baseurl}`,type:"post",data:t.serializeArray(),dataType:"json",success:function(e){!0===e.status?(toastr.success(e.pesan,"Success"),setTimeout(()=>{window.history.back()},1e3)):(toastr.error(e.pesan,"Warning"),$("button").removeAttr("disabled"))}})}),"add"===page&&"file"===type)&&(codemirrorEditor=CodeMirror.fromTextArea(document.getElementById("codearea"),{lineNumbers:!0,theme:"monokai",matchBrackets:!0,mode:{name:"javascript",startOpen:!0},indentUnit:4,indentWithTabs:!0,lineWrapping:!0}),$("#form-add-file").on("submit",function(e){e.preventDefault();var t=new FormData(this),r=codemirrorEditor.getValue();t.append("content",r),$("button").attr("disabled",!0),$.ajax({url:`${baseurl}`,type:"post",data:t,processData:!1,contentType:!1,dataType:"json",success:function(e){!0===e.status?(toastr.success(e.pesan,"Success"),setTimeout(()=>{window.history.back()},1e3)):(toastr.error(e.pesan,"Warning"),$("button").removeAttr("disabled"))}})}));("confirmation"===page&&$("form").on("submit",function(e){e.preventDefault();var t=$(this),r=$(this).find("button").text(),a=$(this).find("button");a.html(`<i class="fa fa-circle-o-notch fa-spin"></i> ${r}`).attr("disabled",!0),$.ajax({url:`${baseurl}`,type:"post",data:t.serializeArray(),dataType:"json",success:function(e){!0===e.status?(toastr.success(e.pesan,"Success"),setTimeout(()=>{window.history.back()},1e3)):(toastr.error(e.pesan,"Warning"),a.html(`${r}`).removeAttr("disabled"))}})}),"move"!==page&&"copy"!==page||$("form").on("submit",function(e){e.preventDefault();var t=$(this),r=$(this).find("button").text(),a=$(this).find("button");a.html(`<i class="fa fa-circle-o-notch fa-spin"></i> ${r}`).attr("disabled",!0),$.ajax({url:`${baseurl}`,type:"post",data:t.serializeArray(),dataType:"json",success:function(e){!0===e.status?(toastr.success(e.pesan,"Success"),setTimeout(()=>{window.history.back()},1e3)):(toastr.error(e.pesan,"Warning"),a.html(`${r}`).removeAttr("disabled"))}})}),"downloadbackup"===page)&&document.querySelector("#download-button").addEventListener("click",function(e){e.preventDefault();var t=$(".password").val();document.querySelector("#download-button").setAttribute("disabled","disabled"),$.post(`${baseurl}`,{downloadbackup:"",password:t},function(e){let r=JSON.parse(e);if(!0===r.status){var a=new XMLHttpRequest,o=(new Date).getTime();filename=r.filename,namefile=r.name,$(".show-download").fadeIn("slow").show(),$(".show-download a").attr("href",filename),a.addEventListener("readystatechange",function(e){if(2==a.readyState&&200==a.status)document.querySelector("#download-button").style.display="none",document.querySelector("#download-button").setAttribute("disabled","disabled"),document.querySelector("#save-file").style.display="none",document.querySelector(".showpassword").style.display="none",document.querySelector("#btn-back").style.display="none",document.querySelector(".showprogress").style.display="block";else if(3==a.readyState);else if(4==a.readyState)try{_OBJECT_URL=URL.createObjectURL(a.response),document.querySelector(".showprogress").style.display="none",document.querySelector("#save-file").setAttribute("href",_OBJECT_URL),document.querySelector("#save-file").setAttribute("download",namefile),document.querySelector("#save-file").style.display="block",document.querySelector(".progress").style.display="none",$.post(`${baseurl}`,{deletefile:"",filename:filename,password:t},function(e){}),document.querySelector("#btn-back").style.display="block",document.querySelector("#btn-back").addEventListener("click",function(e){window.location.reload()})}catch(e){toastr.error(e,"Warning"),document.querySelector("#btn-back").style.display="none",document.querySelector("#download-button").style.display="block",document.querySelector("#download-button").removeAttribute("disabled"),document.querySelector(".showprogress").style.display="none"}}),a.addEventListener("progress",function(e){var t=e.loaded/e.total*100,r=((new Date).getTime()-o)/1e3,a=e.loaded/r,n=a/1024;n=Math.floor(n);var s=(e.total-e.loaded)/a,i=s%60,l=s/60;i=Math.floor(i),l=Math.floor(l),document.querySelector(".progress-bar").style.width=t+"%",document.querySelector(".progress-bar").innerHTML=parseFloat(t).toFixed(2)+"%",document.querySelector(".progress-text").innerHTML=convertSpeed(a)+" / s<br>"+(l>0?l+" min ":"")+i+" sec remaining"}),a.responseType="blob",a.open("get",filename),a.send()}else toastr.error(r.response,"Warning"),document.querySelector("#download-button").removeAttribute("disabled")})});"confirmation"===page&&"download"===act&&(document.querySelector("#cekzip").addEventListener("click",function(e){0==this.value?this.value=1:this.value=0}),document.querySelector("#download-button").addEventListener("click",function(e){e.preventDefault();var t=$(".password").val(),r=document.getElementById("cekzip").value,a=document.getElementById("file").value;document.querySelector("#download-button").setAttribute("disabled","disabled"),$.post(`${baseurl}`,{download:"",password:t,iszip:r,file:a},function(e){let r=JSON.parse(e);if(!0===r.status){var a=new XMLHttpRequest,o=(new Date).getTime();filename=r.filename,namefile=r.name,$(".show-download").fadeIn("slow").show(),$(".show-download a").attr("href",filename),a.addEventListener("readystatechange",function(e){if(2==a.readyState&&200==a.status)document.querySelector("#download-button").style.display="none",document.querySelector("#save-file").style.display="none",document.querySelector(".showpassword").style.display="none",document.querySelector("#btn-back").style.display="none",document.querySelector(".showprogress").style.display="block",document.querySelector("#download-button").setAttribute("disabled","disabled");else if(3==a.readyState)console.log("error");else if(4==a.readyState)try{_OBJECT_URL=URL.createObjectURL(a.response),document.querySelector(".showprogress").style.display="none",document.querySelector("#save-file").setAttribute("href",_OBJECT_URL),document.querySelector("#save-file").setAttribute("download",namefile),document.querySelector("#save-file").style.display="block",document.querySelector(".progress").style.display="none",$.post(`${baseurl}`,{deletefile:"",filename:filename,password:t},function(e){}),document.querySelector("#btn-back").style.display="block",document.querySelector("#btn-back").addEventListener("click",function(e){window.location.reload()})}catch(e){toastr.error(e,"Warning"),document.querySelector("#btn-back").style.display="none",document.querySelector("#download-button").style.display="block",document.querySelector("#download-button").removeAttribute("disabled"),document.querySelector(".showprogress").style.display="none"}}),a.addEventListener("progress",function(e){var t=e.loaded/e.total*100,r=((new Date).getTime()-o)/1e3,a=e.loaded/r,n=a/1024;n=Math.floor(n);var s=(e.total-e.loaded)/a,i=s%60,l=s/60;i=Math.floor(i),l=Math.floor(l),document.querySelector(".progress-bar").style.width=t+"%",document.querySelector(".progress-bar").innerHTML=parseFloat(t).toFixed(2)+"%",document.querySelector(".progress-text").innerHTML=convertSpeed(a)+" / s<br>"+(l>0?l+" min ":"")+i+" sec remaining"}),a.responseType="blob",a.open("get",filename),a.send()}else toastr.error(r.response,"Warning"),document.querySelector("#download-button").removeAttribute("disabled")})}));if("add"===page&&"upload"===type){function hideSub(){$("#deleteZip").prop("checked",!1),$("#sub").hasClass("hidden")?$("#sub").removeClass("hidden"):$("#sub").addClass("hidden")}function checkOptions(e){if($("#extractZip").is(":checked")){if($("#deleteZip").is(":checked"))t='{"fileName":"'+e+'","deleteXpo":"true"}';else var t='{"fileName":"'+e+'"}';document.querySelector("#submit-btn").innerHTML='<i class="fa fa-circle-o-notch fa-spin"></i> Proses Ekstrak',document.querySelector("#submit-btn").setAttribute("disabled","disabled"),$.ajax({url:baseurl,data:{unzip:"",path:path,Xpo:t},method:"POST",success:function(e){"success"==(e=JSON.parse(e)).unzip?toastr.success("Finished"):toastr.error("Uploaded But error occured while extracting","Warning"),document.querySelector("#submit-btn").innerHTML="Upload",document.querySelector("#submit-btn").removeAttribute("disabled")},error:function(e){toastr.error("Failed"),document.querySelector("#submit-btn").innerHTML="Upload",document.querySelector("#submit-btn").removeAttribute("disabled")}})}else toastr.success("Finished"),document.querySelector("#submit-btn").innerHTML="Upload",document.querySelector("#submit-btn").removeAttribute("disabled")}path=document.querySelector(".path").value,$(function(){$(document).on("change",":file",function(){var e=$(this),t=e.get(0).files?e.get(0).files.length:1,r=e.val().replace(/\\/g,"/").replace(/.*\//,"");e.trigger("fileselect",[t,r])}),$(document).ready(function(){$(":file").on("fileselect",function(e,t,r){var a=$(this).parents(".input-group").find(":text"),o=t>1?t+" files selected":r;a.length?a.val(o):o&&alert(o)})})}),function(){function e(e){return document.getElementById(e)}var t,r,a;if((a=document.createElement("input")).setAttribute("type","file"),"object"==typeof a.files){var o=524288,n=[];function s(e){return Math.ceil(e.size/o)}window.onload=function(){t=e("formUpload");var a=document.querySelector(".formUpload-file");for(i in a)if("object"==typeof a&&"file"==a.getAttribute("type")){var d=a;break}t.reset(),t.onsubmit=function(a){var s;a.preventDefault(),function a(s,i,d){if(i>=d)return t.reset(),n=[],!1;var c=n["data-start"];void 0===c&&(c=0),c>0&&c++;for(var u=0,p=0;p<c;p++){var u=u+o;u>s[i].size&&(u=s[i].size)}document.querySelector("#submit-btn").innerHTML='<i class="fa fa-circle-o-notch fa-spin"></i> Proses Upload',document.querySelector("#submit-btn").setAttribute("disabled","disabled"),function t(a,n,s,i,d,c){if(void 0!==a){void 0===n&&(console.log("index:: "+n),n=0,console.log("index:: "+n));var u=s+o;u>a.size&&(u=a.size),function(e,t,r,a){var o;o=e.webkitSlice?e.webkitSlice(t,r):e.mozSlice?e.mozSlice(t,r):e.slice(t,r),e.webkitSlice?l(o,function(e){a(e)}):a(o)}(a,s,u,function(o){var l=new FileReader;l.onload=function(l){for(var p=l.target?l.target:l.srcElement,f="",m=new Uint8Array(p.result),b=m.byteLength,y=0;y<b;y++)f+=String.fromCharCode(m[y]);var h=md5(f);f=void 0;var v=new XMLHttpRequest;v.onreadystatechange=function(){if(4==v.readyState){console.log(v.response);var o=JSON.parse(v.response);if(void 0!==typeof o.response&&!0!==o.response)return toastr.error(o.response,"Warning"),!1;void 0!==typeof o.error&&"E_HASH"===o.error?window.setTimeout(function(){t(a,n,s,i,d,c)},1e3):(e("progress-bar"),document.querySelector("#progress-bar").style.display="flex",document.querySelector(".progress-bar").style.width=parseInt(o.percent)+"%",document.querySelector(".progress-bar").innerHTML=parseInt(o.percent)+"%",document.querySelector(".info_size").innerHTML=`<span>File : ${o.filename}<br>\n\t\t\t\t\t\t\t\t\t\t\t\tTerupload ${formatFileSize(o.upload_size)} dari ${formatFileSize(o.total_size)}</span>`,100===o.percent&&(console.log("Finished"),hideSub(),checkOptions(r)),++n<i?window.setTimeout(function(){t(a,n,u,i,d,c)},100):c())}},void 0!==n&&null!=n||(console.log("index:: "+n),n=0,console.log("index:: "+n)),v.open("post",baseurl+"?page=upload",!0),v.setRequestHeader("X-File-Name",a.name),v.setRequestHeader("X-Index",n),v.setRequestHeader("X-Total",i),v.setRequestHeader("X-Hash",h),v.setRequestHeader("X-Path",path),v.setRequestHeader("X-Size",d),v.send(o)},l.readAsArrayBuffer(o)})}else console.log("stop")}(s[i],c,u,n["data-end"],n["data-size"],function(){a(s,++i,d)})}(s=d.files,0,s.length)},d.onchange=function(e){var t=(e.target?e.target:e.srcElement).files;for(var a in t)if("object"==typeof t[a]){var o=!1,i=document.querySelector(".formUpload-file");if(i.setAttribute("data-name",t[a].name),i.setAttribute("data-end",s(t[a])),"function"==typeof i.getAttribute){r=i.getAttribute("data-name"),Data_name=r;var l=s(t[a]);if(r==t[a].name&&l==i.getAttribute("data-end")){var d={"data-start":i.getAttribute("data-start"),"data-end":i.getAttribute("data-end"),"data-size":t[a].size};n=d,o=!0}}if(!1===o){d={"data-start":0,"data-end":s(t[a]),"data-size":0};n=d}}}};var l=function(e,t){var r,a=window.MozBlobBuilder||window.WebKitBlobBuilder||window.BlobBuilder;if(void 0!==a){var o=new a;o.append(e),r=o.getBlob()}else r=new Blob([e]);var n=new FileReader;n.onload=function(e){var r=e.target?e.target:e.srcElement;t(r.result)},n.readAsArrayBuffer(r)}}else window.onload=function(){t=e("formUpload");document.querySelector(".formUpload-file");t.reset(),t.onsubmit=function(e){var t=document.createElement("img");t.setAttribute("src","loading.gif"),t.setAttribute("alt","loading"),this.appendChild(t)},file_input.onchange=function(e){var t="File selected";void 0!==typeof e&&(e.preventDefault(),t=(e.target?e.target:e.srcElement).value||"File selected");for(var r=document.getElementById("toupload").getElementsByTagName("ul")[0];r.hasChildNodes();)r.removeChild(r.firstChild);var a=document.createElement("li");a.appendChild(document.createTextNode(t)),r.appendChild(a)}}}()}$("#login").on("submit",function(e){e.preventDefault();var t=$(this),r=$(this).find("button").text(),a=$(this).find("button");a.html(`<i class="fa fa-circle-o-notch fa-spin"></i> ${r}`).attr("disabled",!0),$.ajax({url:`${baseurl}`,type:"post",data:t.serializeArray(),dataType:"json",success:function(e){!0===e.status?(toastr.success(e.pesan,"Success"),setTimeout(()=>{window.location.reload()},1e3)):(toastr.error(e.pesan,"Warning"),a.html(`${r}`).removeAttr("disabled"))}})});
