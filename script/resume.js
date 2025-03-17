//Resume scripts

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.company-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get current active content before changing
            const currentContent = document.querySelector('.job-details.active');
            
            // Remove active class from all tabs
            document.querySelectorAll('.company-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the company name from data attribute
            const company = this.getAttribute('data-company');
            const nextContent = document.getElementById(company);
            
            if (currentContent && currentContent.id !== company) {
                // Set fixed height before animation to prevent layout shifts
                const contentContainer = document.querySelector('.job-content');
                contentContainer.style.height = currentContent.offsetHeight + 'px';
                
                // Fade out current content
                currentContent.classList.add('fade-out');
                
                // Wait for fade out to complete before showing new content
                setTimeout(() => {
                    // Remove active and fade-out classes from all content sections
                    document.querySelectorAll('.job-details').forEach(content => {
                        content.classList.remove('active', 'fade-out', 'fade-in');
                    });
                    
                    // Add active and fade-in classes to the new content
                    nextContent.classList.add('active', 'fade-in');
                    
                    // Reset height after animation completes
                    setTimeout(() => {
                        contentContainer.style.height = nextContent.offsetHeight + 'px';
                        
                        // After transition, set height back to auto
                        setTimeout(() => {
                            contentContainer.style.height = 'auto';
                        }, 300);
                    }, 100);
                }, 300);
            } else if (nextContent !== currentContent) {
                // No current content or same content, just show the new one
                document.querySelectorAll('.job-details').forEach(content => {
                    content.classList.remove('active', 'fade-out', 'fade-in');
                });
                nextContent.classList.add('active', 'fade-in');
            }
        });
    });
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Only apply on mobile devices
    if (window.innerWidth <= 768) {
      const jobDescriptions = document.querySelectorAll('.job-description');
      
      jobDescriptions.forEach(description => {
        // Add collapsed class to all descriptions initially
        description.classList.add('collapsed');
        
        // Create toggle button
        const toggleButton = document.createElement('span');
        toggleButton.classList.add('toggle-description');
        toggleButton.textContent = 'Read More';
        description.appendChild(toggleButton);
        
        // Add click event to toggle
        toggleButton.addEventListener('click', function() {
          if (description.classList.contains('collapsed')) {
            description.classList.remove('collapsed');
            toggleButton.textContent = 'Read Less';
          } else {
            description.classList.add('collapsed');
            toggleButton.textContent = 'Read More';
          }
        });
      });
    }
    
    // Add better behavior for tab switching on mobile
    const companyTabs = document.querySelectorAll('.company-tab');
    companyTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // If we're on mobile, scroll to the content
        if (window.innerWidth <= 768) {
          const jobContent = document.querySelector('.job-content');
          setTimeout(() => {
            jobContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300); // Short delay to allow content to change
        }
      });
    });
  });