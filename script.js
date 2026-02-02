const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionBox = document.getElementById("questionBox");
const yesBox = document.getElementById("yesBox");
const loveText = document.getElementById("loveText");
const nextBtn = document.getElementById("nextBtn");

// No button runs away 😈
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 300 - 150;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Love letter text
const letter = `
From the moment you came into my life,
everything felt brighter.

Your smile makes my bad days better,
your presence feels like home.

This little website is just a small way
to say how special you are to me.

Will you stay my Valentine today,
tomorrow, and always? ❤️
`;

let index = 0;

// Typing animation
function typeLetter() {
  if (index < letter.length) {
    loveText.innerHTML += letter.charAt(index);
    index++;
    setTimeout(typeLetter, 40);
  }
}

// YES click
yesBtn.addEventListener("click", () => {
  questionBox.classList.add("hidden");
  yesBox.classList.remove("hidden");
  typeLetter();
});

// Next button (we'll use this later)
nextBtn.addEventListener("click", () => {
  alert("Next feature coming 😄");
});
