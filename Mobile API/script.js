const apiKey = "3fd2be6f0c70a2a598f084ddfb75487c";
const apiUrl = "https://api.themoviedb.org/3";
const posterPath = "https://image.tmdb.org/t/p/w500";

const main = document.querySelector("main");
const searchInput = document.querySelector("input[type='text']");
const searchButton = document.querySelector("button");

// Function to display movies
function displayMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const moviePoster = document.createElement("img");
    moviePoster.src = posterPath + poster_path;
    moviePoster.alt = title;
    moviePoster.title = title;
    movieElement.appendChild(moviePoster);

    const movieRating = document.createElement("div");
    movieRating.classList.add("rating");
    movieRating.textContent = vote_average;
    movieElement.appendChild(movieRating);

    const movieOverview = document.createElement("div");
    movieOverview.classList.add("overview");
    movieOverview.textContent = overview;
    movieElement.appendChild(movieOverview);

    main.appendChild(movieElement);
  });
}

// Function to fetch movies
async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;
    displayMovies(movies);
  } catch (error) {
    console.log(error);
  }
}

// Display popular movies on load
window.addEventListener("load", () => {
  fetchMovies(`${apiUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`);
});

// Search for movies
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    fetchMovies(`${apiUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}`);
  } else {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error");
    errorMessage.textContent = "Please enter a search term.";
    main.innerHTML = "";
    main.appendChild(errorMessage);
  }
});