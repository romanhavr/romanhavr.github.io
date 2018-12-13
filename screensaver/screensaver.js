let inactivityTime = document.getElementById('inactivity-time').value,
	interval = document.getElementById('interval').value,
	description = document.getElementById('description');
let button = document.getElementById('but');
let screensaver = document.getElementById('screensaver');
let image = document.getElementById('image');
let imageInside = document.getElementById('image-inside');
let timerId, intervalId, timerFadeOut;
let screenWidth = document.documentElement.clientWidth,
	screenHeight = document.documentElement.clientHeight;
let maxX = screenWidth * 0.97,
	minX = screenWidth * 0.02,
	maxY = screenHeight * 0.97,
	minY = screenHeight * 0.02;
	
function listenForAction() {
	document.addEventListener('mousedown', restartSS);
	document.addEventListener('mouseup', restartSS);
	document.addEventListener('mousewheel', restartSS);
	document.addEventListener('mousemove', restartSS);
	document.addEventListener('keypress', restartSS);
	
	startSS();
};

listenForAction();

function restartSS() {
	fadeOut(screensaver);
	
	clearTimeout(timerId);
	clearInterval(intervalId);
	
	startSS()
};

function startSS() {
	timerId = setTimeout(screensaverShow, inactivityTime * 1000);
};

function screensaverShow() {
	fadeIn(screensaver);
	imageShow();
	intervalId = setInterval(imageShow, interval * 1000);
};
	
function imageShow() {
	let imageSrc = imageToShow();
	image.src = imageSrc;
	randomX = Math.floor(Math.random() * (maxX - minX) + minX);
	randomY = Math.floor(Math.random() * (maxY - minY) + minY);
	imageInside.src = imageSrc;
	imageInside.onload = () => {
		let imageWidth = imageInside.getBoundingClientRect().right - imageInside.getBoundingClientRect().left,
			imageHeight = imageInside.getBoundingClientRect().bottom - imageInside.getBoundingClientRect().top;
		imageInside.style.top = 
			(randomY + imageHeight >= maxY) ? 
			(maxY - imageHeight + 'px') :
			(randomY + 'px');
		imageInside.style.left = 
			(randomX + imageWidth >= maxX) ? 
			(maxX - imageWidth + 'px') :
			(randomX + 'px');
		fadeIn(imageInside);
	};
	fadeIn(image);
	image.onerror = () => {
		alert('It must be some problem with image loading...');
	};

};

function imageToShow() {
	let imgNum = Math.round(Math.random() * 6 + 1);
	switch (imgNum) {
		case 1:
			return 'https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060';
			break;
		case 2:
			return 'https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560';
			break;
		case 3:
			return 'https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200';
			break;
		case 4:
			return 'https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500';
			break;
		case 5:
			return 'https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400';
			break;
		case 6:
			return 'https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260';
			break;
		case 7:
			return 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
			break;
	};
};

but.onclick = () => {
	inactivityTime = document.getElementById('inactivity-time').value;
	if (inactivityTime < 2) {
		document.getElementById('inactivity-time').value = 2;
		inactivityTime = 2;
	};
	interval = document.getElementById('interval').value;
	if (interval < 2) {
		document.getElementById('interval').value = 2;
		interval = 2;
	};
	description.innerHTML = 'ScreenSaver will start after <strong>'+inactivityTime+'</strong> seconds of inactivity on the page.'
	
	clearTimeout(timerId);
	clearInterval(intervalId);
	
	startSS();
};

function fadeIn(el){
    el.style.opacity = 0;
    el.style.display = 'block';

    (function fade() {
		let val = parseFloat(el.style.opacity);
		if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
};

function fadeOut(el){
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= .1) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
};