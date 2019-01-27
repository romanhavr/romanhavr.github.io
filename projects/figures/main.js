const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const side = document.getElementById('side');
const x1 = document.getElementById('x1');
const x2 = document.getElementById('x2');
const x3 = document.getElementById('x3');
const y1 = document.getElementById('y1');
const y2 = document.getElementById('y2');
const y3 = document.getElementById('y3');
const sSpan = document.getElementById('s');
const reset = document.getElementById('reset');
const aboutSpan = document.getElementById('about-span');
const about = document.getElementById('about');
const closeAbout = document.getElementById('close');

about.style.display = 'none';
canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight * 0.8;

axisBuild();

let x = [],
    y = [],
    xo, yo, a, b, c, p, s, radius;
let chosenPoint;

canvas.addEventListener('mouseup', points);

function points(e) {
  x.push(e.offsetX);
  y.push(e.offsetY);
  
  ctx.beginPath();
  ctx.arc(e.offsetX+ 0.5, e.offsetY+ 0.5, 5, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.font = 'italic 15px sans-serif';
  ctx.strokeText(x.length, e.offsetX - 20, e.offsetY + 20);
  
  coordinates();
  
  if (x[2]) {
    canvas.removeEventListener('mouseup', points);
    canvas.addEventListener('mousedown', pointPick);
    canvas.addEventListener('mousemove', cursor);
    mathCounts();
  }
};

function cursor(e) {
  if ((Math.pow(e.offsetX-x[0], 2) + Math.pow(e.offsetY-y[0], 2)) <= 25
      || (Math.pow(e.offsetX-x[1], 2) + Math.pow(e.offsetY-y[1], 2)) <= 25
      || (Math.pow(e.offsetX-x[2], 2) + Math.pow(e.offsetY-y[2], 2)) <= 25 ) {
    canvas.style.cursor = 'pointer';
  } else {
    canvas.style.cursor = 'unset';
  }
}

function pointPick(e) {
  for (let i = 0; i < 3; i++) {
    if ((Math.pow(e.offsetX-x[i], 2) + Math.pow(e.offsetY-y[i], 2)) <= 25) {
      chosenPoint = i;
    }
  };
  canvas.addEventListener('mousemove', pointMove);
  canvas.addEventListener('mouseup', pointSet);
};

function pointMove(e) {
  x[chosenPoint] = e.offsetX;
  y[chosenPoint] = e.offsetY;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x[i] + 0.5, y[i] + 0.5, 5, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'red';
    ctx.stroke();
  };

  mathCounts();
  coordinates()
}

function pointSet() {
  chosenPoint = undefined;
  canvas.removeEventListener('mousemove', pointMove);
  canvas.removeEventListener('mouseup', pointSet);
}

function mathCounts() {    
  x[3] = (x[0]+x[2])-x[1];
  y[3] = y[0]+y[2]-y[1];
  xo = (x[0]+x[2])/2;
  yo = (y[0]+y[2])/2;
  a = Math.sqrt(Math.pow(x[0]-x[1], 2)+Math.pow(y[0]-y[1], 2));
  b = Math.sqrt(Math.pow(x[2]-x[1], 2)+Math.pow(y[2]-y[1], 2));
  c = Math.sqrt(Math.pow(x[0]-x[2], 2)+Math.pow(y[0]-y[2], 2));
  p = (a + b + c)/2;
  s = 2*Math.sqrt(p * (p - a) * (p - b) * (p - c));
  radius = Math.sqrt(s/Math.PI);

  sSpan.innerHTML = s? Math.round(s) : '';

  build();
  axisBuild()
};

function build() {
  ctx.beginPath();
  ctx.arc(xo+ 0.5, yo+ 0.5, radius, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'yellow';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x[3],y[3]);
  for (let i = 0; i < x.length; i++) {
    ctx.lineTo(x[i],y[i]);
  };
  ctx.strokeStyle = 'blue';
  ctx.stroke();
};

function axisBuild() {
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.strokeStyle = 'grey';
  ctx.stroke();
  
  ctx.font = 'italic 30px sans-serif';
  ctx.strokeText('x', canvas.width - 20, canvas.height / 2 + 20);
  ctx.strokeText('y', canvas.width / 2 - 20, 20);
  ctx.strokeText('0', canvas.width /2 - 20, canvas.height / 2 + 25);
}

reset.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  x = [];
  y = [];

  coordinates();
  axisBuild();

  canvas.removeEventListener('mousedown', pointPick);
  canvas.addEventListener('mouseup', points);  
};

function coordinates() {
  x1.innerHTML = x[0]? x[0] - canvas.width / 2 : '';
  x2.innerHTML = x[1]? x[1] - canvas.width / 2 : '';
  x3.innerHTML = x[2]? x[2] - canvas.width / 2 : '';
  y1.innerHTML = y[0]? canvas.height / 2 - y[0] : '';
  y2.innerHTML = y[1]? canvas.height / 2 - y[1] : '';
  y3.innerHTML = y[2]? canvas.height / 2 - y[2] : '';
  
  ctx.font = 'italic 15px sans-serif';
  ctx.strokeStyle = 'red';
  ctx.strokeText('1', x[0] - 20, y[0] + 20);
  ctx.strokeText('2', x[1] - 20, y[1] + 20);
  ctx.strokeText('3', x[2] - 20, y[2] + 20);
};

aboutSpan.onclick = () => {
  if (about.style.display = 'none') {
    about.style.display = 'block'
  }
};

closeAbout.onclick = () => {
    about.style.display = 'none'
}