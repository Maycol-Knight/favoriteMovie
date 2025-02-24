const initialMovies = [
    {
        title: 'Capitán América: El primer vengador',
        year: 2011,
        select: 'Ciencia ficción',
        description: 'Two imprisoned'
    },
    {
        title: 'Guardianes de la Galaxia',
        year: 2014,
        select: 'Ciencia ficción',
        description: 'Two imprisoned'
    },
    {
        title: 'El increíble Hulk',
        year: 2008,
        select: 'Ciencia ficción',
        description: 'Two imprisoned'
    },
];

// Obtener películas de localStorage o inicializar con initialMovies
let movieList = JSON.parse(localStorage.getItem('movies')) || [...initialMovies];

// Si localStorage está vacío, guardamos las películas iniciales
if (!localStorage.getItem('movies')) {
    localStorage.setItem('movies', JSON.stringify(movieList));
}

const movieTitle = document.getElementById('movieTitle');
const movieYear = document.getElementById('movieYear');
const movieSelect = document.getElementById('movieSelect');
const movieDescription = document.getElementById('movieDescription');
const addMovieBtn = document.getElementById('addMovieBtn');
const movieListContainer = document.getElementById('movieList');
const sortByName = document.getElementById('sortByName');
const sortByYear = document.getElementById('sortByYear');

function addMovie() {
    const title = movieTitle.value.trim();
    const year = parseInt(movieYear.value.trim());
    const select = movieSelect.value.trim();
    const description = movieDescription.value.trim();

    if (title && year && select && description) {
        const newMovie = { title, year, select, description };
        movieList.push(newMovie);
        saveMovies();
        renderMovies();
        clearForm();
    } else {
        alert("Por favor, complete los campos vacíos.");
    }
}

function deleteMovie(index) {
    movieList.splice(index, 1);
    saveMovies();
    renderMovies();
}

function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movieList));
}

function renderMovies() {
    movieListContainer.innerHTML = '';

    movieList.forEach((movie, index) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');

        card.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${movie.year}</h6>
                    <p class="card-text">${movie.select}</p>
                    <p class="card-text description">${movie.description}</p>
                    <button class="btn btn-danger" onclick="deleteMovie(${index})">Eliminar</button>
                </div>
            </div>
        `;
        movieListContainer.appendChild(card);
    });
}

function clearForm() {
    movieTitle.value = '';
    movieYear.value = '';
    movieSelect.value = '';
    movieDescription.value = '';
}

sortByName.addEventListener('click', () => {
    movieList.sort((a, b) => a.title.localeCompare(b.title));
    saveMovies();
    renderMovies();
});

sortByYear.addEventListener('click', () => {
    movieList.sort((a, b) => a.year - b.year);
    saveMovies();
    renderMovies();
});

addMovieBtn.addEventListener('click', addMovie);

document.addEventListener('DOMContentLoaded', renderMovies);

