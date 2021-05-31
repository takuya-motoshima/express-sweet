(() => {
  // Highlight the code block.
  document.querySelectorAll('pre code').forEach((block) => 
    hljs.highlightBlock(block));

  // Overlay when the sidebar opens.
  const sidebar = document.querySelector('#sidebar');
  const body = document.body;
  const sidebarCollapse = new bootstrap.Collapse(sidebar, {toggle: false});

  // Show overlay when opening sidebar.
  sidebar.addEventListener('shown.bs.collapse', () => 
    body.setAttribute('data-offcanvas-sidebar', 'on'));

  // Hide the overlay when you close the sidebar.
  sidebar.addEventListener('hidden.bs.collapse', () => 
    body.removeAttribute('data-offcanvas-sidebar'));

  // Close the sidebar when the overlay is clicked.
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  sidebarOverlay.addEventListener('click', () => 
    sidebarCollapse.hide());
})();