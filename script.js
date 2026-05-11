const canvas = document.getElementById("smokeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const text = document.getElementById("smokyText");

let smokeActive = false;

const particles = [];

class Particle{
  constructor(x,y){
    this.x = x;
    this.y = y;

    this.size = Math.random() * 25 + 10;

    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = Math.random() * -3 - 1;

    this.opacity = 0.4;
  }

  update(){

    this.x += this.speedX;
    this.y += this.speedY;

    this.size += 0.2;

    this.opacity -= 0.008;
  }

  draw(){

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );

    gradient.addColorStop(
      0,
      `rgba(255,255,255,${this.opacity})`
    );

    gradient.addColorStop(
      1,
      `rgba(255,255,255,0)`
    );

    ctx.beginPath();
    ctx.fillStyle = gradient;

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}

function createSmoke(){

  if(!smokeActive) return;

  const rect = text.getBoundingClientRect();

  // começa pelo S e topo
  for(let i = 0; i < 6; i++){

    const x =
      rect.left +
      Math.random() * 80;

    const y =
      rect.top +
      Math.random() * 40;

    particles.push(
      new Particle(x,y)
    );
  }
}

function animate(){

  ctx.fillStyle =
    "rgba(0,0,0,0.08)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  createSmoke();

  for(let i = 0; i < particles.length; i++){

    particles[i].update();
    particles[i].draw();

    if(
      particles[i].opacity <= 0
    ){
      particles.splice(i,1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();

text.addEventListener("mouseenter", () => {

  smokeActive = true;

  text.classList.add("smoke");
});

text.addEventListener("mouseleave", () => {

  smokeActive = false;

  text.classList.remove("smoke");
});

window.addEventListener("resize", () => {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
