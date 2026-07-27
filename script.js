/* =========================================================
   CONTENIDO — edita aquí los textos, fechas, íconos y ARCHIVOS
   Las FOTOS deben estar en la carpeta /img
   Los VIDEOS deben estar en la carpeta /video
   (el código ya agrega automáticamente "img/" o "video/" delante
   del nombre de archivo, así que aquí solo pon el nombre tal cual)
   ========================================================= */
const scenes = [
  {
    icon: "✨",
    name: "Cómo se conocieron",
    tag: "El comienzo",
    eyebrow: "Escena 01",
    date: "El día en que todo empezó",
    text: `Dicen que el destino tiene formas muy curiosas de unir a las personas. Sin imaginarlo, ambos llegamos a trabajar en Almacenes Boyacá, sin saber que ese lugar cambiaría nuestras vidas. Al principio solo éramos dos compañeros más, pero poco a poco las conversaciones, las risas y los pequeños momentos hicieron que nos conociéramos mejor. Con el tiempo, muchos compañeros se fueron y, casi sin darnos cuenta, solo quedábamos tú y yo. Aunque al final los dos dejamos ese trabajo, Boyacá nos regaló lo más importante: el inicio de nuestra historia. Porque fue allí donde encontré a la mujer que hoy hace mi vida mucho más feliz. ❤️`,
    mediaType: "grid",
    media: ["mi amor.jpeg", "kevin2.jpg"]
  },
  {
    icon: "🍕",
    name: "Citas",
    tag: "Cine, pizza y buena compañía",
    eyebrow: "Escena 02",
    date: "Las veces que salíamos",
    text: "Lo que empezó como una amistad se convirtió en la emoción de querer compartir cada momento contigo. Salimos a conocer lugares nuevos, disfrutamos de pizzas, hamburguesas, KFC, Sweet & Coffee y muchas aventuras más. Entendí que no importaba el lugar, porque cualquier sitio se volvía especial si estabas a mi lado.",
    mediaType: "grid",
    media: ["coffe.jpg", "pizza.jpg", "alitas.jpg", "micheladas.jpg", "cine.jpeg", "helado.jpg"]
  },
  {
    icon: "💋",
    name: "Nuestros besos",
    tag: "El instante que cambió todo",
    eyebrow: "Escena 03",
    date: "El momento que quedó grabado",
    text: "Hubo un instante, breve pero eterno, en el que las palabras sobraron. Ese primer beso selló lo que ya era evidente: que esto apenas comenzaba, y que ninguno de los dos quería que terminara.",
    mediaType: "grid",
    media: ["cena.jpeg", "beso.jpg"]
  },
  {
    icon: "🎓",
    name: "Logros compartidos",
    tag: "Orgullo incondicional",
    eyebrow: "Escena 04",
    date: "Celebrando cada meta cumplida",
    text: "Cada meta que alcanzabas también era una alegría para mí. Verte esforzarte, crecer y cumplir tus sueños me hizo sentir un orgullo inmenso. Aprendí que amar también significa apoyar, celebrar y creer siempre en la persona que amas.",
    mediaType: "grid",
    media: ["mi favorita sub2.jpg", "graduacion.jpeg", "mi grado.jpeg", "mi favorita sub.jpg"]
  },
  {
    icon: "🧳",
    name: "Primer viaje",
    tag: "Nuevos lugares, misma compañía",
    eyebrow: "Escena 05",
    date: "La primera aventura juntos",
    text: "Nuevas calles, nuevos paisajes y la misma certeza de siempre: que la mejor parte de cualquier viaje es la compañía. Ese primer viaje a Otavalo enseñó que cualquier lugar se siente como hogar cuando se comparte con la persona correcta.",
    mediaType: "grid",
    media: ["otavalo.jpeg", "otavalo2.mp4"]
  },
  {
    icon: "🏍️",
    name: "Nuestras rutas",
    tag: "Pasión sobre ruedas",
    eyebrow: "Escena 06",
    date: "Cada kilómetro, una nueva página",
    text: "Cada salida en moto se convirtió en una nueva aventura. No importaba el destino, solo el hecho de recorrer el camino contigo. Descubrí que la felicidad muchas veces viaja sobre dos ruedas... y siempre a tu lado.",
    mediaType: "grid",
    media: ["moto.jpeg", "moto1.jpeg", "moto3.jpeg", "moto4.jpeg", "moto5.jpg", "videos de las motos.mp4"]
  },
  {
    icon: "🥂",
    name: "Primer aniversario",
    tag: "Un año, mil recuerdos",
    eyebrow: "Escena 07",
    date: "Celebrando el primer año",
    text: "Un año después, con una historia ya construida entre risas, aprendizajes y abrazos, llegó el momento de celebrar con detalles hechos a mano y con el corazón. No solo el tiempo compartido, sino todo lo que se convirtió en promesa de seguir escribiendo juntos.",
    mediaType: "grid",
    media: ["manualidades.jpg", "nuestro amor.mp4", "flores.mp4", "los dos en moto.jpg"]
  },
  {
    icon: "🎬",
    name: "Hoy",
    tag: "El presente",
    eyebrow: "Escena 08",
    date: "Aquí y ahora",
    text: "Hoy, con todo lo vivido, la historia sigue en pantalla. No hay guion escrito para lo que sigue, pero hay algo claro: quien protagoniza esta película lo sigue haciendo con la misma persona, con más ganas que nunca de continuar la escena.",
    mediaType: "grid",
    media: ["nuestro amor.mp4", "fotos2.jpg"]
  }
];

