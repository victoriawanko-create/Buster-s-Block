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

let movies;
   
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

    const sortedMovies = data.Search.sort((a, b) => {
      if (a.Title < b.Title) return -1;
      if (a.Title > b.Title) return 1;
      return 0;
    });

    displayMovies(sortedMovies);
  } catch (error) {
    moviesWrapper.classList.remove("movies__loading");
    console.error("Error fetching movies:", error);
  }

 function displayMovies(movies) {
  const movieList = document.getElementById("movie-list");

  movieList.innerHTML = movies.map((movie) => {
    return `
      <div class="movie">
        <img src="${movie.Poster}" alt="${movie.Title}" class="movie__img" />
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    `;
  }).join("");
}

}

renderMovies();

moviesWrapper.classList.remove('movies__loading');
moviesWrapper.innerHTML = moviesHTML;


setTimeout(() => {
  renderMovies();
});


function filterMovies(event) {
  renderMovies(event.target.value);
}