/* Add every gallery photo to this one list. No event labels are needed. */
const GALLERY_IMAGES = [
  "assets/gallery/1.jpg",
  "assets/gallery/2.jpg",
  "assets/gallery/3.jpg",
  "assets/gallery/4.jpg",
  "assets/gallery/5.jpg",
  "assets/gallery/6.jpg",
  "assets/gallery/7.jpg",
  "assets/gallery/8.jpg",
  "assets/gallery/9.jpg",
  "assets/gallery/10.jpg",
  "assets/gallery/11.jpg",
  "assets/gallery/12.jpg",
  "assets/gallery/13.jpg"
];

(function () {
  const gridEl = document.querySelector(".gallery-grid");
  const emptyEl = document.querySelector(".gallery-empty");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  if (!gridEl) return;

  const activeImages = GALLERY_IMAGES;
  let activeIndex = 0;

  function renderGrid() {
    gridEl.innerHTML = "";

    if (activeImages.length === 0) {
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    activeImages.forEach((src, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", `Open photo ${i + 1}`);
      const img = document.createElement("img");
      img.src = src;
      img.loading = "lazy";
      img.alt = `Gallery photo ${i + 1}`;
      btn.appendChild(img);
      btn.addEventListener("click", () => openLightbox(i));
      gridEl.appendChild(btn);
    });
  }

  function openLightbox(index) {
    activeIndex = index;
    lightboxImg.src = activeImages[activeIndex];
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
  }

  function step(delta) {
    if (activeImages.length === 0) return;
    activeIndex = (activeIndex + delta + activeImages.length) % activeImages.length;
    lightboxImg.src = activeImages[activeIndex];
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => step(-1));
  lightboxNext.addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  renderGrid();
})();
