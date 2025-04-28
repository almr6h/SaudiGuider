// Authentication and shared utilities
const AuthUtils = {
  /**
   * Checks if user is authenticated
   * @returns {Object} {isAuthenticated: boolean, user: Object|null}
   */
  checkAuth: function() {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      return {
        isAuthenticated: !!token,
        user: user ? JSON.parse(user) : null
      };
    } catch (error) {
      console.error('Error checking auth:', error);
      return { isAuthenticated: false, user: null };
    }
  },

  /**
   * Updates the navigation bar based on authentication state
   */
  updateNavigation: function() {
    try {
      const { isAuthenticated, user } = this.checkAuth();
      const authButtons = document.getElementById('authButtons');
      const userDropdown = document.getElementById('userDropdown');
      const usernameDisplay = document.getElementById('usernameDisplay');
      
      if (authButtons) {
        authButtons.style.display = isAuthenticated ? 'none' : 'flex';
      }
      
      if (userDropdown) {
        userDropdown.style.display = isAuthenticated ? 'block' : 'none';
      }
      
      if (usernameDisplay && user) {
        usernameDisplay.textContent = user.username || 'My Account';
      }
    } catch (error) {
      console.error('Error updating navigation:', error);
    }
  },

  /**
   * Handles user logout
   */
  logout: function() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.updateNavigation();
      window.location.href = 'login.html';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

  /**
   * Initializes authentication functionality
   */
  initAuth: function() {
    try {
      this.updateNavigation();
      
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.logout();
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }
};

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
function loadCommonStyles() {
  try {
    if (!document.querySelector('link[href="css/common.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/common.css';
      document.head.appendChild(link);
    }
  } catch (error) {
    console.error('Error loading common styles:', error);
  }
}
