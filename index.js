const API_URL = "https://quote-garden.herokuapp.com/";
const API_VERSION = "api/v3/";
// const api = "https://quote-garden.herokuapp.com/api/v3/quotes/random";
// --------------------
const quoteParagraph = document.querySelector(".quote_paragraph");
const genre = document.querySelector(".genre");
const author = document.querySelector(".author");
const randomButton = document.querySelector(".random");

// start quote service start.
async function randomQuote() {
  try {
    const response = await fetch(`${API_URL}${API_VERSION}quotes/random`);
    const quote = await response.json();
    updateQuote(quote);
  } catch (error) {
    quoteParagraph.innerHTML = "sorry the api not working";
  }
}

function updateQuote(quote) {
  const { quoteText, quoteAuthor, quoteGenre } = quote.data[0];

  quoteParagraph.innerHTML = quoteText;
  author.innerHTML = quoteAuthor;
  genre.innerHTML = quoteGenre;
}

const authorQuotes = (authorName, page = 1, limit = 10) => {
  return new Promise((success, reject) => {
    if (authorName === undefined) reject({ error: "Author is required" });

    const endPoint = `${API_URL}${API_VERSION}authors/${authorName}?page=${page}&limit=${limit}`;
    fetch(endPoint)
      .then(({ data }) => success(data))
      .catch((error) => reject(error));
  });
};

const genreQuotes = (genre, page = 1, limit = 10) => {
  return new Promise((success, reject) => {
    if (genre === undefined) reject({ error: "Genre is required" });

    fetch(`${API_URL}${API_VERSION}genre/${genre}?page=${page}&limit=${limit}`)
      .then(({ data }) => success(data))
      .catch((error) => reject(error));
  });
};

const getQuotes = (page = 1, limit = 10) => {
  return new Promise((success, reject) => {
    fetch(`${API_URL}${API_VERSION}quotes?page=${page}&limit=${limit}`)
      .then(({ data }) => success(data))
      .catch((error) => reject(error));
  });
};

const searchQuotes = (searchKeyword, page = 1, limit = 10) => {
  return new Promise((success, reject) => {
    if (searchKeyword === undefined)
      reject({ error: "Search keyword required" });

    const endPoint = `${API_URL}${API_VERSION}quotes/${searchKeyword}?page=${page}&limit=${limit}`;
    fetch(endPoint)
      .then(({ data }) => success(data))
      .catch((error) => reject(error));
  });
};
// end service

randomQuote();
randomButton.addEventListener("click", randomQuote);
