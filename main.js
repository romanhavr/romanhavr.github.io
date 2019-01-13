works = [
  {
    demoUrl: 'projects/youviewer/index.html',
    codeUrl: 'https://github.com/romanhavr/youviewer',
    description: 'YouViewer - <br>third party API app.',
    imageUrl: 'images/youviewer.jpg',
    imageAlt: 'youviewer'
  },
  {
    demoUrl: 'projects/screensaver/screensaver.html',
    codeUrl: 'https://github.com/romanhavr/screensaver',
    description: 'Simple screensaver <br>coded with JavaScript.',
    imageUrl: 'images/screensaver.jpg',
    imageAlt: 'screensaver'
  },
  {
    demoUrl: 'https://romanhavr.github.io',
    codeUrl: 'https://github.com/romanhavr/romanhavr.github.io',
    description: 'This Portfolio.',
    imageUrl: 'images/portfolio.jpg',
    imageAlt: 'portfolio'
  },
  {
    demoUrl: 'https://todo-app-my.herokuapp.com/',
    codeUrl: 'https://github.com/romanhavr/todo-app',
    description: 'Todo app created with ReactJS.',
    imageUrl: 'images/todo-app.jpg',
    imageAlt: 'todo-app'
  },
  {
    demoUrl: 'http://my-internet-shop.herokuapp.com',
    codeUrl: 'https://github.com/romanhavr/Apiko-Fall-Intensive-2018-Final-Test',
    description: 'SPA created with ReactJS (Redux, Routing...).',
    imageUrl: 'images/my-internet-shop.jpg',
    imageAlt: 'my-internet-shop'
  },
];

works.map( (work, index) => {  

  let table = document.querySelector('.table');
  let rowDescription = document.createElement('div');
  let rowImage = document.createElement('div');
  let image = document.createElement('img');
  let rowButtons = document.createElement('div');
  let spanDemo = document.createElement('span');
  let spanCode = document.createElement('span');
  let aDemo = document.createElement('a');
  let aCode = document.createElement('a');
  let cell = document.createElement('div');
  let br = document.createElement('br');

  rowDescription.className = 'row';
  rowImage.className = 'row';
  rowButtons.className= 'row';
  spanDemo.className= 'button';
  spanCode.className= 'button';
  cell.className = 'cell';

  rowDescription.innerHTML = work.description;
  cell.appendChild(rowDescription);

  image.src = work.imageUrl;
  image.alt = work.imageAlt;
  rowImage.appendChild(image);
  cell.appendChild(rowImage);

  aDemo.innerHTML = 'DEMO';
  aDemo.href = work.demoUrl;
  aCode.innerHTML = 'CODE';
  aCode.href = work.codeUrl;
  spanDemo.appendChild(aDemo);
  spanCode.appendChild(aCode);
  rowButtons.appendChild(spanDemo);
  rowButtons.appendChild(spanCode);
  cell.appendChild(rowButtons);

  table.appendChild(cell);
  if (Math.floor(index/2) !== index/2) {
    table.appendChild(br);
  }

  }
)
