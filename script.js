const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionBox = document.getElementById("questionBox");
const yesBox = document.getElementById("yesBox");

// Move "No" button when hovered
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 300 - 150;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Yes button click
yesBtn.addEventListener("click", () => {
  questionBox.classList.add("hidden");
  yesBox.classList.remove("hidden");
});
