// Image paths provided by user
const imagePaths = [
    "D:/sabah's projects/41/photos/IMG-20240925-WA0374.jpg",
    "D:/sabah's projects/41/photos/IMG-20240925-WA0375.jpg",
    "D:/sabah's projects/41/photos/IMG-20241001-WA0046.jpg",
    "D:/sabah's projects/41/photos/IMG-20241001-WA0047.jpg",
    "D:/sabah's projects/41/photos/IMG-20241001-WA0065.jpg",
    "D:/sabah's projects/41/photos/IMG-20241003-WA0088_1.jpg",
    "D:/sabah's projects/41/photos/IMG-20241019-WA0051_1.jpg",
    "D:/sabah's projects/41/photos/IMG-20241029-WA0201.jpg",
    "D:/sabah's projects/41/photos/IMG-20241030-WA0041.jpg",
    "D:/sabah's projects/41/photos/IMG-20241030-WA0042.jpg",
    "D:/sabah's projects/41/photos/IMG-20241030-WA0044.jpg",
    "D:/sabah's projects/41/photos/IMG-20241116-WA0097.jpg",
    "D:/sabah's projects/41/photos/IMG-20241117-WA0102.jpg",
    "D:/sabah's projects/41/photos/IMG-20241119-WA0082.jpg",
    "D:/sabah's projects/41/photos/IMG-20241119-WA0087.jpg",
    "D:/sabah's projects/41/photos/IMG-20241124-WA0011.jpg",
    "D:/sabah's projects/41/photos/IMG-20250101-WA0031.jpg",
    "D:/sabah's projects/41/photos/IMG-20250101-WA0032.jpg",
    "D:/sabah's projects/41/photos/IMG-20240516-WA0038 - Copy.jpg",
    "D:/sabah's projects/41/photos/IMG-20240921-WA0006 - Copy.jpg",
    "D:/sabah's projects/41/photos/IMG-20240921-WA0008.jpg",
    "D:/sabah's projects/41/photos/IMG-20240921-WA0010.jpg",
    "D:/sabah's projects/41/photos/IMG-20240924-WA0070.jpg"
];

// Love messages
const loveMessages = [
    "💕 You are my star in the sky of life",
    "🌟 With you every moment becomes more beautiful",
    "💖 Your love lights up my entire universe",
    "✨ You are my favorite planet",
    "💫 In your eyes I see galaxies of love",
    "🌙 You are my moon in lonely nights",
    "⭐ Your love is stronger than Earth's gravity",
    "💝 You are the secret of my happiness in this universe",
    "🌺 Every heartbeat whispers your name",
    "💞 You make my world spin with joy",
    "🌸 In this vast cosmos, you are my home",
    "💗 Your smile is brighter than all the stars"
];

// Global variables
let orbitingImages = [];
let messageTimeout;
let currentMessageIndex = 0;
let isPlaying = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    createOrbitingImages();
    setupEventListeners();
    startRandomMessages();
    setupPlanetInteraction();
});

// Create orbiting images around Saturn
function createOrbitingImages() {
    const container = document.querySelector('.orbiting-images');
    const totalImages = 40; // Number of images to display (with repetitions)
    
    for (let i = 0; i < totalImages; i++) {
        const img = document.createElement('img');
        img.className = 'orbiting-image';
        
        // Use images from the provided paths, repeating them to fill all positions
        const imageIndex = i % imagePaths.length;
        img.src = imagePaths[imageIndex];
        img.alt = `Romantic memory ${i + 1}`;
        
        // Calculate position in orbit
        const angle = (360 / totalImages) * i;
        const radius = 250 + (i % 3) * 50; // Vary the radius for different orbit levels
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = 'translate(-50%, -50%)';
        
        // Add rotation animation
        img.style.animation = `orbit ${20 + (i % 3) * 10}s linear infinite`;
        img.style.animationDelay = `${i * 0.5}s`;
        
        // Add click event
        img.addEventListener('click', () => openImageModal(img.src, i));
        
        container.appendChild(img);
        orbitingImages.push(img);
    }
    
    // Add CSS animation for orbiting
    addOrbitAnimation();
}

