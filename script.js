const player = document.getElementById("player");
const status = document.getElementById("status");
const startBtn = document.getElementById("start");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

startBtn.onclick = () => {
  recognition.start();
  status.textContent = "🎧 Listening...";
};

recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  status.textContent = `You said: "${command}"`;

  let mood = "neutral";
  if (command.includes("happy")) mood = "happy";
  else if (command.includes("sad")) mood = "sad";
  else if (command.includes("angry")) mood = "angry";
  else if (command.includes("relax")) mood = "calm";

  changeBackground(mood);

  // play music
  if (mood === "happy") player.src = "songs/happy.mp3";
  else if (mood === "sad") player.src = "songs/sad.mp3";
  else if (mood === "angry") player.src = "songs/angry.mp3";
  else if (mood === "calm") player.src = "songs/calm.mp3";
  else player.src = "songs/default.mp3";

  player.play();
};

function changeBackground(mood) {
  let gradient;
  if (mood === "happy") {
    gradient = "linear-gradient(135deg, #FFD1DC, #FF69B4)";
  } else if (mood === "sad") {
    gradient = "linear-gradient(135deg, #87CEFA, #4682B4)";
  } else if (mood === "angry") {
    gradient = "linear-gradient(135deg, #FF6347, #8B0000)";
  } else if (mood === "calm") {
    gradient = "linear-gradient(135deg, #98FB98, #20B2AA)";
  } else {
    gradient = "linear-gradient(135deg, #FFB6C1, #87CEEB)";
  }

  document.body.style.backgroundImage = gradient;
}

recognition.onerror = (e) => {
  console.error("Speech Recognition Error:", e.error);
  status.textContent = "⚠️ Try again, mic error or no speech detected.";
};

recognition.onend = () => {
  status.textContent += " (Stopped)";
};
