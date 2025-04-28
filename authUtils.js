// Frontend utility functions for authentication

// Check authentication state from localStorage
export function checkAuth() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  return {
    isAuthenticated: !!token,
    user
  };
}

// Update UI based on auth state
export function updateNavigation() {
  const { isAuthenticated, user } = checkAuth();
  const authButtons = document.getElementById('authButtons');
  const userDropdown = document.getElementById('userDropdown');
  const usernameDisplay = document.getElementById('usernameDisplay');
  
  if (isAuthenticated && user) {
    // User is logged in
    if (authButtons) authButtons.style.display = 'none';
    if (userDropdown) userDropdown.style.display = 'block';
    if (usernameDisplay) usernameDisplay.textContent = user.username;
  } else {
    // User is not logged in
    if (authButtons) authButtons.style.display = 'flex';
    if (userDropdown) userDropdown.style.display = 'none';
  }
}

// Logout function
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  updateNavigation();
  window.location.href = 'login.html';
}

// Check if current page requires authentication
export function isProtectedPage() {
  const protectedPaths = ['profile.html', 'reservations.html', 'dashboard.html'];
  return protectedPaths.some(path => window.location.pathname.includes(path));
}

// Initialize auth state on page load
export function initAuth() {
  updateNavigation();
  
  // Add logout event listener
  document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    logout();
  });
  
  // Redirect if trying to access protected page while unauthenticated
  const { isAuthenticated } = checkAuth();
  if (!isAuthenticated && isProtectedPage()) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
  }
}

// Add auth header to fetch requests
export function authFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(url, {
    ...options,
    headers
  });
}
