// Lógica de los carruseles (Autoplay y botones)
function carouselMove(id, dir){
  const car = document.getElementById(id);
  const slides = car.querySelectorAll('.slide');
  if(slides.length < 2) return;
  let idx = [...slides].findIndex(s => s.classList.contains('active'));
  slides[idx].classList.remove('active');
  idx = (idx + dir + slides.length) % slides.length;
  slides[idx].classList.add('active');
}
document.querySelectorAll('.carousel').forEach(car => {
  setInterval(() => carouselMove(car.id, 1), 3000);
});

// Lógica del Lightbox (Modal pantalla completa)
document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById("imageModal");
  if (!modal) return; // Si la página no tiene el modal, no ejecutar esta parte

  var modalImg = document.getElementById("fullSizeImg");
  var closeBtn = document.getElementsByClassName("img-modal-close")[0];
  var prevBtn = document.getElementsByClassName("img-modal-prev")[0];
  var nextBtn = document.getElementsByClassName("img-modal-next")[0];

  var currentImages = []; 
  var currentIndex = 0;   

  // Activa el clic en todos los carruseles
  var carousels = document.querySelectorAll(".carousel");
  
  carousels.forEach(function(carousel) {
    var slides = carousel.querySelectorAll(".slide");
    
    slides.forEach(function(img, index) {
      img.style.cursor = "zoom-in";
      
      img.onclick = function() {
        currentImages = Array.from(slides);
        currentIndex = index;
        
        modal.style.display = "block";
        updateModalImage();
      }
    });
  });

  function updateModalImage() {
    modalImg.src = currentImages[currentIndex].src;
  }

  // Controles del Modal
  prevBtn.onclick = function(e) {
    e.stopPropagation(); // Evita que el clic cierre el fondo oscuro
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentImages.length - 1;
    updateModalImage();
  }

  nextBtn.onclick = function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex < currentImages.length - 1) ? currentIndex + 1 : 0;
    updateModalImage();
  }

  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  modal.onclick = function(e) {
    // Si haces clic fuera de la imagen o los botones, se cierra
    if (e.target !== modalImg && e.target !== prevBtn && e.target !== nextBtn) {
      modal.style.display = "none";
    }
  }
});