/* Escena (índice, empezando en 0) en la que suena "cita.mp3" en vez del fondo */
const CITA_SCENE_INDEX = 1;

/* ========================================================= */

let currentSceneIndex = 0;
let currentLightboxList = [];   // archivos de la escena abierta actualmente en el lightbox
let currentLightboxIndex = 0;

const screens = {
  splash: document.getElementById('screen-splash'),
  intro: document.getElementById('screen-intro'),
  catalog: document.getElementById('screen-catalog'),
  scene: document.getElementById('screen-scene'),
  ending: document.getElementById('screen-ending')
};

function showScreen(name){
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

/* ---------- helpers ---------- */
function isVideo(filename){
  return /\.(mp4|webm|mov|m4v)$/i.test(filename);
}

function mediaPath(filename){
  return isVideo(filename) ? `video/${filename}` : `img/${filename}`;
}

/* Elige una foto como miniatura si hay alguna disponible (evita que el
   video se vea negro/cargando en las tarjetas del catálogo). Si la escena
   solo tiene videos, usa el primer video. */
function pickThumbFile(media){
  if(!media || !media.length) return null;
  const firstImage = media.find(f => !isVideo(f));
  return firstImage || media[0];
}

/* Crea el elemento de media para USO GENERAL (miniaturas de catálogo) */
function buildThumbMedia(filename){
  const path = mediaPath(filename);
  const wrap = document.createElement('div');
  wrap.className = 'scene-card-thumb' + (isVideo(filename) ? ' is-video' : '');

  if(isVideo(filename)){
    const video = document.createElement('video');
    video.src = path;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.addEventListener('loadeddata', () => video.classList.add('is-loaded'));
    wrap.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = path;
    img.alt = 'Nuestro momento';
    img.loading = 'lazy';
    img.addEventListener('load', () => img.classList.add('is-loaded'));
    wrap.appendChild(img);
  }
  return wrap;
}

/* Crea un elemento de media clicable dentro del detalle de escena
   (con fade-in al cargar y apertura de lightbox al hacer clic) */
function buildMediaItem(filename, list, indexInList){
  const path = mediaPath(filename);
  const item = document.createElement('button');
  item.type = 'button';
  item.className = 'media-item' + (isVideo(filename) ? ' is-video' : '');
  item.setAttribute('aria-label', 'Ampliar');

  let el;
  if(isVideo(filename)){
    el = document.createElement('video');
    el.src = path;
    el.muted = true;
    el.loop = true;
    el.autoplay = true;
    el.playsInline = true;
    el.preload = 'metadata';
    el.addEventListener('loadeddata', () => el.classList.add('is-loaded'));
  } else {
    el = document.createElement('img');
    el.src = path;
    el.alt = 'Nuestro momento';
    el.loading = 'lazy';
    el.addEventListener('load', () => el.classList.add('is-loaded'));
  }
  item.appendChild(el);
  item.addEventListener('click', () => openLightbox(list, indexInList));
  return item;
}

/* ---------- particles ---------- */
function spawnParticles(containerId, count, useHeart){
  const layer = document.getElementById(containerId);
  if(!layer) return;
  layer.innerHTML = '';
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle' + (useHeart ? ' heart' : '');
    const size = useHeart ? 1 : (Math.random()*6+2);
    if(!useHeart){
      p.style.width = size+'px';
      p.style.height = size+'px';
    } else {
      p.textContent = '❤';
      p.style.fontSize = (Math.random()*10+10)+'px';
    }
    p.style.left = Math.random()*100+'%';
    p.style.bottom = '-5%';
    p.style.animationDuration = (Math.random()*8+8)+'s';
    p.style.animationDelay = (Math.random()*8)+'s';
    layer.appendChild(p);
  }
}
spawnParticles('particles-splash', 24, false);
spawnParticles('particles-intro', 18, false);
spawnParticles('particles-ending', 22, true);

