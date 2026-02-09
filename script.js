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
  const giftsBox = document.getElementById("giftsBox");
  const gifts = document.querySelectorAll(".gift");

  let currentCallback = null;

  let score = 0;
  const gameArea = document.getElementById("gameArea");
  const scoreText = document.getElementById("scoreText");

  function startGame() {
    score = 0;
    scoreText.textContent = "Score: 0";

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.classList.add("game-heart");
      heart.innerHTML = "❤️";

      heart.style.left = Math.random() * 90 + "%";
      heart.style.top = Math.random() * 80 + "%";

      heart.onclick = () => {
        score++;
        scoreText.textContent = "Score: " + score;
        heart.remove();

        if (score === 3) {
          clearInterval(interval);
          alert("You caught my heart ❤️🥹");
        }
      };

      gameArea.appendChild(heart);

      setTimeout(() => heart.remove(), 2000);
    }, 800);
  }

  gifts.forEach(gift => {
    gift.addEventListener("click", () => {
      gift.classList.add("open");

      setTimeout(() => {
        const type = gift.dataset.gift;
        openGift(type);
      }, 600);
    });
  });

  // Quiz data (CUSTOMIZE QUESTIONS!)
  const quizzes = {
    letter: {
      question: "Where did we go for our first date?",
      options: ["The Big Chill", "Diggin", "Music and Mountains", "Bread and More"],
      answer: 2
    },
    gallery: {
      question: "When did I said I love you for the first time?",
      options: ["May 2021", "March 2021", "January 2021", "September 2021"],
      answer: 1
    },
    timer: {
      question: "What was the exact time when I proposed?",
      options: ["7:35 PM", "9 PM", "6:45 PM", "8:30 PM"],
      answer: 0
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
    showQuiz("letter", () => {
      questionBox.classList.add("hidden");
      yesBox.classList.remove("hidden");
      loveText.innerHTML = "";
      index = 0;
      typeLetter();
      startBigHearts();
    });
  });

  // Next from love letter → gallery
  nextBtn.addEventListener("click", () => {
    showQuiz("gallery", () => {
      yesBox.classList.add("hidden");
      giftsBox.classList.remove("hidden");
      startBigHearts();
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
      giftsBox.classList.add("hidden");
      timerBox.classList.remove("hidden");
      updateTimer();
      setInterval(updateTimer, 1000);
      startBigHearts();
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

  function startBigHearts() {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart", "big-heart");
      heart.innerHTML = "❤️";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 6 + Math.random() * 4 + "s";

      document.getElementById("hearts").appendChild(heart);

      setTimeout(() => heart.remove(), 9000);
    }, 500);
  }

  function openGift(type) {
    giftsBox.classList.add("hidden");

    if (type === "letter") {
      document.getElementById("letterGift").classList.remove("hidden");
    }

    if (type === "video") {
      document.getElementById("videoGift").classList.remove("hidden");
    }

    if (type === "game") {
      document.getElementById("gameGift").classList.remove("hidden");
      startGame();
    }
  }

  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("backBtn")) return;

    // Hide all gift pages
    document.getElementById("letterGift")?.classList.add("hidden");
    document.getElementById("videoGift")?.classList.add("hidden");
    document.getElementById("gameGift")?.classList.add("hidden");

    // Stop video if exists
    const video = document.querySelector("#videoGift video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    // Reset game if exists
    const gameArea = document.getElementById("gameArea");
    if (gameArea) {
      gameArea.innerHTML = "";
    }

    // Show gifts page
    giftsBox.classList.remove("hidden");
  });

});
