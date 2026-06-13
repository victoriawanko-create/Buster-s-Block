let movieTitle = "Inception";

const apiKey = "95e3e9cb";

fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`)
  .then(response => response.json())
  .then(data => console.log(data))

async function main() {
    const movieData = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=95e3e9cb`);
    const moviesData = await movieData.json();
    const movieListEl = document.querySelector(".movie-list");

    movieListEl.innerHTML = moviesData.map((movie) => movieHTML(movie)).join("");
}

main();

let movies = [];

async function renderMovies(searchTerm = "batman") {
  const moviesWrapper = document.querySelector(".movies");

  moviesWrapper.classList.add("movies__loading");

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&apikey=95e3e9cb`
    );

    const data = await response.json();

    moviesWrapper.classList.remove("movies__loading");

    if (!data.Search) {
      moviesWrapper.innerHTML = "<p>No movies found.</p>";
      return;
    }

    movies = data.Search;
    displayMovies(movies);
  } catch (error) {
    moviesWrapper.classList.remove("movies__loading");
    console.error("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  const moviesWrapper = document.querySelector(".movies");

  moviesWrapper.innerHTML = movies
    .map((movie) => {
      return `
        <div class="movie">
          <img src="${movie.Poster}" alt="${movie.Title}" class="movie__img" />
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        </div>
      `;
    })
    .join("");
}

const searchInput = document.getElementById("search");
function searchMovies () {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    renderMovies(searchTerm);
  } else {
    renderMovies();
  }
}

function filterMovies(event) {
  const filter = event.target.value;
  let sortedMovies = [...movies];

  if (filter === "A_TO_Z") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  }

  if (filter === "Z_TO_A") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  if (filter === "NEW_TO_OLD") {
    sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  }

  if (filter === "OLD_TO_NEW") {
    sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  displayMovies(sortedMovies);
}

renderMovies();