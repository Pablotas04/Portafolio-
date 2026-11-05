// Efecto de máquina de escribir para el nombre
const text = "Hola, soy Diego Rojas";
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




// Código para la seccion "SOBRE MI" 
const skillColumns = [
  [
    { name: "C#", icon: "csharp" },
    { name: ".NET", icon: "dotnetcore" },
    { name: "Bootstrap", icon: "bootstrap"},
  ],
  [
    { name: "SQL Server", icon: "microsoftsqlserver", variant: "plain" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Git", icon: "git" },
  ],
  [
    { name: "JavaScript", icon: "javascript" },
    { name: "CSS", icon: "css3" },
    { name: "HTML", icon: "html5" },
  ],
];

function renderSkills() {
  const container = document.getElementById("skills");

  skillColumns.forEach((column) => {
    const columnElement = document.createElement("div");
    columnElement.classList.add("skills-column");

    column.forEach((skill) => {
      const card = document.createElement("div");
      card.classList.add("skill-card");
      card.innerHTML = `
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg"
             alt="${skill.name}">
        <span>${skill.name}</span>
      `;
      columnElement.appendChild(card);
    });

    container.appendChild(columnElement);
  });
}

renderSkills();


// Código para el formulario de contacto
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("formStatus");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      statusMessage.textContent = "Message sent! Thanks for reaching out.";
      form.reset();
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    statusMessage.textContent = "Something went wrong. Please try again.";
  }
}

form.addEventListener("submit", handleSubmit);


const backToTopButton = document.querySelector(".back-to-top");

function easeInOutCubic(progress) {
    return progress < 0.5
        ? 4 * progress ** 3
        : 1 - (-2 * progress + 2) ** 3 / 2;
}

function smoothScrollToTop(duration = 900) {
    const startPosition = window.scrollY;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, startPosition * (1 - easeInOutCubic(progress)));

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

if (backToTopButton) {
    backToTopButton.addEventListener("click", (event) => {
        event.preventDefault();
        smoothScrollToTop();
    });
}