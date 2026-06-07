async function main() {
    const movieData = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${95e3e9cb}`);
    const moviesData = await movieData.json();
    const movieListEl = document.querySelector(".movie-list");

    movieListEl.innerHTML = moviesData.map((movie) => movieHTML(movie)).join("");
}

main();

let movies;

async function renderMovies(filter) {
    const moviesWrapper = document.querySelector('.movies');
   
    moviesWrapper.classList.add('movies__loading')

    if (!movies) {
      movies = await getMovies();
    }
    
    let filteredMovies = [...movies];

    if (filter === 'A_TO_Z') {
        filteredMovies.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    }
    else if (filter === 'Z_TO_A') {
      filteredMovies.sort((a, b) => (b.originalPrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    }
    else if (filter === 'NEW_TO_OLD') {
      filteredMovies.sort((a, b) => b.rating - a.rating);
    }
    else if (filter === 'OLD_TO_NEW') {
      filteredMovies.sort((a, b) => a.rating - b.rating);
    }

    const moviesHTML = filteredMovies.map((movie) => {
    return `
    `
})
.join("");

moviesWrapper.classList.remove('movies__loading');
moviesWrapper.innerHTML = moviesHTML;
}


setTimeout(() => {
  renderMovies();
});


function filterMovies(event) {
  renderMovies(event.target.value);
}