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
                t.setAttribute('aria-selected', 'false');
                t.tabIndex = -1;
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            this.tabIndex = 0;
            
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
    
    // Keyboard: arrow keys move between tabs (standard tabs behaviour), Home/End jump to first/last
    const tabList = document.querySelector('.company-list');
    if (tabList) {
        tabList.addEventListener('keydown', function (e) {
            const tabs = [...document.querySelectorAll('.company-tab')];
            const current = tabs.indexOf(document.activeElement);
            if (current === -1) return;

            const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
            let next;
            if (step) next = (current + step + tabs.length) % tabs.length;
            else if (e.key === 'Home') next = 0;
            else if (e.key === 'End') next = tabs.length - 1;
            else return;

            e.preventDefault();
            tabs[next].focus();
            tabs[next].click();
        });
    }
});