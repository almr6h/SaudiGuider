// shared.js - Contains all shared functionality
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
  }
};

function initializeCommonElements() {
  // Initialize auth
  AuthUtils.updateNavigation();
  
  // Set up logout button
  document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    AuthUtils.logout();
  });

  // Mobile navigation toggle
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.getElementById("main-nav");
  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", function() {
      const isExpanded = nav.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", isExpanded);
    });
  }

  // Set current year in footer
  document.getElementById("current-year")?.textContent = new Date().getFullYear();
}
