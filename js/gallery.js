const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
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

const galleryContainer = document.querySelector(".gallery");

const createGalleryItem = ({ preview, original, description }) => {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery-item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery-link");
  galleryLink.href = original;

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery-image");
  galleryImage.src = preview;
  galleryImage.alt = description;
  galleryImage.setAttribute("data-source", original);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
};

const appendGalleryItems = () => {
  const galleryFragment = document.createDocumentFragment();
  images.forEach((image) => {
    const galleryItem = createGalleryItem(image);
    galleryFragment.appendChild(galleryItem);
  });
  galleryContainer.appendChild(galleryFragment);
};

appendGalleryItems();

// =========== Modal window ===========

let activeLightbox = null;

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();

  const target = event.target;
  const galleryItem = target.closest(".gallery-item");

  if (!galleryItem) {
    return;
  }

  const originalImageURL =
    galleryItem.querySelector(".gallery-image").dataset.source;

  // Lightbox instance with BIG image
  const lightboxContent = `
    <img src="${originalImageURL}" alt="Image" />
  `;

  const lightboxOptions = {
    onShow: () => {
      document.addEventListener("keydown", handleKeyDown);
    },
    onClose: () => {
      document.removeEventListener("keydown", handleKeyDown);
    },
  };

  activeLightbox = basicLightbox.create(lightboxContent, lightboxOptions);

  // Open modal window
  activeLightbox.show();
});

// To close a modal window when the Escape key is pressed
const handleKeyDown = (event) => {
  if (event.key === "Escape" && activeLightbox) {
    activeLightbox.close();
  }
};
