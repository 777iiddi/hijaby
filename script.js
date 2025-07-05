// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "none";
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// CTA Popup functionality
const ctaPopup = document.getElementById("cta-popup");
const popupCloseButtons = document.querySelectorAll(".popup-close");

// Show popup after 5 seconds
setTimeout(() => {
    if (!localStorage.getItem("popupShown")) {
        ctaPopup.classList.add("show");
    }
}, 5000);

// Close popup functionality
popupCloseButtons.forEach(button => {
    button.addEventListener("click", () => {
        ctaPopup.classList.remove("show");
        localStorage.setItem("popupShown", "true");
    });
});

// Close popup when clicking outside
ctaPopup.addEventListener("click", (e) => {
    if (e.target === ctaPopup) {
        ctaPopup.classList.remove("show");
        localStorage.setItem("popupShown", "true");
    }
});

// Form submission
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector("input[type=\"text\"]").value;
        const email = contactForm.querySelector("input[type=\"email\"]").value;
        const phone = contactForm.querySelector("input[type=\"tel\"]").value;
        const message = contactForm.querySelector("textarea").value;
        
        // Simple validation
        if (!name || !email || !phone || !message) {
            alert("يرجى ملء جميع الحقول المطلوبة");
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector("button[type=\"submit\"]");
        const originalText = submitButton.textContent;
        submitButton.textContent = "جاري الإرسال...";
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".feature, .collection-card, .testimonial").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll(".stat h3");
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ""));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes("+")) {
                    counter.textContent = Math.ceil(current) + "+";
                } else if (counter.textContent.includes("★")) {
                    counter.textContent = Math.ceil(current) + "★";
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (counter.textContent.includes("+")) {
                    counter.textContent = target + "+";
                } else if (counter.textContent.includes("★")) {
                    counter.textContent = target + "★";
                }
                else {
                    counter.textContent = target;
                }
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".hero-stats");
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Image lazy loading
const images = document.querySelectorAll("img");
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = "1";
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
    imageObserver.observe(img);
    
    // Set opacity to 1 when image loads
    img.addEventListener("load", () => {
        img.style.opacity = "1";
    });
});

// Add to cart functionality (simulation)
document.querySelectorAll(".btn-white, .btn-primary").forEach(button => {
    if (button.textContent.includes("تسوقي الآن")) {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Create a temporary notification
            const notification = document.createElement("div");
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #d4af37;
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 10000;
                font-weight: 600;
                box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            notification.textContent = "تم إضافة المنتج إلى السلة!";
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = "translateX(0)";
            }, 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = "translateX(100%)";
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    }
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-image img");
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
    }
});

// Add loading animation
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 0.5s ease";
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    // Set initial body opacity
    document.body.style.opacity = "0";
    
    // Add smooth reveal animation
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});



