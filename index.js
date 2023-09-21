// Constants for Unsplash API
const UNSPLASH_CLIENT_ID = "pctAHxLMdHeSPaFFbJa5uIAGjjVoUra_NK4x-1Bu8t0";
const UNSPLASH_API_BASE_URL = "https://api.unsplash.com/photos/";

// Selecting HTML elements
const list = document.querySelector(".list");
const inputField = document.querySelector("#input");
const listItems = document.createElement("div");

const categoryElements = document.querySelectorAll(".category");

listItems.className = "list";
list.appendChild(listItems);
let isShowMore = false;

// Display an initial message
const emptyMessage = document.createElement("h1");
emptyMessage.textContent = "Search for Images Here";
list.appendChild(emptyMessage);

// Function to handle image search
const searchHandle = (queryText, pageNo) => {
  const searchURL = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_CLIENT_ID}&page=${pageNo}&query=${queryText}`;

  const fetchImages = async () => {
    const response = await fetch(searchURL);
    const data = await response.json();

    // Remove the initial message
    emptyMessage.remove();

    if (data.results.length === 0) {
      // No images found, display a message and hide "Show More" button
      displayNoImageFoundMessage();
      hideShowMoreButton();
    } else {
      // Populate the list with search results and show "Show More" button
      populate(data.results);
      showMore(queryText, pageNo);
    }
  };
  fetchImages();
};

// Function to show more images
const showMore = (queryText, pageNo) => {
  function addButton() {
    const showMoreButton = document.createElement("button");
    showMoreButton.className = "moreButton";
    showMoreButton.textContent = "Show More";
    list.appendChild(showMoreButton);
    isShowMore = true;
  }
  !isShowMore && addButton();

  const showButton = document.querySelector(".moreButton");
  showButton &&
    showButton.addEventListener("click", () => {
      console.log("Loading more images...");
      searchHandle(queryText, ++pageNo);
    });
};

// Event listener for the search button
const button = document.querySelector(".button");
button.addEventListener("click", (e) => {
  e.preventDefault();
  clearPreviousImages();
  const inputValue = inputField.value;
  searchHandle(inputValue, 1);
});

// Function to populate the image list
const populate = (data) => {
  data.map((itm) => {
    const item = document.createElement("div");
    item.className = "ItemContainer";

    const imageContainer = document.createElement("div");
    imageContainer.className = "image";

    const img = document.createElement("img");
    img.setAttribute("src", `${itm.urls.raw}`);
    imageContainer.appendChild(img);

    const titleContainer = document.createElement("div");
    titleContainer.className = "title";

    const span = document.createElement("span");
    span.textContent = itm.alt_description;
    titleContainer.appendChild(span);

    item.appendChild(imageContainer);
    item.appendChild(titleContainer);
    listItems.appendChild(item);
  });
};

//function to handle cateogty click

const category = () => {};

// Function to clear previous images
const clearPreviousImages = () => {
  categoryElements.forEach((element) => {
    element.remove();
  });
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
};

// Function to display "No Image Found" message
const displayNoImageFoundMessage = () => {
  const noImageMessage = document.createElement("p");
  noImageMessage.textContent = "No images found.";
  list.appendChild(noImageMessage);
};

// Function to hide the "Show More" button
const hideShowMoreButton = () => {
  const showButton = document.querySelector(".moreButton");
  if (showButton) {
    showButton.style.display = "none";
  }
};
