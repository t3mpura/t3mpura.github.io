/* ============================================================
   T3MPURA PHOTO GALLERY — HOW TO ADD YOUR OWN PHOTOS
   ============================================================
   1. Make a folder for the event inside assets/gallery/
      e.g.  assets/gallery/my-new-show/

   2. Drop your photos in there. Any filenames are fine.

   3. Add one entry to the EVENTS array below:

        {
          id: "my-new-show",              <- unique, no spaces
          label: "My New Show",           <- shown on the tab
          images: [
            "assets/gallery/my-new-show/IMG_001.jpg",
            "assets/gallery/my-new-show/IMG_002.jpg"
          ]
        }

   4. Save this file, push to GitHub. No build step, no server —
      it's just a list of image paths.

   To remove an event, delete its entry (and folder, if you want).
   The first event in the list opens by default.
   ============================================================ */

const GALLERY_EVENTS = [
  {
    id: "the-hangout-artscape-2",
    label: "The Hangout @ Artscape 2",
    images: [
      "assets/gallery/the-hangout-artscape-2/1.jpg",
      "assets/gallery/the-hangout-artscape-2/2.jpg"
    ]
  },
  {
    id: "toronto-takeover",
    label: "Toronto Takeover",
    images: [
      "assets/gallery/toronto-takeover/1.jpg",
      "assets/gallery/toronto-takeover/2.jpg"
    ]
  }
];

(function () {
  const tabsEl = document.querySelector(".gallery-tabs");
  const gridEl = document.querySelector(".gallery-grid");
  const emptyEl = document.querySelector(".gallery-empty");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  if (!tabsEl || !gridEl || GALLERY_EVENTS.length === 0) return;

  let activeImages = [];
  let activeIndex = 0;

  function renderTabs(activeId) {
    tabsEl.innerHTML = "";
    GALLERY_EVENTS.forEach((event) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = event.label;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(event.id === activeId));
      btn.addEventListener("click", () => showEvent(event.id));
      tabsEl.appendChild(btn);
    });
  }

  function renderGrid(event) {
    gridEl.innerHTML = "";
    activeImages = event.images || [];

    if (activeImages.length === 0) {
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    activeImages.forEach((src, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", `Open photo ${i + 1} from ${event.label}`);
      const img = document.createElement("img");
      img.src = src;
      img.loading = "lazy";
      img.alt = `${event.label} — photo ${i + 1}`;
      btn.appendChild(img);
      btn.addEventListener("click", () => openLightbox(i));
      gridEl.appendChild(btn);
    });
  }

  function showEvent(id) {
    const event = GALLERY_EVENTS.find((e) => e.id === id);
    if (!event) return;
    renderTabs(id);
    renderGrid(event);
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

  showEvent(GALLERY_EVENTS[0].id);
})();