// Add orbit animation CSS dynamically
function addOrbitAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes orbit {
            from {
                transform: translate(-50%, -50%) rotate(0deg) translateX(250px) rotate(0deg);
            }
            to {
                transform: translate(-50%, -50%) rotate(360deg) translateX(250px) rotate(-360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Setup event listeners
function setupEventListeners() {
    // Close modal
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('imageModal');
    
    closeModal.addEventListener('click', closeImageModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Music toggle
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.addEventListener('click', toggleMusic);
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

// Open image modal
function openImageModal(imageSrc, imageIndex) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalMessage = document.getElementById('modalMessage');
    
    modalImage.src = imageSrc;
    modalMessage.textContent = loveMessages[imageIndex % loveMessages.length];
    
    modal.style.display = 'block';
    
    // Add entrance animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Play sound effect (if available)
    playClickSound();
}

// Close image modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Setup planet interaction
function setupPlanetInteraction() {
    const saturn = document.querySelector('.saturn');
    
    saturn.addEventListener('click', function() {
        // Show random love message
        showRandomMessage();
        
        // Add special glow effect
        saturn.style.filter = 'brightness(1.5) drop-shadow(0 0 30px gold)';
        
        setTimeout(() => {
            saturn.style.filter = '';
        }, 1000);
        
        // Play sound effect
        playClickSound();
    });
    
    // Hover effects
    saturn.addEventListener('mouseenter', function() {
        saturn.style.transform = 'scale(1.1)';
        saturn.style.filter = 'brightness(1.2)';
    });
    
    saturn.addEventListener('mouseleave', function() {
        saturn.style.transform = 'scale(1)';
        saturn.style.filter = '';
    });
}

// Show random love message
function showRandomMessage() {
    const messages = document.querySelectorAll('.love-message');
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];
    
    // Position message randomly on screen
    const x = Math.random() * (window.innerWidth - 300);
    const y = Math.random() * (window.innerHeight - 100);
    
    message.style.left = `${x}px`;
    message.style.top = `${y}px`;
    message.classList.add('show');
    
    // Hide message after 3 seconds
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);
}

// Start showing random messages periodically
function startRandomMessages() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 5 seconds
            showRandomMessage();
        }
    }, 5000);
}

// Toggle music (placeholder function)
function toggleMusic() {
    const button = document.getElementById('musicToggle');
    
    if (isPlaying) {
        button.textContent = '🎵';
        button.style.background = 'rgba(255, 255, 255, 0.1)';
        isPlaying = false;
        // Stop music here
    } else {
        button.textContent = '🎶';
        button.style.background = 'rgba(255, 215, 0, 0.2)';
        isPlaying = true;
        // Start music here
    }
}

// Play click sound effect (placeholder)
function playClickSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Fallback: no sound if Web Audio API is not supported
        console.log('Audio not supported');
    }
}

// Add particle effects on image hover
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.orbiting-image');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            createParticles(img);
        });
    });
});

// Create particle effects
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#ffd700';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 6px #ffd700';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Add smooth scrolling and zoom effects
window.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    const saturn = document.querySelector('.saturn-container');
    const currentScale = saturn.style.transform.match(/scale\(([^)]+)\)/);
    let scale = currentScale ? parseFloat(currentScale[1]) : 1;
    
    if (e.deltaY < 0) {
        scale = Math.min(scale + 0.1, 2);
    } else {
        scale = Math.max(scale - 0.1, 0.5);
    }
    
    saturn.style.transform = `translate(-50%, -50%) scale(${scale})`;
}, { passive: false });

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case ' ': // Spacebar
            e.preventDefault();
            showRandomMessage();
            break;
        case 'm':
        case 'M':
            toggleMusic();
            break;
        case 'r':
        case 'R':
            // Reset zoom
            const saturn = document.querySelector('.saturn-container');
            saturn.style.transform = 'translate(-50%, -50%) scale(1)';
            break;
    }
});

// Add mobile touch support
let touchStartX, touchStartY;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Swipe gestures
    if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
        showRandomMessage();
    }
});

console.log('🌟 Planet of Love initialized successfully! 💕');
console.log('💫 Click on Saturn or images to see love messages!');
console.log('🎵 Press M to toggle music, Space for random message, R to reset zoom');
console.log('📱 On mobile: swipe to show love messages!');

