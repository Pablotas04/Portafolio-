// Efecto de máquina de escribir para el nombre
const text = "Hola, soyDiego Rojas";
const element = document.getElementById("typeWriter");
let index = 0;

function typeWriter() {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}

typeWriter();



// Efecto de fondo con células y líneas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const NUM_CELLS = 60;
const MAX_DISTANCE = 150;

class Cell {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 3 + 2;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    // Dibuja la célula
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(224, 82, 82, 0.6)';
    ctx.fill();

    //Nucleo de la célula
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(230, 222, 209, 0.8)';
    ctx.fill();
  }

}

const cells = Array.from({ length: NUM_CELLS }, () => new Cell());

function connectCells() {
  for (let i = 0; i < cells.length; i++) {
    for (let j = i + 1; j < cells.length; j++) {
      const dx = cells[i].x - cells[j].x;
      const dy = cells[i].y - cells[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MAX_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(cells[i].x, cells[i].y);
        ctx.lineTo(cells[j].x, cells[j].y);
        ctx.strokeStyle = `rgba(224, 82, 82, ${1 - distance / MAX_DISTANCE})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  connectCells();
  cells.forEach(cell => {
    cell.move();
    cell.draw();
  });
  
  requestAnimationFrame(animate);
}

animate();




//Código para resaltar el enlace de navegación correspondiente a la sección visible
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const visibleId = entry.target.id;

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${visibleId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

sections.forEach((section) => {
  observer.observe(section);
});