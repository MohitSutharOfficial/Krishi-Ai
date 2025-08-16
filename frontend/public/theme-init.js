// KrishiAi — prevent flash of wrong theme, default to light
(function () {
  const savedTheme = localStorage.getItem('color-theme');

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
