
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function updateIcon() {
    if (root.getAttribute('data-theme') === 'dark') {
    themeToggle.textContent = '🌙';
    } else {
    themeToggle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    root.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
    updateIcon();
});

document.getElementById('year').textContent = new Date().getFullYear();
updateIcon();