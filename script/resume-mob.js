document.addEventListener('DOMContentLoaded', function() {
  console.log("Mobile resume script loaded");
  
  // Wait a bit to ensure all elements are fully loaded
  setTimeout(function() {
      const jobDescriptions = document.querySelectorAll('.job-description');
      console.log("Found job descriptions:", jobDescriptions.length);
      
      jobDescriptions.forEach(description => {
          // Add collapsed class to all descriptions initially
          description.classList.add('collapsed');
          
          // Create toggle button
          const toggleButton = document.createElement('span');
          toggleButton.classList.add('toggle-description');
          toggleButton.textContent = 'Read More';
          description.appendChild(toggleButton);
          
          // Add click event to toggle
          toggleButton.addEventListener('click', function(event) {
              event.preventDefault(); // Prevent any default behavior
              console.log("Toggle clicked");
              
              if (description.classList.contains('collapsed')) {
                  description.classList.remove('collapsed');
                  toggleButton.textContent = 'Read Less';
              } else {
                  description.classList.add('collapsed');
                  toggleButton.textContent = 'Read More';
              }
          });
      });
  }, 500); // Small delay to ensure DOM is fully processed
  // }
  
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