const counterEl = document.getElementById("counter");
const statusEl = document.getElementById("status");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");

const MAX = 20;
const MIN = 0;

let count = Number(localStorage.getItem("count")) || 0;

function save() {
  localStorage.setItem("count", count);
}

function render() {
  counterEl.textContent = count;

  decreaseBtn.disabled = count <= MIN;
  increaseBtn.disabled = count >= MAX;

  if (count === MAX) {
    statusEl.textContent = "Maximum reached";
  } else if (count === MIN) {
    statusEl.textContent = "Minimum reached";
  } else {
    statusEl.textContent = "";
  }

  if (count < 0) {
    counterEl.classList.add("text-red-500");
  } else {
    counterEl.classList.remove("text-red-500");
  }

  counterEl.classList.add("scale-110");
  setTimeout(() => {
    counterEl.classList.remove("scale-110");
  }, 200);

  save();
}

function increment() {
  if (count < MAX) {
    count++;
    render();
  }
}

function decrement() {
  if (count > MIN) {
    count--;
    render();
  }
}

function reset() {
  count = 0;
  render();
}

increaseBtn.addEventListener("click", increment);
decreaseBtn.addEventListener("click", decrement);
resetBtn.addEventListener("click", reset);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") increment();
  if (e.key === "ArrowDown") decrement();
  if (e.key.toLowerCase() === "r") reset();
});

render();