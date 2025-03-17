document.addEventListener('DOMContentLoaded', function() {
  console.log("Mobile resume script loaded");
  
  // Wait elements load
  setTimeout(function() {
      const jobDescriptions = document.querySelectorAll('.job-description');
      console.log("Found job descriptions:", jobDescriptions.length);
      
      jobDescriptions.forEach(description => {
          // Add collapsed class to all descriptions
          description.classList.add('collapsed');
          
          // Toggle button
          const toggleButton = document.createElement('span');
          toggleButton.classList.add('toggle-description');
          toggleButton.textContent = 'Read More';
          description.appendChild(toggleButton);
          
          // Click to toggle
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
  }, 500); // Delay to ensure DOM is fully processed
  // }
  
  // Better behavior for tab switching on mobile
  const companyTabs = document.querySelectorAll('.company-tab');
  companyTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Scroll to the content on mobile
          if (window.innerWidth <= 768) {
              const jobContent = document.querySelector('.job-content');
              setTimeout(() => {
                  jobContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 300); // Short delay
          }
      });
  });
});