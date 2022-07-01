const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];

const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;

const backdrop = document.getElementById('backdrop');
// cosnt backdrop = document.body.firstElementChild;

const cancealAddMovieButton = addMovieModal.querySelector('.btn--passive');



// functions

const toggleBackDrop = () => {

    backdrop.classList.toggle('visible');

}

const toggleMovieModal = () => {

    addMovieModal.classList.toggle('visible');
    toggleBackDrop();

};

const backdropClickHandler = () => {

    toggleMovieModal();

}

const cancealAddMovie = () => {

    toggleMovieModal();

}


// event listeners

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancealAddMovieButton.addEventListener('click', cancealAddMovie);

