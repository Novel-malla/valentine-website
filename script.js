document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const questionBox = document.getElementById("questionBox");
  const yesBox = document.getElementById("yesBox");
  const loveText = document.getElementById("loveText");
  const nextBtn = document.getElementById("nextBtn");
  const galleryBox = document.getElementById("galleryBox");
  const galleryNextBtn = document.getElementById("galleryNextBtn");
  const timerBox = document.getElementById("timerBox");
  const timerNextBtn = document.getElementById("timerNextBtn");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const proposalBox = document.getElementById("proposalBox");
  const heartsContainer = document.getElementById("hearts");
  const quizBox = document.getElementById("quizBox");
  const quizQuestion = document.getElementById("quizQuestion");
  const optionButtons = document.querySelectorAll(".option");

  let currentCallback = null;

  // Quiz data (CUSTOMIZE QUESTIONS!)
  const quizzes = {
    letter: {
      question: "Where did we first meet?",
      options: ["Cafe", "College", "Party", "Online"],
      answer: 1
    },
    gallery: {
      question: "Who said I love you first?",
      options: ["You", "Me", "Both", "Nobody"],
      answer: 0
    },
    timer: {
      question: "Which month did we start dating?",
      options: ["Jan", "Feb", "Mar", "Apr"],
      answer: 1
    },
    proposal: {
      question: "Do you love me?",
      options: ["Yes ❤️", "YES ❤️❤️", "Obviously ❤️❤️❤️", "All of these 😄"],
      answer: 3
    }
  };

  function showQuiz(key, onSuccess) {
    const quiz = quizzes[key];
    quizQuestion.textContent = quiz.question;

    optionButtons.forEach((btn, index) => {
      btn.textContent = quiz.options[index];
      btn.onclick = () => {
        if (index === quiz.answer) {
          quizBox.classList.add("hidden");
          onSuccess();
        } else {
          alert("Oops 😢 Wrong answer. Start again ❤️");
          location.reload();
        }
      };
    });

    quizBox.classList.remove("hidden");
  }

  // Safety check (important)
  if (!yesBtn || !noBtn) {
    console.error("Buttons not found in DOM");
    return;
  }

  // No button runs away 😈
  noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

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

  function typeLetter() {
    if (index < letter.length) {
      loveText.innerHTML += letter.charAt(index);
      index++;
      setTimeout(typeLetter, 40);
    }
  }

  // YES click ✅
  yesBtn.addEventListener("click", () => {
    questionBox.classList.add("hidden");
    yesBox.classList.remove("hidden");
    loveText.innerHTML = "";
    index = 0;
    typeLetter();
  });

  // Next from love letter → gallery
  nextBtn.addEventListener("click", () => {
    showQuiz("gallery", () => {
      yesBox.classList.add("hidden");
      galleryBox.classList.remove("hidden");
    });
  });

  const startDate = new Date("2020-12-08T19:35:00");

  function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  // Gallery → Timer
  galleryNextBtn.addEventListener("click", () => {
    showQuiz("timer", () => {
      galleryBox.classList.add("hidden");
      timerBox.classList.remove("hidden");
      updateTimer();
      setInterval(updateTimer, 1000);
    });
  });

  // Create floating hearts
  function startHearts() {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤️";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 4 + Math.random() * 3 + "s";

      heartsContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 7000);
    }, 300);
  }

  timerNextBtn.addEventListener("click", () => {
    showQuiz("proposal", () => {
      timerBox.classList.add("hidden");
      proposalBox.classList.remove("hidden");
      startHearts();
    });
  });
});
