document.addEventListener('DOMContentLoaded', function () {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        // Optionally, save preference
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    // Restore dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Track Order button
    const trackOrderBtn = document.getElementById('trackOrderBtn');
    const trackingModal = document.getElementById('trackingModal');
    const overlay = document.getElementById('overlay');
    trackOrderBtn.addEventListener('click', function () {
        trackingModal.classList.add('active');
        overlay.classList.add('active');
    });
    // Close tracking modal
    document.getElementById('closeTrackingModal').addEventListener('click', function () {
        trackingModal.classList.remove('active');
        overlay.classList.remove('active');
    });
    // Close modal when clicking overlay
    overlay.addEventListener('click', function () {
        trackingModal.classList.remove('active');
        overlay.classList.remove('active');
    });
});