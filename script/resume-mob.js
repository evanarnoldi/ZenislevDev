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