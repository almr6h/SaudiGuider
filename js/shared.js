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
      const authButtons = document.querySelector('.auth-buttons');
      const userDropdown = document.getElementById('userDropdown');
      const usernameDisplay = document.getElementById('usernameDisplay');
      
      if (authButtons) {
        authButtons.style.display = isAuthenticated ? 'none' : 'flex';
      }
      
      if (userDropdown) {
        userDropdown.style.display = isAuthenticated ? 'block' : 'none';
      }
      
      if (usernameDisplay && user) {
        // First try firstName + lastName
        if (user.firstName) {
          const lastNameInitial = user.lastName ? ` ${user.lastName.charAt(0)}.` : '';
          usernameDisplay.textContent = `${user.firstName}${lastNameInitial}`;
        } 
        // Fallback to username if no firstName
        else if (user.username) {
          usernameDisplay.textContent = user.username;
        }
        // Final fallback
        else {
          usernameDisplay.textContent = 'My Account';
        }
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

      // Add storage event listener to handle cross-tab updates
      window.addEventListener('storage', () => {
        this.updateNavigation();
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  AuthUtils.initAuth();
});
