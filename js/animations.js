// Genshin Impact Inspired Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page with some ambient particles
    createAmbientParticles();
    
    // Add subtle hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createButtonParticles(this);
        });
    });
    
    // Initialize music player
    initMusicPlayer();
});

// Vision selection and animation
function selectVision() {
    if (visions.length === 0) {
        alert('¡Ya has obtenido todas las visiones!');
        return;
    }
    
    // Play selection sound
    playSound('select');
    
    // Hide previous vision if any
    const visionElement = document.getElementById("vision");
    visionElement.classList.remove('reveal');
    
    // Hide previous icon if any
    const iconElement = document.getElementById("element-icon");
    if (iconElement) {
        iconElement.classList.remove('show');
    }
    
    // Create element burst effect
    createElementBurst();
    
    // Wait for animation to complete before showing the result
    setTimeout(() => {
        const index = Math.floor(Math.random() * visions.length);
        const vision = visions[index];
        
        // Update vision text
        visionElement.innerHTML = vision;
        visionElement.className = vision;
        
        // Add reveal class for animation
        setTimeout(() => {
            visionElement.classList.add('reveal');
            
            // Update or create element icon
            updateElementIcon(vision);
            
            // Create particles specific to the element
            createElementParticles(vision, 30);
            
            // Play reveal sound
            playSound('reveal');
            
            // Add to history
            addToHistory(vision);
            
            // Remove the vision from the array
            visions.splice(index, 1);
        }, 200);
    }, 1000);
}

// Create ambient background particles
function createAmbientParticles() {
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Random size
        const size = Math.random() * 5 + 2;
        
        // Random color (gold/blue tint)
        const colors = ['rgba(230, 199, 139, 0.7)', 'rgba(59, 94, 140, 0.7)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = color;
        
        // Add to DOM
        document.querySelector('.particles-container').appendChild(particle);
        
        // Animate
        gsap.to(particle, {
            y: posY - 100 - Math.random() * 100,
            x: posX + (Math.random() * 50 - 25),
            opacity: 1,
            duration: 0.2,
            onComplete: () => {
                gsap.to(particle, {
                    y: posY - 200 - Math.random() * 100,
                    opacity: 0,
                    duration: 3 + Math.random() * 2,
                    ease: "power1.out",
                    onComplete: () => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }
                });
            }
        });
    }, 300);
}

// Create button hover particles
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Position around the button
        const posX = rect.left + Math.random() * rect.width;
        const posY = rect.bottom;
        
        // Random size
        const size = Math.random() * 6 + 3;
        
        // Set styles
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = 'rgba(230, 199, 139, 0.8)';
        
        // Add to DOM
        document.querySelector('.particles-container').appendChild(particle);
        
        // Animate
        gsap.to(particle, {
            y: posY - 20 - Math.random() * 30,
            x: posX + (Math.random() * 20 - 10),
            opacity: 1,
            duration: 0.2,
            onComplete: () => {
                gsap.to(particle, {
                    y: posY - 50 - Math.random() * 20,
                    opacity: 0,
                    duration: 0.8 + Math.random() * 0.4,
                    ease: "power1.out",
                    onComplete: () => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }
                });
            }
        });
    }
}

// Create element burst animation when selecting a vision
function createElementBurst() {
    const container = document.getElementById('vision-container');
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create burst circle
    const burstCircle = document.createElement('div');
    burstCircle.style.position = 'absolute';
    burstCircle.style.left = centerX + 'px';
    burstCircle.style.top = centerY + 'px';
    burstCircle.style.width = '0';
    burstCircle.style.height = '0';
    burstCircle.style.borderRadius = '50%';
    burstCircle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    burstCircle.style.transform = 'translate(-50%, -50%)';
    burstCircle.style.zIndex = '1';
    
    document.querySelector('.particles-container').appendChild(burstCircle);
    
    // Animate burst
    gsap.to(burstCircle, {
        width: '300px',
        height: '300px',
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            if (burstCircle.parentNode) {
                burstCircle.parentNode.removeChild(burstCircle);
            }
        }
    });
    
    // Create particles in a circle
    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const posX = centerX + Math.cos(angle) * distance;
        const posY = centerY + Math.sin(angle) * distance;
        
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 8 + 4;
        
        // Set styles
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        
        // Add to DOM
        document.querySelector('.particles-container').appendChild(particle);
        
        // Animate
        gsap.to(particle, {
            x: posX - centerX,
            y: posY - centerY,
            opacity: 1,
            duration: 0.3,
            delay: Math.random() * 0.2,
            onComplete: () => {
                gsap.to(particle, {
                    x: (posX - centerX) * 3,
                    y: (posY - centerY) * 3,
                    opacity: 0,
                    duration: 0.8 + Math.random() * 0.4,
                    ease: "power1.out",
                    onComplete: () => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }
                });
            }
        });
    }
}