/* ---------- catalog build ---------- */
const grid = document.getElementById('scene-grid');
scenes.forEach((s, i) => {
  const thumbFile = pickThumbFile(s.media);
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'scene-card';

  if(thumbFile){
    card.appendChild(buildThumbMedia(thumbFile));
  }

  const body = document.createElement('div');
  body.className = 'scene-card-body';
  body.innerHTML = `
    <span class="scene-num">${String(i+1).padStart(2,'0')}</span>
    <span class="scene-icon">${s.icon}</span>
    <div class="scene-name">${s.name}</div>
    <div class="scene-tag">${s.tag}</div>
  `;
  card.appendChild(body);

  card.addEventListener('click', () => openScene(i));
  grid.appendChild(card);
});

function openScene(index){
  currentSceneIndex = index;
  renderScene();
  showScreen('scene');
  playProjectorSound();
  updateBackgroundForScene();
}

function renderScene(){
  const s = scenes[currentSceneIndex];

  const mediaWrap = document.getElementById('detail-media');
  mediaWrap.innerHTML = '';

  if(s.media && s.media.length){
    if(s.mediaType === 'single'){
      const outer = document.createElement('div');
      outer.className = 'scene-media-wrap single';
      const btn = buildMediaItem(s.media[0], s.media, 0);
      // en modo single queremos la imagen grande sin el recorte 3/4 del grid
      btn.className = '';
      btn.style.cursor = 'zoom-in';
      btn.style.border = 'none';
      btn.style.boxShadow = 'none';
      btn.style.background = 'none';
      const el = btn.firstChild;
      el.classList.add('is-loaded');
      outer.appendChild(btn);
      mediaWrap.appendChild(outer);
    } else {
      const outer = document.createElement('div');
      outer.className = 'scene-media-wrap';
      const innerGrid = document.createElement('div');
      innerGrid.className = 'scene-media-grid';
      s.media.forEach((f, idx) => {
        innerGrid.appendChild(buildMediaItem(f, s.media, idx));
      });
      outer.appendChild(innerGrid);
      mediaWrap.appendChild(outer);
    }
  }

  document.getElementById('detail-icon').textContent = s.icon;
  document.getElementById('detail-eyebrow').textContent = s.eyebrow;
  document.getElementById('detail-title').textContent = s.name;
  document.getElementById('detail-date').textContent = s.date;
  document.getElementById('detail-text').textContent = s.text;

  document.getElementById('btn-prev').disabled = currentSceneIndex === 0;
  const nextBtn = document.getElementById('btn-next');
  nextBtn.textContent = currentSceneIndex === scenes.length - 1 ? 'Ir al final ›' : 'Siguiente ›';
}

document.getElementById('btn-prev').addEventListener('click', () => {
  if(currentSceneIndex > 0){
    currentSceneIndex--;
    renderScene();
    playProjectorSound();
    updateBackgroundForScene();
  }
});
document.getElementById('btn-next').addEventListener('click', () => {
  if(currentSceneIndex < scenes.length - 1){
    currentSceneIndex++;
    renderScene();
    playProjectorSound();
    updateBackgroundForScene();
  } else {
    showScreen('ending');
    playBackgroundTrack('music/final.mp3');
  }
});
document.getElementById('btn-back-catalog').addEventListener('click', () => {
  showScreen('catalog');
  playBackgroundTrack('music/fondo.mp3');
});
document.getElementById('btn-to-ending').addEventListener('click', () => {
  showScreen('ending');
  playBackgroundTrack('music/final.mp3');
});

/* ---------- splash -> intro sequence ---------- */
document.getElementById('btn-play').addEventListener('click', () => {
  playIntro();
  playBackgroundTrack('music/fondo.mp3');
});
document.getElementById('btn-skip').addEventListener('click', () => {
  clearIntroTimers();
  showScreen('catalog');
});

let introTimers = [];
function clearIntroTimers(){
  introTimers.forEach(t => clearTimeout(t));
  introTimers = [];
  document.querySelectorAll('.intro-step').forEach(el => el.classList.remove('show'));
}

function playIntro(){
  showScreen('intro');
  clearIntroTimers();
  const step1 = document.getElementById('intro-1');
  const step2 = document.getElementById('intro-2');
  const step3 = document.getElementById('intro-3');

  step1.classList.add('show');

  introTimers.push(setTimeout(() => {
    step1.classList.remove('show');
    step2.classList.add('show');
  }, 2600));

  introTimers.push(setTimeout(() => {
    step2.classList.remove('show');
    step3.classList.add('show');
  }, 5400));

  introTimers.push(setTimeout(() => {
    showScreen('catalog');
  }, 8200));
}

