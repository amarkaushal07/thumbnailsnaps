function extractVideoId(e){try{let t=new URL(e);if(t.searchParams.get("v"))return t.searchParams.get("v");if("youtu.be"===t.hostname)return t.pathname.slice(1);if(t.pathname.includes("/shorts/"))return t.pathname.split("/shorts/")[1].split("/")[0];if(t.pathname.includes("/embed/"))return t.pathname.split("/embed/")[1].split("/")[0];return null}catch{return null}}async function downloadImage(e,t){try{let n=await fetch(e),l=await n.blob(),a=window.URL.createObjectURL(l),i=document.createElement("a");i.href=a,i.download=t+".jpg",document.body.appendChild(i),i.click(),document.body.removeChild(i)}catch{alert("Download failed. Try again.")}}function generateThumbnail(){let e=document.getElementById("youtubeUrl").value.trim(),t=document.getElementById("error"),n=document.getElementById("results");t.textContent="",n.innerHTML="";let l=extractVideoId(e);if(!l||11!==l.length){t.textContent="Please enter a valid YouTube URL.";return}let a={"Ultra High":"maxresdefault.jpg",High:"hqdefault.jpg",Medium:"mqdefault.jpg",Standard:"sddefault.jpg",Low:"default.jpg"};n.innerHTML=`
        <div class="relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">

        <div class="bg-[#1f1f2a] p-6 rounded-2xl text-center">
            
            <!-- QUALITY BUTTONS -->
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                ${Object.keys(a).map((e,t)=>`
                    <button onclick="changeQuality('${l}', '${a[e]}', this)"
                        class="quality-btn ${0===t?"bg-pink-600":"bg-gray-800"} hover:bg-pink-600 text-sm py-2 rounded-lg transition">
                        ${e}
                    </button>
                `).join("")}
            </div>

            <!-- PREVIEW IMAGE (Auto fallback if maxres not available) -->
            <img id="thumbnailPreview"
                 src="https://img.youtube.com/vi/${l}/maxresdefault.jpg"
                 onerror="this.onerror=null; this.src='https://img.youtube.com/vi/${l}/hqdefault.jpg';"
                 class="w-full rounded-lg mb-6">

            <!-- DOWNLOAD BUTTON -->
            <button onclick="downloadImage(document.getElementById('thumbnailPreview').src, '${l}')"
                class="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-lg text-sm">
                Download
            </button>

        </div>
        </div>
    `}function changeQuality(e,t,n){let l=document.getElementById("thumbnailPreview");l.onerror=function(){this.onerror=null,this.src=`https://img.youtube.com/vi/${e}/hqdefault.jpg`},l.src=`https://img.youtube.com/vi/${e}/${t}`,document.querySelectorAll(".quality-btn").forEach(e=>{e.classList.remove("bg-pink-600"),e.classList.add("bg-gray-800")}),n.classList.remove("bg-gray-800"),n.classList.add("bg-pink-600")}document.getElementById("youtubeUrl").addEventListener("keypress",function(e){"Enter"===e.key&&generateThumbnail()}),document.querySelectorAll(".faq-question").forEach(e=>{e.addEventListener("click",()=>{let t=e.nextElementSibling,n=e.querySelector(".faq-arrow");t.classList.toggle("hidden"),n.classList.toggle("rotate-180")})}),document.getElementById("menuBtn").addEventListener("click",function(){document.getElementById("mobileMenu").classList.toggle("hidden")}),document.querySelectorAll("#mobileMenu a").forEach(e=>{e.addEventListener("click",()=>{document.getElementById("mobileMenu").classList.add("hidden")})});
//# sourceMappingURL=ThumbnailSnaps.f7ed115d.js.map
