// No-library solution for cursor effects and music playback

document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor functionality without external libraries
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');
    
    // Track cursor state
    let cursorVisible = false;
    let cursorScaled = false;
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    
    // Animation properties
    const innerEaseSpeed = 0.2;
    const outerEaseSpeed = 0.1;
    let animationFrameId = null;
    
    // Show the cursor with CSS transitions
    const showCursor = function() {
        if (!cursorVisible) {
            cursorInner.style.opacity = 1;
            cursorOuter.style.opacity = 1;
            cursorVisible = true;
        }
    };
    
    // Hide the cursor with CSS transitions
    const hideCursor = function() {
        if (cursorVisible) {
            cursorInner.style.opacity = 0;
            cursorOuter.style.opacity = 0;
            cursorVisible = false;
        }
    };
    
    // Custom animation function (replacement for GSAP)
    const animate = function() {
        // Inner cursor follows mouse position instantly
        cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        
        // Outer cursor follows with smooth delay using linear interpolation
        outerX += (mouseX - outerX) * outerEaseSpeed;
        outerY += (mouseY - outerY) * outerEaseSpeed;
        cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
        
        // Continue animation loop
        animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animate();
    
    // Mouse movement tracking
    const mousemoveHandler = function(e) {
        // Get mouse position
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor on movement
        showCursor();
    };
    
    // Handle cursor when mouse leaves window
    const mouseleaveHandler = function() {
        hideCursor();
    };
    
    // Handle cursor when mouse enters window
    const mouseenterHandler = function() {
        showCursor();
    };
    
    // Handle hover effect on links/buttons
    const handleLinkHoverEnter = function() {
        cursorScaled = true;
        cursorInner.classList.add('cursor-hover');
        cursorOuter.classList.add('cursor-hover');
    };
    
    // Reset hover effect
    const handleLinkHoverLeave = function() {
        cursorScaled = false;
        cursorInner.classList.remove('cursor-hover');
        cursorOuter.classList.remove('cursor-hover');
    };
    
    // Handle project card hover effects
    const handleProjectHoverEnter = function() {
        cursorOuter.classList.add('project-hover');
    };
    
    // Reset project card hover effects
    const handleProjectHoverLeave = function() {
        cursorOuter.classList.remove('project-hover');
    };
    
    // Handle click effect
    const handleMouseDown = function() {
        cursorInner.classList.add('cursor-click');
        cursorOuter.classList.add('cursor-click');
    };
    
    // Reset after click
    const handleMouseUp = function() {
        cursorInner.classList.remove('cursor-click');
        cursorOuter.classList.remove('cursor-click');
    };
    
    // Add all event listeners
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseleave', mouseleaveHandler);
    document.addEventListener('mouseenter', mouseenterHandler);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add hover effect to all clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, input[type="submit"], .nav-link');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', handleLinkHoverEnter);
        element.addEventListener('mouseleave', handleLinkHoverLeave);
    });
    
    // Special effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', handleProjectHoverEnter);
        card.addEventListener('mouseleave', handleProjectHoverLeave);
    });
    
    // Fix music player functionality
    const musicToggle = document.getElementById('toggleMusic');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const statusText = document.querySelector('.status-text');
    
    // Initialize music state
    let musicPlaying = false;
    
    // Fix music toggle functionality
    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', function() {
            if (musicPlaying) {
                // Pause music
                backgroundMusic.pause();
                statusText.textContent = 'Music: Off';
                musicPlaying = false;
                
                // Update music button appearance
                musicToggle.classList.remove('playing');
            } else {
                // Try to play music
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // Playback started successfully
                        statusText.textContent = 'Music: On';
                        musicPlaying = true;
                        
                        // Update music button appearance
                        musicToggle.classList.add('playing');
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        console.error('Music playback was prevented:', error);
                        statusText.textContent = 'Music: Off (Click to enable)';
                        
                        // Show notification
                        showMusicNotification('Click again to enable music');
                    });
                }
            }
        });
    }
    
    // Function to show temporary music notification
    function showMusicNotification(message) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.music-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(-10px)';
        }, 10);
        
        // Hide and remove after a delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(10px)';
            
            // Remove from DOM after animation
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // Preload the audio
    if (backgroundMusic) {
        backgroundMusic.load();
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
});
