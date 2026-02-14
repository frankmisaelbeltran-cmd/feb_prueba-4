const video = document.getElementById("fogata-video");
const musica = document.getElementById("musica");
const overlay = document.getElementById("start-overlay");
const startBtn = document.getElementById("start-btn");
const subtitleOverlay = document.getElementById("subtitle-overlay");

const subtitles = [
  { start: 16.0, end: 19.0, text: "Feel like sun" },
  { start: 19.0, end: 21.0, text: "On my skin" },
  { start: 21.0, end: 23.0, text: "So this is love" },
  { start: 23.0, end: 25.0, text: "I know it is" },
  { start: 25.0, end: 27.0, text: "I know it sounds super cliche" },
  { start: 27.0, end: 30.0, text: "But you make me feel some typa way" },
  { start: 29.0, end: 35.0, text: "This is falling, falling in love" },
  { start: 35.0, end: 36.0, text: "Acaso no te has dado cuenta?" },
  { start: 36.0, end: 38.0, text: "De lo bien que me complementas" },
  { start: 38.0, end: 40.0, text: "Si quieres te invito a un helado y te lo exlico" },
  { start: 40.0, end: 42.0, text: "Lo chido que haces que me sienta" },
  { start: 42.0, end: 45.0, text: "Contigo estoy high sin avion me haces perder la razon" },
  { start: 45.0, end: 49.0, text: "Estoy todo el dia pensandote con mariposas en el corazon" },
  { start: 49.0, end: 53.0, text: "Y tu me pones todo de cabeza" },
  { start: 53.0, end: 56.0, text: "Tu eras esa ultima pieza" },
  { start: 56.0, end: 59.0, text: "Tu eres tan diferente" },
  { start: 59.0, end: 66.0, text: "Y no hay nadie que me vuele asi la mente como lo haces tu" },
  { start: 66.0, end: 70.0, text: "Feel like sun" },
];
const subtitleFocusLead = 2.0;
const subtitleFocusStart = Math.max(0, subtitles[0].start - subtitleFocusLead);
const subtitleFocusEnd = subtitles[subtitles.length - 1].end;

function updateSubtitleOverlay() {
  if (!subtitleOverlay) {
    return;
  }

  const time = musica.currentTime;
  const isFocusWindow = time >= subtitleFocusStart && time <= subtitleFocusEnd;
  document.body.classList.toggle("lyric-focus", isFocusWindow);

  const cue = subtitles.find((item) => time >= item.start && time < item.end);
  subtitleOverlay.textContent = cue ? cue.text : "";
}

async function startVideo() {
  startBtn.disabled = true;

  try {
    video.muted = false;
    await Promise.all([video.play(), musica.play()]);
    requestAnimationFrame(() => {
      document.body.classList.add("is-playing");
    });
    overlay.classList.add("is-hidden");
  } catch (error) {
    video.muted = true;

    try {
      await Promise.all([video.play(), musica.play()]);
      requestAnimationFrame(() => {
        document.body.classList.add("is-playing");
      });
      overlay.classList.add("is-hidden");
    } catch (innerError) {
      startBtn.disabled = false;
    }
  }
}

startBtn.addEventListener("click", startVideo);
musica.addEventListener("timeupdate", updateSubtitleOverlay);
musica.addEventListener("seeked", updateSubtitleOverlay);
