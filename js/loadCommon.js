/**
 * Initializes mobile navigation toggle
 */
function initMobileNavigation() {
  try {
    const mobileToggle = document.querySelector(".mobile-nav-toggle");
    const nav = document.getElementById("main-nav");
    
    if (mobileToggle && nav) {
      mobileToggle.addEventListener("click", function() {
        const isExpanded = nav.classList.toggle("active");
        mobileToggle.setAttribute("aria-expanded", isExpanded);
      });
    }
  } catch (error) {
    console.error('Error initializing mobile navigation:', error);
  }
}

/**
 * Updates copyright year in footer
 */
function updateCopyrightYear() {
  try {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  } catch (error) {
    console.error('Error updating copyright year:', error);
  }
}

/**
 * Loads common CSS stylesheet
 */


/**
 * Initializes all common functionality across pages
 */
function initCommon() {
  try {
    // Initialize authentication
    if (typeof AuthUtils !== 'undefined') {
      AuthUtils.initAuth();
    }

    // Set up mobile navigation
    initMobileNavigation();

    // Update copyright year
    updateCopyrightYear();

    // Load common styles

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        const nav = document.getElementById("main-nav");
        const mobileToggle = document.querySelector(".mobile-nav-toggle");
        if (nav && mobileToggle) {
          nav.classList.remove("active");
          mobileToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

  } catch (error) {
    console.error('Error in loadCommon initialization:', error);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCommon);

// Make functions available globally if needed
window.initMobileNavigation = initMobileNavigation;
window.updateCopyrightYear = updateCopyrightYear;
window.loadCommonStyles = loadCommonStyles;
window.initCommon = initCommon;
