// ===========================
// Contributors Loader
// ===========================
fetch("contributors.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("contributors-list");
    data.forEach((contributor) => {
      container.innerHTML += `
        <div class="p-6 bg-white rounded-xl shadow">
          <img src="${contributor.image}" alt="${contributor.name}" class="mx-auto rounded-full mb-4 w-28 h-28 object-cover">
          <h4 class="text-lg font-semibold">${contributor.name}</h4>
          <p class="text-gray-600">${contributor.role}</p>
        </div>
      `;
    });
  })
  .catch((err) => console.error("Error loading contributors:", err));

// ===========================
// Carousel
// ===========================
const carousel = document.getElementById("carousel");
const slides = carousel.children;
let index = 0;

function showSlide(i) {
  if (i < 0) index = slides.length - 1;
  else if (i >= slides.length) index = 0;
  else index = i;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// ===========================
// Swipe Support for Mobile
// ===========================
let startX = 0;
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) prevSlide();
  else if (startX - endX > 50) nextSlide();
});

// Mobile menu toggle
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
