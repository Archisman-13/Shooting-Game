const start = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time__list');
const timeValue = document.querySelector('.time__value');
const board = document.querySelector('.board');
const colors = ['#34ebdb', '#1bb3a5', '#1b9cb3', '#30defc', '#30bffc', '#88d6f7', '#88f7dd', '#09edb8', '#1fa69d', '#039c70', '#03759c'];

let time = 0;
let score =  0;

start.addEventListener('click', (e) => {
	e.preventDefault();
	screens[0].classList.add('_up');
});

timeList.addEventListener('click', (e) => {
	if (e.target.classList.contains('time__btn')) {
		time = parseInt(e.target.getAttribute('data-time'));
		screens[1].classList.add('_up');
		startGame();
	}
});

board.addEventListener('click', (e) => {
	if (e.target.classList.contains('circle')) {
		score++;
		e.target.remove();
		createCircle();
	}
})

function startGame () {
	createCircle ()
	setInterval(reduceTime, 1000)
	setTime(time); 
}

function reduceTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current);
	}
}

function setTime(value) {
	timeValue.innerHTML = `00:${value}`;
}

function finishGame () {
	timeValue.parentElement.classList.add('_hide');
	board.innerHTML = `<h2>Your score: <span class="primary">${score}</span></h2>`
}

function createCircle () {
	const circle = document.createElement('div');
	const size = randomNum(60, 10);
	const { width, height } = board.getBoundingClientRect();
	const x = randomNum(width - size, 0);
	const y = randomNum(height - size, 0);
	const color = colors[randomNum(colors.length - 1, 0)];

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.left = `${x}px`;
	circle.style.top = `${y}px`;
	circle.style.background = `${color}`;

	board.append(circle);
}

function randomNum(max, min) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}