/* ---------- ending ---------- */
document.getElementById('btn-always').addEventListener('click', () => {
  const resp = document.getElementById('ending-response');
  resp.classList.add('show');
  burstHearts();
});

function burstHearts(){
  const layer = document.getElementById('particles-ending');
  for(let i=0;i<16;i++){
    const p = document.createElement('div');
    p.className = 'particle heart';
    p.textContent = '❤';
    p.style.left = (40 + Math.random()*20)+'%';
    p.style.bottom = '30%';
    p.style.fontSize = (Math.random()*14+12)+'px';
    p.style.animation = `drift ${Math.random()*3+3}s ease-out forwards`;
    layer.appendChild(p);
    setTimeout(() => p.remove(), 6500);
  }
}

/* =========================================================
   LIGHTBOX — zoom de fotos y videos al hacer clic
   ========================================================= */
const lightboxEl = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightbox-media');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxPrevBtn = document.getElementById('lightbox-prev');
const lightboxNextBtn = document.getElementById('lightbox-next');

function openLightbox(list, index){
  currentLightboxList = list;
  currentLightboxIndex = index;
  renderLightbox();
  lightboxEl.classList.add('active');
}

function renderLightbox(){
  const filename = currentLightboxList[currentLightboxIndex];
  const path = mediaPath(filename);
  lightboxMedia.innerHTML = '';

  let el;
  if(isVideo(filename)){
    el = document.createElement('video');
    el.src = path;
    el.controls = true;
    el.autoplay = true;
    el.playsInline = true;
  } else {
    el = document.createElement('img');
    el.src = path;
    el.alt = 'Nuestro momento';
  }
  lightboxMedia.appendChild(el);

  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxList.length}`;
  lightboxPrevBtn.disabled = currentLightboxIndex === 0;
  lightboxNextBtn.disabled = currentLightboxIndex === currentLightboxList.length - 1;
}

function closeLightbox(){
  lightboxEl.classList.remove('active');
  lightboxMedia.innerHTML = '';
}

function lightboxPrev(){
  if(currentLightboxIndex > 0){
    currentLightboxIndex--;
    renderLightbox();
  }
}
function lightboxNext(){
  if(currentLightboxIndex < currentLightboxList.length - 1){
    currentLightboxIndex++;
    renderLightbox();
  }
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightboxPrevBtn.addEventListener('click', lightboxPrev);
lightboxNextBtn.addEventListener('click', lightboxNext);

lightboxEl.addEventListener('click', (e) => {
  if(e.target === lightboxEl) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if(!lightboxEl.classList.contains('active')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') lightboxPrev();
  if(e.key === 'ArrowRight') lightboxNext();
});

/* =========================================================
   AUDIO — música real desde /music y sonido desde /sounds
   fondo.mp3   -> música de fondo (splash, intro, catálogo)
   cita.mp3    -> suena en vez del fondo en la escena "Citas"
   final.mp3   -> suena en la pantalla final
   projector.mp3 -> clic corto al abrir/cambiar de escena
   ========================================================= */

let soundOn = false;
let currentBgSrc = '';

const bgAudio = new Audio();
bgAudio.loop = true;
bgAudio.volume = 0.35;

const projectorAudio = new Audio('sounds/projector.mp3');
projectorAudio.volume = 0.5;

function playBackgroundTrack(src){
  currentBgSrc = src;
  if(!soundOn) return; // solo reproducir si el usuario activó el sonido
  if(bgAudio.getAttribute('src') !== src){
    bgAudio.src = src;
  }
  bgAudio.currentTime = 0;
  bgAudio.play().catch(() => {/* el navegador puede bloquear autoplay hasta interacción */});
}

function updateBackgroundForScene(){
  const track = currentSceneIndex === CITA_SCENE_INDEX ? 'music/cita.mp3' : 'music/fondo.mp3';
  playBackgroundTrack(track);
}

function playProjectorSound(){
  if(!soundOn) return;
  try{
    projectorAudio.currentTime = 0;
    projectorAudio.play().catch(() => {});
  }catch(e){}
}

function toggleSound(){
  soundOn = !soundOn;
  const btn = document.getElementById('sound-toggle');
  if(soundOn){
    btn.textContent = '🔊';
    if(currentBgSrc){
      bgAudio.src = currentBgSrc;
      bgAudio.play().catch(() => {});
    } else {
      playBackgroundTrack('music/fondo.mp3');
    }
  } else {
    btn.textContent = '🔈';
    bgAudio.pause();
  }
}

document.getElementById('sound-toggle').addEventListener('click', toggleSound);
