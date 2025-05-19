// Comprehensive fixed script.js - Preserving ALL cursor effects and animations

document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor functionality with all original effects preserved
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');
    
    // Track cursor state
    let cursorVisible = false;
    let cursorScale = false;
    let cursorHidden = false;
    let lastX = 0;
    let lastY = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    // Show the custom cursor
    const showCursor = function() {
        if (!cursorVisible) {
            gsap.to(cursorInner, {
                duration: 0.35,
                opacity: 1,
                ease: "power3.out"
            });
            gsap.to(cursorOuter, {
                duration: 0.35,
                opacity: 1,
                ease: "power3.out"
            });
            cursorVisible = true;
        }
    };
    
    // Hide the custom cursor
    const hideCursor = function() {
        if (cursorVisible && !cursorHidden) {
            gsap.to(cursorInner, {
                duration: 0.35,
                opacity: 0,
                ease: "power3.out"
            });
            gsap.to(cursorOuter, {
                duration: 0.35,
                opacity: 0,
                ease: "power3.out"
            });
            cursorVisible = false;
        }
    };
    
    // Mouse movement tracking with the original smooth animation
    const mousemoveHandler = function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor
        showCursor();
        
        // Position inner cursor instantly at mouse position
        gsap.to(cursorInner, {
            duration: 0.1,
            x: mouseX,
            y: mouseY,
            ease: "power3.out"
        });
        
        // Position outer cursor with slight delay for the trailing effect
        if (!cursorHidden) {
            gsap.to(cursorOuter, {
                duration: cursorScale ? 0.6 : 0.3,
                x: mouseX,
                y: mouseY,
                ease: "power3.out"
            });
        }
        
        // Store last position
        lastX = mouseX;
        lastY = mouseY;
    };
    
    // Hide cursor when mouse leaves window
    const mouseleaveHandler = function() {
        hideCursor();
    };
    
    // Track when mouse enters window
    const mouseenterHandler = function() {
        showCursor();
        cursorHidden = false;
    };
    
    // Enhanced cursor scaling effect for hovering over links/buttons
    const handleLinkHoverEnter = function(e) {
        cursorScale = true;
        // Preserve the original scaling animation
        gsap.to(cursorInner, {
            duration: 0.4,
            scale: 1.5,
            ease: "power3.out"
        });
        gsap.to(cursorOuter, {
            duration: 0.4,
            scale: 1.5,
            ease: "power3.out",
            borderWidth: '1px',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        });
    };
    
    // Reset cursor when not hovering over links/buttons
    const handleLinkHoverLeave = function() {
        cursorScale = false;
        gsap.to(cursorInner, {
            duration: 0.4,
            scale: 1,
            ease: "power3.out"
        });
        gsap.to(cursorOuter, {
            duration: 0.4,
            scale: 1,
            ease: "power3.out",
            borderWidth: '1px',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: 'transparent'
        });
    };
    
    // Add click effect animation
    const handleMouseDown = function() {
        gsap.to(cursorInner, {
            duration: 0.2,
            scale: 0.7,
            ease: "power3.out"
        });
        gsap.to(cursorOuter, {
            duration: 0.2,
            scale: 0.7,
            ease: "power3.out"
        });
    };
    
    // Reset after click
    const handleMouseUp = function() {
        gsap.to(cursorInner, {
            duration: 0.2,
            scale: cursorScale ? 1.5 : 1,
            ease: "power3.out"
        });
        gsap.to(cursorOuter, {
            duration: 0.2,
            scale: cursorScale ? 1.5 : 1,
            ease: "power3.out"
        });
    };
    
    // Handle cursor behavior when text is being selected
    const handleMouseDragStart = function() {
        cursorHidden = true;
        gsap.to(cursorInner, {
            duration: 0.2,
            opacity: 0,
            ease: "power3.out"
        });
        gsap.to(cursorOuter, {
            duration: 0.2,
            opacity: 0,
            ease: "power3.out"
        });
    };
    
    // Reset after text selection
    const handleMouseDragEnd = function() {
        cursorHidden = false;
        gsap.to(cursorInner, {
            duration: 0.2,
            opacity: 1,
            x: mouseX,
            y: mouseY,
            ease: "power3.out"
        });
        gsap.to(cursorOuter, {
            duration: 0.2,
            opacity: 1,
            x: mouseX,
            y: mouseY,
            ease: "power3.out"
        });
    };
    
    // Cursor moving animation - to ensure smooth animation when cursor is still
    const renderCursor = function() {
        // Only run if we have cursor coordinates
        if (mouseX && mouseY) {
            // Make sure inner cursor is properly positioned
            gsap.set(cursorInner, {
                x: mouseX,
                y: mouseY
            });
            
            // Add slight smoothing for outer cursor when not scaling
            if (!cursorScale) {
                gsap.set(cursorOuter, {
                    x: gsap.utils.interpolate(gsap.getProperty(cursorOuter, "x"), mouseX, 0.15),
                    y: gsap.utils.interpolate(gsap.getProperty(cursorOuter, "y"), mouseY, 0.15)
                });
            }
        }
        requestAnimationFrame(renderCursor);
    };
    
    // Start the animation loop
    renderCursor();
    
    // Add all event listeners
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseleave', mouseleaveHandler);
    document.addEventListener('mouseenter', mouseenterHandler);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectstart', handleMouseDragStart);
    document.addEventListener('selectend', handleMouseDragEnd);
    
    // Handle text selection end event (selectend isn't standard)
    document.addEventListener('mouseup', function() {
        if (window.getSelection().toString().length === 0 && cursorHidden) {
            handleMouseDragEnd();
        }
    });
    
    // Add hover effect to all clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, input[type="submit"], .project-card, .nav-link');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', handleLinkHoverEnter);
        element.addEventListener('mouseleave', handleLinkHoverLeave);
    });
    
    // Special effects for different element types
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(cursorOuter, {
                duration: 0.4,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                scale: 1.7,
                mixBlendMode: 'difference'
            });
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(cursorOuter, {
                duration: 0.4,
                backgroundColor: 'transparent',
                scale: 1,
                mixBlendMode: 'normal'
            });
        });
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
                backgroundMusic.pause();
                statusText.textContent = 'Music: Off';
                musicPlaying = false;
                
                // Update music button appearance
                gsap.to(musicToggle, {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    duration: 0.3
                });
            } else {
                // This promise handling is important for browsers that block autoplay
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // Playback started successfully
                        statusText.textContent = 'Music: On';
                        musicPlaying = true;
                        
                        // Update music button appearance
                        gsap.to(musicToggle, {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            duration: 0.3
                        });
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        console.error('Music playback was prevented:', error);
                        statusText.textContent = 'Music: Off (Click to enable)';
                        
                        // Show user-friendly notification
                        const notification = document.createElement('div');
                        notification.className = 'music-notification';
                        notification.innerHTML = 'Click again to enable music';
                        document.body.appendChild(notification);
                        
                        gsap.to(notification, {
                            opacity: 1,
                            y: -20,
                            duration: 0.5,
                            onComplete: function() {
                                setTimeout(function() {
                                    gsap.to(notification, {
                                        opacity: 0,
                                        y: 0,
                                        duration: 0.5,
                                        onComplete: function() {
                                            notification.remove();
                                        }
                                    });
                                }, 3000);
                            }
                        });
                    });
                }
            }
        });
    }
    
    // Preload the audio to make it more likely to play on first click
    if (backgroundMusic) {
        backgroundMusic.load();
        
        // Add a listener for when music ends (if not on loop)
        backgroundMusic.addEventListener('ended', function() {
            if (!backgroundMusic.loop) {
                statusText.textContent = 'Music: Off';
                musicPlaying = false;
                gsap.to(musicToggle, {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    duration: 0.3
                });
            }
        });
    }
});
