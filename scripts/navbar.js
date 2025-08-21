// Navbar Toggle Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Check if elements exist (good practice for error prevention)
    if (navToggle && navLinks) {
        // Add click event listener to toggle button
        navToggle.addEventListener('click', function() {
            // Toggle the 'active' class on nav-links
            navLinks.classList.toggle('active');
            
            // Optional: Change toggle button text/icon
            const isActive = navLinks.classList.contains('active');
            navToggle.textContent = isActive ? '✕' : '☰';
            
            // Optional: Add ARIA attribute for accessibility
            navToggle.setAttribute('aria-expanded', isActive);
        });
        
        // Close navigation when clicking on a link (better UX)
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.textContent = '☰';
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close navigation when clicking outside (advanced UX)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navLinks.contains(event.target);
            
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.textContent = '☰';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});