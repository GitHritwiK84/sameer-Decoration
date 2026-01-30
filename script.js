document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    // --- Sticky Header ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- Hamburger Menu ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // --- Active Nav Link on Scroll ---
    const activateNavOnScroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', activateNavOnScroll);


    // --- Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = item.src;
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // --- Animate on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    const formGroups = contactForm.querySelectorAll('.form-group[data-field]');

    const validators = {
        name: (value) => {
            value = value.trim();
            if (!value) return 'Please enter your name.';
            if (value.length < 2) return 'Name must be at least 2 characters.';
            return '';
        },
        email: (value) => {
            value = value.trim();
            if (!value) return 'Please enter your email.';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Please enter a valid email address.';
            return '';
        },
        phone: (value) => {
            const digits = value.replace(/\D/g, '');
            if (digits.length === 0) return 'Please enter your phone number.';
            if (digits.length < 10) return 'Please enter a valid 10-digit phone number.';
            if (digits.length > 15) return 'Phone number is too long.';
            return '';
        },
        message: (value) => {
            value = value.trim();
            if (!value) return 'Please enter your message.';
            if (value.length < 10) return 'Message must be at least 10 characters.';
            return '';
        }
    };

    function showFieldError(group, message) {
        group.classList.add('error');
        const errorEl = group.querySelector('.form-error');
        if (errorEl) errorEl.textContent = message;
    }

    function clearFieldError(group) {
        group.classList.remove('error');
        const errorEl = group.querySelector('.form-error');
        if (errorEl) errorEl.textContent = '';
    }

    function validateField(group) {
        const field = group.dataset.field;
        const input = group.querySelector('input, textarea');
        const value = input ? input.value : '';
        const error = validators[field](value);
        if (error) {
            showFieldError(group, error);
            return false;
        }
        clearFieldError(group);
        return true;
    }

    function validateForm() {
        let isValid = true;
        formGroups.forEach(group => {
            if (!validateField(group)) isValid = false;
        });
        return isValid;
    }

    // Submit: validate then open WhatsApp with pre-filled message (9113303790)
    const whatsappNumber = '919113303790';
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm()) {
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                const input = firstError.querySelector('input, textarea');
                if (input) input.focus();
            }
            return;
        }
        const name = contactForm.querySelector('[name="name"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const phone = contactForm.querySelector('[name="phone"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();
        const text = [
            'New Query - Sameer Decoration',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            '',
            'Message:',
            message
        ].join('\n');
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(whatsappURL, '_blank');
        contactForm.reset();
        formGroups.forEach(group => clearFieldError(group));
    });

    // Clear error on input (real-time feedback)
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('input', () => clearFieldError(group));
            input.addEventListener('blur', () => validateField(group));
        }
    });
});


let heroIndex = 0;

setInterval(() => {
  heroIndex = (heroIndex + 1) % heroTexts.length;
  document.getElementById("hero-text").innerText = heroTexts[heroIndex];
}, 2500); // 2500ms = 2.5 seconds

const snowContainer = document.getElementById("snow-container");
const heroText = document.getElementById("hero-text");

// split text into spans
const words = heroText.innerText.split(" ");
heroText.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");

const flowers = ["🌸", "🌺", "🌼", "💐"];

function createFlower() {
  const flower = document.createElement("div");
  flower.classList.add("snowflake");
  flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

  flower.style.left = Math.random() * 100 + "vw";
  flower.style.animationDuration = Math.random() * 5 + 5 + "s";
  flower.style.fontSize = Math.random() * 15 + 15 + "px";

  snowContainer.appendChild(flower);

  const checkCollision = setInterval(() => {
    const flowerRect = flower.getBoundingClientRect();
    const wordSpans = document.querySelectorAll(".word");

    wordSpans.forEach(word => {
      const wordRect = word.getBoundingClientRect();

      if (
        flowerRect.top < wordRect.bottom &&
        flowerRect.bottom > wordRect.top &&
        flowerRect.left < wordRect.right &&
        flowerRect.right > wordRect.left
      ) {
        word.classList.add("word-bounce");
        setTimeout(() => word.classList.remove("word-bounce"), 400);

        flower.remove();
        clearInterval(checkCollision);
      }
    });
  }, 50);

  setTimeout(() => {
    flower.remove();
    clearInterval(checkCollision);
  }, 10000);
}

setInterval(createFlower, 300);
