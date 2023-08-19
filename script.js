const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    if (particle.size <= 0.2) {
      particles.splice(index, 1);
    } else {
      particle.update();
      particle.draw();
    }
  });
  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

createParticles();
resizeCanvas();
animate();

window.addEventListener("resize", resizeCanvas);
