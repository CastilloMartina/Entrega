// menu alerta -->
 
  //  Pedimos el nombre al usuario
  const nombre = prompt("¡Hola! ¿Cómo te llamás?");
  
  //  Mostramos saludo con alert
  if (nombre) {
    alert(`¡Bienvenid@ a JetMood, ${nombre}!`);
    console.log(`Usuario ingresó: ${nombre}`);
  } else {
    alert("¡Bienvenid@ a JetMood!");
    console.log("Usuario no ingresó su nombre.");
  }

  //  Simulamos interés en descuentos
  const interesDescuentos = prompt("¿Te interesan nuestros descuentos? (sí/no)");
  
  if (interesDescuentos?.toLowerCase() === "sí") {
    alert("¡Perfecto! Próximamente te enviaremos novedades exclusivas ✈️");
    console.log(`${nombre || "Usuario"} está interesad@ en descuentos.`);
  } else {
    console.log(`${nombre || "Usuario"} no está interesad@ en descuentos.`);
  }

//carrusel opinion 
 
  const carousel = document.getElementById('carousel');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');

  const cardWidth = 320; // Ancho estimado de una tarjeta + gap

  next.addEventListener('click', () => {
    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  prev.addEventListener('click', () => {
    carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  // AUTOPLAY
  let autoScroll = setInterval(() => {
    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }, 5000); // cada 5 segundos

  // Reinicia autoplay si el usuario hace scroll manual
  carousel.addEventListener('scroll', () => {
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
      carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }, 5000);
  });


//-carrusel de imagenes

  const slides = document.querySelectorAll('.slide');
  const indicatorsContainer = document.querySelector('.indicators');
  let currentSlide = 0;
  let interval;

  // Crear indicadores
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = i;
      showSlide(currentSlide);
      resetInterval();
    });
    indicatorsContainer.appendChild(dot);
  });

  const indicators = document.querySelectorAll('.indicator');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    resetInterval();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    resetInterval();
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(interval);
    startAutoSlide();
  }

  startAutoSlide();

