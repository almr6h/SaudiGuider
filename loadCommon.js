// loadCommon.js
document.addEventListener('DOMContentLoaded', function() {
  // Inject common CSS (if needed)
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'common.css';
  document.head.appendChild(link);
  
  initializeCommonElements();
});
