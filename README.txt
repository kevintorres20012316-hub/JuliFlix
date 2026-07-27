JuliFlix — cómo armar la carpeta final
========================================

Estructura ya lista en este ZIP/carpeta:

JuliFlix/
├── index.html
├── style.css
├── script.js
├── img/        <- coloca aquí TODAS tus fotos
├── video/      <- coloca aquí tus videos
├── music/      <- coloca aquí: fondo.mp3, cita.mp3, final.mp3
└── sounds/     <- coloca aquí: projector.mp3


FOTOS que van en /img (nombres exactos, respeta mayúsculas y espacios):
- llamadas.jpeg
- mi amor.jpeg
- cine.jpeg
- pizza.jpg
- alitas.jpg
- micheladas.jpg
- cena.jpeg
- mi favorita sub.jpeg
- foto en la u.jpeg
- graduacion.jpeg
- mi grado.jpeg
- otavalo.jpeg
- los dos en moto.jpg
- moto.jpeg
- moto1.jpeg
- moto3.jpeg
- moto4.jpeg
- moto5.jpeg
- manualidades.jpeg

VIDEOS que van en /video:
- videos de las motos.mp4
- nuestro amor.mp4
  (nota: "nuestro amor.mp4" se usa dos veces: en la escena 7 y en la escena 8)

MÚSICA que va en /music:
- fondo.mp3     -> suena de fondo en splash, intro y catálogo
- cita.mp3      -> reemplaza el fondo mientras ves la escena "Primera cita"
- final.mp3     -> suena en la pantalla final ("Continuará...")

SONIDO que va en /sounds:
- projector.mp3 -> un clic corto que suena cada vez que abres o cambias de escena


IMPORTANTE sobre nombres de archivo:
- Si alguno de tus archivos reales tiene una extensión distinta a la de
  arriba (por ejemplo "alitas.png" en vez de "alitas.jpg"), edita el nombre
  dentro de script.js (arreglo "scenes") para que coincida EXACTO.
- Evita tildes/ñ en los nombres de archivo si puedes; los espacios sí
  funcionan pero es más seguro reemplazarlos por guiones bajos si tienes
  problemas al subir el proyecto a un hosting.

CÓMO PROBARLO:
- Simplemente abre index.html en el navegador (doble clic).
- El sonido no se reproduce automáticamente al cargar la página porque los
  navegadores bloquean el autoplay con audio hasta que el usuario interactúa;
  por eso el botón 🔈 en la esquina inferior derecha activa la música, y al
  darle "Reproducir" en la portada también se dispara la música de fondo.