// Create element-specific particles
function createElementParticles(element, count) {
    const container = document.getElementById('vision-container');
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get element color
    let color;
    switch(element) {
        case 'Pyro':
            color = 'rgba(242, 75, 49, 0.8)';
            break;
        case 'Hydro':
            color = 'rgba(51, 153, 255, 0.8)';
            break;
        case 'Aero':
            color = 'rgba(136, 204, 255, 0.8)';
            break;
        case 'Electro':
            color = 'rgba(167, 87, 203, 0.8)';
            break;
        case 'Geo':
            color = 'rgba(233, 180, 49, 0.8)';
            break;
        case 'Natura':
            color = 'rgba(80, 200, 120, 0.8)';
            break;
        default:
            color = 'rgba(255, 255, 255, 0.8)';
    }
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position around the center
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const posX = centerX + Math.cos(angle) * distance;
        const posY = centerY + Math.sin(angle) * distance;
        
        // Random size
        const size = Math.random() * 8 + 4;
        
        // Set styles
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = color;
        
        // Add to DOM
        document.querySelector('.particles-container').appendChild(particle);
        
        // Animate
        gsap.to(particle, {
            x: posX - centerX,
            y: posY - centerY,
            opacity: 1,
            duration: 0.5,
            delay: 0.2 + Math.random() * 0.3,
            onComplete: () => {
                gsap.to(particle, {
                    x: (posX - centerX) * 1.5,
                    y: (posY - centerY) * 1.5,
                    opacity: 0,
                    duration: 1.5 + Math.random() * 1,
                    ease: "power1.out",
                    onComplete: () => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }
                });
            }
        });
    }
}

// Update element icon
function updateElementIcon(vision) {
    let iconElement = document.getElementById("element-icon");
    
    if (!iconElement) {
        iconElement = document.createElement('div');
        iconElement.id = "element-icon";
        iconElement.classList.add('element-icon');
        document.getElementById('vision-container').prepend(iconElement);
    }
    
    // Remove all previous element classes
    iconElement.className = 'element-icon';
    
    // Add the specific vision class
    iconElement.classList.add(vision);
    
    // Show with animation
    setTimeout(() => {
        iconElement.classList.add('show');
    }, 200);
}

// Add to vision history
function addToHistory(vision) {
    const historyContainer = document.querySelector('.vision-history-items');
    if (!historyContainer) return;
    
    const historyItem = document.createElement('div');
    historyItem.classList.add('vision-history-item', vision);
    historyItem.textContent = vision;
    
    historyContainer.appendChild(historyItem);
}

// Play sound effects
function playSound(type) {
    let soundUrl;
    
    switch(type) {
        case 'select':
            soundUrl = 'https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3';
            break;
        case 'reveal':
            soundUrl = 'https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3';
            break;
        default:
            return;
    }
    
    const sound = new Audio(soundUrl);
    sound.volume = 0.3;
    sound.play().catch(e => console.log("Sound play prevented by browser policy"));
}

// Music Player Implementation

// The music will be loaded from an mp3 file within the music folder
let backgroundMusic = null;
let isMusicPlaying = false;

function initMusicPlayer() {
    // Create the audio element for background music
    backgroundMusic = new Audio();
    
    // Genshin Impact inspired music URLs (royalty-free alternatives)
    const musicTracks = [
        'music/quiz.mp3'
    ];
    
    // Select a random track
    const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
    backgroundMusic.src = randomTrack;
    
    // Loop the music
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.4;
    
    // Set up music toggle button
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    // Handle music ending
    backgroundMusic.addEventListener('ended', function() {
        // In case loop doesn't work in some browsers
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(e => console.log("Music autoplay prevented by browser policy"));
    });
}

function toggleMusic() {
    const musicToggle = document.getElementById('music-toggle');
    
    if (!isMusicPlaying) {
        // Start playing music
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            if (musicToggle) {
                musicToggle.classList.add('playing');
                musicToggle.setAttribute('title', 'Pause Music');
            }
        }).catch(e => {
            console.log("Music play prevented by browser policy. User interaction required.");
            alert("Click again to play music. Browsers require user interaction to play audio.");
        });
    } else {
        // Pause the music
        backgroundMusic.pause();
        isMusicPlaying = false;
        if (musicToggle) {
            musicToggle.classList.remove('playing');
            musicToggle.setAttribute('title', 'Play Music');
        }
    }
}
