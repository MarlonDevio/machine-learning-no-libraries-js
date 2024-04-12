import '../style.css';
import { draw } from './draw.js';
const sketchpadContainer = document.getElementById('sketchpadContainer');

const sketchpadStyle = `
    background-color: #ffff;
    box-shadow: 0 0 10px 2px #ffff;
    border-radius: 1rem;
    `;

/* SKETCHPAD CLASS */
class Sketchpad {
  constructor(container, size = 400) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = sketchpadStyle;
    container.appendChild(this.canvas);
    this.canvasContext = this.canvas.getContext('2d');

    this.path = [];
    this.isDrawing = false;

    this.#addEventListeners();
  }

  // eventlisteners
  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouseLocation(evt);
      this.path = [mouse];
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouseLocation(evt);
        this.path.push(mouse);
        this.#redraw();
      }
    };

    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    };
  }

  // Helper
  #getMouseLocation(evt) {
    const rectangle = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rectangle.left),
      Math.round(evt.clientY - rectangle.top)
    ];
  }

  #redraw() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.path(this.canvasContext, this.path);
  }
}

const sketchpad = new Sketchpad(sketchpadContainer);
