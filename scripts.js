// ===========================
// DOMContentLoaded
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // Intersection Observer (for animations)
  // ===========================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("hidden-before");
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Apply observer to all animated elements initially
  document.querySelectorAll(".fade-slide-up").forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });

  // ===========================
  // Load Contributors
  // ===========================
  fetch("contributors.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("contributors-list");
      data.forEach((contributor, index) => {
        const card = document.createElement("div");
        card.className =
          "p-6 bg-white rounded-xl shadow hover:shadow-lg transition hidden-before fade-slide-up";
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animationPlayState = "paused";

        card.innerHTML = `
          <img src="${contributor.image}" alt="${contributor.name}" 
               class="mx-auto rounded-full mb-4 w-24 h-24 object-cover">
          <h4 class="font-semibold text-lg">${contributor.name}</h4>
          <p class="text-gray-600 text-sm">${contributor.role}</p>
        `;

        container.appendChild(card);
        observer.observe(card);
      });
    });

  // ===========================
  // Load Features
  // ===========================
  fetch("features.json")
    .then((res) => res.json())
    .then((features) => {
      const container = document.getElementById("features-list");
      features.forEach((feature, index) => {
        const card = document.createElement("div");
        card.className =
          "p-6 bg-white rounded-xl shadow hover:shadow-lg transition hidden-before fade-slide-up";
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animationPlayState = "paused";

        card.innerHTML = `
          <h3 class="text-xl font-semibold mb-2">${feature.icon} ${feature.title}</h3>
          <p class="text-gray-600">${feature.description}</p>
        `;

        container.appendChild(card);
        observer.observe(card);
      });
    });
});

// ===========================
// Carousel
// ===========================
const carousel = document.getElementById("carousel");
if (carousel) {
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

  // Swipe support for mobile
  let startX = 0;
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) prevSlide();
    else if (startX - endX > 50) nextSlide();
  });
}

// ===========================
// Mobile menu toggle
// ===========================
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
