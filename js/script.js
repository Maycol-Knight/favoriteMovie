/*const initialMovies = [
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

]*/

let movieList = JSON.parse(localStorage.getItem('movies')) || [];

//const store = JSON.parse(localStorage.getItem('movies'));
//const movieList =  initialMovies || store ;
const movieTitle = document.getElementById('movieTitle');
const movieYear = document.getElementById('movieYear');
const movieSelect = document.getElementById('movieSelect');
const movieDescription = document.getElementById('movieDescription');
const movieImage = document.getElementById('movieImage');
const addMovieBtn = document.getElementById('addMovieBtn');
const movieListContainer = document.getElementById('movieList');
const sortByName = document.getElementById('sortByName');
const sortByYear = document.getElementById('sortByYear');

function addMovie() {
    const title = movieTitle.value.trim();
    const year = parseInt(movieYear.value.trim());
    const select = movieSelect.value.trim();
    const image = movieImage.value.trim();
    const description = movieDescription.value.trim();

    const newMovie = { title, year, select, image, description };
        
    if (editIndex !== null) {
        movieList[editIndex] = newMovie;
        editIndex = null;
    } else {
        movieList.push(newMovie);
    }
        saveMovies();
        renderMovies();
        clearForm();
    // if (title && year && select && description) {
    //     const newMovie = { title, year, select, description };
    //     movieList.push(newMovie);
    //     saveMovies();
    //     renderMovies();
    //     clearForm();
    // } else {
    //     alert("Por favor, complete los campos vacíos.");
    // }
}

function deleteMovie(index) {
    movieList.splice(index, 1);
    saveMovies();
    renderMovies();
}

function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movieList));
}

function editMovie(index) {
    const movie = movieList[index];
    movieTitle.value = movie.title;
    movieYear.value = movie.year;
    movieSelect.value = movie.select;
    movieImage.value = movie.image;
    movieDescription.value = movie.description;
    editIndex = index;
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
                    <img src="${movie.image}" class="card-img-top" width="50%" alt="">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${movie.year}</h6>
                    <p class="card-text">${movie.select}</p>
                    <p class="card-text description">${movie.description}</p>
                    <button class="btn btn-danger" onclick="deleteMovie(${index})">Eliminar</button>
                    <button class="btn btn-warning" onclick="editMovie(${index})">Editar</button>
                </div>
            </div>
        `;
        // Agrega un evento de clic para expandir/contraer la tarjeta
        card.querySelector('.card').addEventListener('click', (event) => {
            // Evita que el evento se active al hacer clic en el botón "Eliminar"
            if (!event.target.classList.contains('btn-danger')) {
                card.querySelector('.card').classList.toggle('expanded');
            }
        });

        movieListContainer.appendChild(card);
    });
}

function clearForm() {
    movieTitle.value = '';
    movieYear.value = '';
    movieSelect.value = '';
    movieImage.value = '';
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

addMovieBtn.addEventListener('click', () => {
    addMovie();
} );

document.addEventListener('DOMContentLoaded', renderMovies);