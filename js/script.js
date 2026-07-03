// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// FAQ Accordion
function toggleFaq(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });

    // Open clicked if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Trigger hero animations immediately
document.querySelectorAll('.hero .fade-in').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
});

// ===== MODAL FUNCTIONS =====
const modalOverlay = document.getElementById('modalOverlay');
const toast = document.getElementById('toast');

function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus first input after animation
    setTimeout(() => {
        document.getElementById('contactName').focus();
    }, 300);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function closeModalOnOverlay(event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const username = document.getElementById('contactUsername').value.trim();

    if (name && email && username) {
        // Show success toast
        toast.classList.add('show');

        // Reset form
        event.target.reset();

        // Close modal
        setTimeout(() => {
            closeModal();
        }, 800);

        // Hide toast after delay
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
}

// contact form additional scripts

const contactMethod = document.getElementById('contactMethod');

const textGroup = document.getElementById('textContactGroup');
const phoneGroup = document.getElementById('phoneGroup');

const dynamicLabel = document.getElementById('dynamicLabel');
const dynamicInput = document.getElementById('dynamicInput');

const phoneInput = document.querySelector("#phoneInput");

/* Инициализация phone input */
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto",
    separateDialCode: true,

    geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("us"));
    },

    loadUtils: () =>
        import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js")
});

/* Логика переключения */
contactMethod.addEventListener('change', function () {

    const value = this.value;

    textGroup.classList.add('hidden');
    phoneGroup.classList.add('hidden');

    dynamicInput.required = false;
    phoneInput.required = false;

    if (
        value === 'telegram' ||
        value === 'whatsapp' ||
        value === 'instagram'
    ) {

        textGroup.classList.remove('hidden');

        dynamicLabel.textContent =
            value.charAt(0).toUpperCase() + value.slice(1);

        dynamicInput.placeholder =
            `Enter your ${value}`;

        dynamicInput.required = true;
    }

    if (value === 'phone') {
        phoneGroup.classList.remove('hidden');
        phoneInput.required = true;
    }
});