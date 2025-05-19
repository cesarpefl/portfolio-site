// Fixed script.js - Focus on cursor and music functionality only

document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor functionality
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');
    
    // Track if the cursor is visible
    let cursorVisible = false;
    
    // Show the cursor when mouse moves
    const showCursor = function() {
        if (!cursorVisible) {
            cursorInner.style.opacity = 1;
            cursorOuter.style.opacity = 1;
            cursorVisible = true;
        }
    };
    
    // Hide the cursor when inactive
    const hideCursor = function() {
        if (cursorVisible) {
            cursorInner.style.opacity = 0;
            cursorOuter.style.opacity = 0;
            cursorVisible = false;
        }
    };
    
    // Update cursor position
    const mousemove = function(e) {
        showCursor();
        
        // Position both cursors at the mouse position with a slight delay for the outer cursor
        cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Add a small delay to outer cursor for the trailing effect
        setTimeout(() => {
            cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 80);
    };
    
    // Hide cursor when mouse leaves window
    const mouseleave = function() {
        hideCursor();
    };
    
    // Handle link hover effect
    const handleLinkHover = function() {
        // Expand cursor when hovering over links
        cursorInner.classList.add('cursor-hover');
        cursorOuter.classList.add('cursor-hover');
    };
    
    const handleLinkUnhover = function() {
        // Return cursor to normal state
        cursorInner.classList.remove('cursor-hover');
        cursorOuter.classList.remove('cursor-hover');
    };
    
    // Add event listeners
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseleave', mouseleave);
    
    // Add hover effect to all clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, input[type="submit"]');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', handleLinkHover);
        element.addEventListener('mouseleave', handleLinkUnhover);
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
            } else {
                // This promise handling is important for browsers that block autoplay
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // Playback started successfully
                        statusText.textContent = 'Music: On';
                        musicPlaying = true;
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        console.error('Music playback was prevented:', error);
                        statusText.textContent = 'Music: Off (Blocked by browser)';
                        // Display a user-friendly message
                        alert('Music playback was blocked by your browser. Please click the play button again to enable music.');
                    });
                }
            }
        });
    }
    
    // Preload the audio to make it more likely to play on first click
    if (backgroundMusic) {
        backgroundMusic.load();
    }
});
