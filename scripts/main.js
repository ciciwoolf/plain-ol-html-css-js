
// Navbar Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Get DOM elements
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Check if elements exist
    if (navToggle && navLinks) {
        console.log('Navbar elements found - setting up toggle functionality');
        
        // Add click event listener to toggle button
        navToggle.addEventListener('click', function() {
            console.log('Hamburger menu clicked!');
            
            // Toggle the 'active' class on nav-links
            navLinks.classList.toggle('active');
            
            // Change toggle button text/icon
            const isActive = navLinks.classList.contains('active');
            navToggle.textContent = isActive ? '✕' : '☰';
            
            // Add ARIA attribute for accessibility
            navToggle.setAttribute('aria-expanded', isActive);
            
            console.log('Menu is now:', isActive ? 'OPEN' : 'CLOSED');
        });
        
        // Close navigation when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.textContent = '☰';
                navToggle.setAttribute('aria-expanded', 'false');
                console.log('Navigation closed due to link click');
            });
        });
        
        // Close navigation when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navLinks.contains(event.target);
            
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.textContent = '☰';
                navToggle.setAttribute('aria-expanded', 'false');
                console.log('Navigation closed due to outside click');
            }
        });
        
    } else {
        if (!navToggle) console.log('Missing: nav-toggle button');
        if (!navLinks) console.log('Missing: nav-links element');
    }
    
    // CTA Button functionality
    const ctaButton = document.getElementById('start-exploring');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to form section
            const formSection = document.getElementById('form-section');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});