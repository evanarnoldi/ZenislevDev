document.addEventListener('DOMContentLoaded', function() {
    // Find all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to view details buttons
    document.querySelectorAll('.view-details-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            projectCards[index].classList.add('flipped');
        });
    });
    
    // Add click event listeners to close details buttons
    document.querySelectorAll('.close-details-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            projectCards[index].classList.remove('flipped');
        });
    });
});