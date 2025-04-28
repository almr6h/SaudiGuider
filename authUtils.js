// AuthUtils.js
const AuthUtils = {
  checkAuth: function() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      isAuthenticated: !!token,
      user: user ? JSON.parse(user) : null
    };
  },

  updateNavigation: function() {
    const { isAuthenticated, user } = this.checkAuth();
    const authButtons = document.getElementById('authButtons');
    const userDropdown = document.getElementById('userDropdown');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    if (isAuthenticated) {
      if (authButtons) authButtons.style.display = 'none';
      if (userDropdown) userDropdown.style.display = 'block';
      if (usernameDisplay) usernameDisplay.textContent = user?.username || 'My Account';
    } else {
      if (authButtons) authButtons.style.display = 'flex';
      if (userDropdown) userDropdown.style.display = 'none';
    }
  },

  logout: function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.updateNavigation();
    window.location.href = 'login.html';
  },

  initAuth: function() {
    this.updateNavigation();
    
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.logout();
    });
  }
};

// Make available globally
window.AuthUtils = AuthUtils;
