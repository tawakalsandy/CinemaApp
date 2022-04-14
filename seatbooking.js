const container = document.querySelector('.container');
const count = document.getElementById('count');
const selectedMovie = document.getElementById('movie');
const total = document.getElementById('total');
const seats = document.querySelectorAll('.row .seat:not(.reserved)');
populateUI();

let ticketPrice = +selectedMovie.value;


function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMoviePrice', moviePrice);
    localStorage.setItem('indexMovie', movieIndex);
}


function updateSelectedCount() {
    const PickedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...PickedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('PickedSeats', JSON.stringify(seatsIndex));

    const PickedSeatsCount = PickedSeats.length;

    count.innerText = PickedSeatsCount;
    total.innerText = PickedSeatsCount * ticketPrice;

    setMovieData(selectedMovie.selectedIndex, selectedMovie.value);
}


function populateUI() {
    const PickedSeats = JSON.parse(localStorage.getItem('PickedSeats'));

    if (PickedSeats !== null && PickedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (PickedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const indexMovie = localStorage.getItem('indexMovie');

    if (indexMovie !== null) {
        selectedMovie.selectedIndex = indexMovie;
    }
}


selectedMovie.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('reserved')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});


updateSelectedCount();