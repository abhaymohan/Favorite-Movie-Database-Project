const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];

const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;

const backdrop = document.getElementById('backdrop');
// cosnt backdrop = document.body.firstElementChild;

const cancealAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancealAddMovieButton.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll('input');
// const usetInputs = addMovieModel.getElementsByTagName('input');

// querySelectorAll() returns a static list of all selected nodes
// whereas getElementsByTagName() returns a live list of all selected nodes

const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');



const movies = [];

// functions

const toggleBackDrop = () => {
    backdrop.classList.toggle('visible');
};

const updateUI = () => {
    if(movies.length === 0)
    {
        entryTextSection.style.display = 'block';
    }
    else
    {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () =>
{
    toggleBackDrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for(const movie of movies)
    {
        if(movie.id === movieId) break;
        movieIndex++;
    }
    movies.splice(movieIndex,1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();

    closeMovieDeletionModal();
    updateUI();
};


const startDeleteMovieHandler = (movieId) => {
    
    deleteMovieModal.classList.add('visible');
    toggleBackDrop();
    const cancealDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId)) will not work due to bind()

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    

    cancealDeletionButton.removeEventListener('click', closeMovieDeletionModal);
    cancealDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null,movieId));

    //deleteMovie(movieId);
};

const renderNewMovieElement = (movieObj) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class = "movie-element__image">
        <img src="${movieObj.image}" alt = "${movieObj.title}"> 
    </div>
    <div class = "movie-element__info">
        <h2> ${movieObj.title} </h2>
        <p> ${movieObj.rating} / 5 STARS </p>
    </div>`;
    newMovieElement.addEventListener('click',startDeleteMovieHandler.bind(null,movieObj.id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}

const clearMovieInputs = () => {
    for(const userInput of userInputs)
    {
        userInput.value = '';
    }
};



const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackDrop();
};

const backdropClickHandler = () => {
    clearMovieInputs();
    closeMovieModal();
    closeMovieDeletionModal();
};

const cancealAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInputs();
    toggleBackDrop();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(
        titleValue.trim() === '' || 
        imageUrlValue.trim() === '' || 
        ratingValue.trim() === '' ||
        parseInt(ratingValue) < 1 ||
        +ratingValue > 5)
    {
        alert('Please enter valid rating value (rating between 1 and 5)');
        return;

    }

    const newMovie = {
        id : Math.random().toString(),
        'title' : titleValue,
        image : imageUrlValue,
        'rating' : ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackDrop();
    clearMovieInputs();
    renderNewMovieElement(newMovie);
    updateUI();
    

};


// event listeners -- click listeners

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancealAddMovieButton.addEventListener('click', cancealAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);


