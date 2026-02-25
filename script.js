/* ---------- Extract Video ID ---------- */
function extractVideoId(url) {
    if (!url) return null;

    try {
        new URL(url);
    } catch {
        return null;
    }

    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    return match ? match[1] : null;
}


/* ---------- DOM Ready ---------- */
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("youtubeUrl");
    const clearBtn = document.getElementById("clearBtn");
    const errorDiv = document.getElementById("error");
    const resultsDiv = document.getElementById("results");
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    /* ---------- Enter Key Support ---------- */
    if (input) {
        input.addEventListener("keydown", function(e) {
            if (e.key === "Enter") generateThumbnail();
        });

        /* Show / Hide Clear Button */
        input.addEventListener("input", () => {
            if (clearBtn) {
                clearBtn.classList.toggle("hidden", input.value.length === 0);
            }
        });
    }

    /* ---------- Clear Input ---------- */
    if (clearBtn && input) {
        clearBtn.addEventListener("click", () => {
            input.value = "";
            input.focus();
            clearBtn.classList.add("hidden");
        });
    }

    /* ---------- FAQ Toggle ---------- */
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling;
            const arrow = button.querySelector(".faq-arrow");

            if (answer) answer.classList.toggle("hidden");
            if (arrow) arrow.classList.toggle("rotate-180");
        });
    });

    /* ---------- Mobile Menu ---------- */
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        document.querySelectorAll("#mobileMenu a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }

});


/* ---------- Generate Thumbnail ---------- */
function generateThumbnail() {

    const input = document.getElementById("youtubeUrl");
    const errorDiv = document.getElementById("error");
    const resultsDiv = document.getElementById("results");

    if (!input || !errorDiv || !resultsDiv) return;

    const url = input.value.trim();

    errorDiv.textContent = "";
    resultsDiv.innerHTML = "";

    const videoId = extractVideoId(url);

    if (!videoId || videoId.length !== 11) {
        errorDiv.textContent = "Please enter a valid YouTube URL.";
        return;
    }

    const qualities = {
        "Ultra High": "maxresdefault.jpg",
        "High": "hqdefault.jpg",
        "Medium": "mqdefault.jpg",
        "Standard": "sddefault.jpg",
        "Low": "default.jpg"
    };

    resultsDiv.innerHTML = `
        <div class="relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
            <div class="bg-[#1f1f2a] p-6 rounded-2xl text-center">

                <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                    ${Object.keys(qualities).map((label, index) => `
                        <button 
                            onclick="changeQuality('${videoId}', '${qualities[label]}', this)"
                            class="quality-btn ${index === 0 ? 'bg-pink-600' : 'bg-gray-800'} hover:bg-pink-600 text-sm py-2 rounded-lg transition">
                            ${label}
                        </button>
                    `).join("")}
                </div>

                <img id="thumbnailPreview"
                     src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg"
                     onerror="this.onerror=null; this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg';"
                     class="w-full rounded-lg mb-6">

                <button 
                    onclick="downloadImage(document.getElementById('thumbnailPreview').src, '${videoId}')"
                    class="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-lg text-sm transition">
                    Download
                </button>

            </div>
        </div>
    `;
}


/* ---------- Change Quality ---------- */
function changeQuality(videoId, qualityFile, btn) {

    const img = document.getElementById("thumbnailPreview");
    if (!img) return;

    img.onerror = function () {
        this.onerror = null;
        this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    img.src = `https://img.youtube.com/vi/${videoId}/${qualityFile}`;

    document.querySelectorAll(".quality-btn").forEach(b => {
        b.classList.remove("bg-pink-600");
        b.classList.add("bg-gray-800");
    });

    if (btn) {
        btn.classList.remove("bg-gray-800");
        btn.classList.add("bg-pink-600");
    }
}


/* ---------- Download Image (CORS Safe) ---------- */
function downloadImage(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}