const API_URL = "https://quote-garden.herokuapp.com/";
const API_VERSION = "api/v3/";
// const api = "https://quote-garden.herokuapp.com/api/v3/quotes/random";
// --------------------
const quoteParagraph = document.querySelector(".quote_paragraph");
const genre = document.querySelector(".genre");
const author = document.querySelector(".author");
const randomButton = document.querySelector(".random");
const authorQuoteButton = document.querySelector(".footer__information");
const quotesMain = document.querySelector(".quotes");

// start quote service start.
async function randomQuote() {
  try {
    const response = await fetch(`${API_URL}${API_VERSION}quotes/random`);
    const quote = await response.json();
    renderNewQuote(quote);
  } catch (error) {
    quoteParagraph.innerHTML = "sorry the api not working";
  }
}

function renderNewQuote(quote) {
  const { quoteText, quoteAuthor, quoteGenre } = quote.data[0];

  quoteParagraph.innerHTML = quoteText;
  author.innerHTML = quoteAuthor;
  genre.innerHTML = quoteGenre;
}

async function authorQuotes(authorName, page = 1, limit = 10) {
  if (authorName === undefined) return { error: "Author is required" };

  try {
    const endPoint = `${API_URL}${API_VERSION}authors/${authorName}?page=${page}&limit=${limit}`;
    const response = await fetch(endPoint);
    const quotes = await response.json();
    return quotes;
  } catch (error) {
    return { error: "Api are not working" };
  }
}
// end service

// for now we do'nt use these function ...
const genreQuotes = (genre, page = 1, limit = 10) => {
  return new Promise((success, reject) => {
    if (genre === undefined) reject({ error: "Genre is required" });

    fetch(`${API_URL}${API_VERSION}genre/${genre}?page=${page}&limit=${limit}`)
      .then(({ data }) => success(data))
      .catch((error) => reject(error));
  });
};

async function getQuotes(page = 1, limit = 10) {
  const endPoint = `${API_URL}${API_VERSION}quotes?page=${page}&limit=${limit}`;

  try {
    const response = await fetch(endPoint);
    const quotes = await response.json();
    return quotes;
  } catch (error) {
    return { error: "api is not working" };
  }
}

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
// end useless functions

randomQuote();
randomButton.addEventListener("click", randomQuote);

function templateQuote(quote) {
  return `<section class="quote-section">
      <div class="quote__body">
        <p class="quote_paragraph">${quote}</p>
      </div>
    </section>`;
}

authorQuoteButton.addEventListener("click", setQuotes);

async function setQuotes() {
  const response = await getQuotes();
  console.log(response.data[0].quoteText);

  randomButton.style.display = "none"
  document.getElementById("random-quote").style.display = "none";
  document.body.style.height = "100%"

  if (!response.error) {
    response.data.forEach((q) => {
      const template = templateQuote(q.quoteText);
      quotesMain.innerHTML += template;
    });
  }
}
