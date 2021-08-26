const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  gallery: document.querySelector(".js-gallery"),
  closeBtn: document.querySelector(".lightbox__button"),
  openPhoto: document.querySelector(".js-lightbox"),
  modalPhoto: document.querySelector(".lightbox__image"),
  closeBtnoverlay: document.querySelector(".lightbox__overlay"),
};

function markup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}
const galleryMarkup = markup(galleryItems);
refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup);

refs.gallery.addEventListener("click", onGalleryClick);
function onGalleryClick(e) {
  e.preventDefault();
  const isImg = e.target.classList.contains("gallery__image");
  if (!isImg) {
    return;
  }

  refs.openPhoto.classList.add("is-open");
  refs.modalPhoto.src = e.target.dataset.source;
}

refs.closeBtn.addEventListener("click", toggleOpen);
refs.closeBtnoverlay.addEventListener("click", toggleOpen);

function toggleOpen(e) {
  refs.openPhoto.classList.toggle("is-open");
  refs.modalPhoto.src = "";
}

document.addEventListener("keyup", slider);
let imageIdx = 0;
function slider(e) {
  if (e.code === "ArrowRight") {
    imageIdx += 1;
    if (imageIdx >= galleryItems.length) {
      imageIdx = 0;
    }
  }
  if (e.code === "ArrowLeft") {
    imageIdx -= 1;
    if (imageIdx < 0) {
      imageIdx = galleryItems.length - 1;
    }
  }
  refs.modalPhoto.src = galleryItems[imageIdx].original;
}

document.addEventListener("keyup", clEsc);
function clEsc(e) {
  console.log(e.code);
  if (e.code === "Escape") {
    toggleOpen();
  }
} // срабатывает через раз в Сафари СПРОСИТЬ У ЮРЫ!!!
// e.preventDefault(); НЕ РАБОТАЕТ
