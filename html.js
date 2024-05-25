document.addEventListener('DOMContentLoaded', () => {
    const closeOverlayButton = document.getElementById('closeOverlay');
    const controlsOverlay = document.getElementById('controlsOverlay');
    const showOverlayButton = document.getElementById('showOverlay');

    closeOverlayButton.addEventListener('click', () => {
        controlsOverlay.style.display = 'none';
        showOverlayButton.style.display = 'block';
    });

    showOverlayButton.addEventListener('click', () => {
        controlsOverlay.style.display = 'block';
        showOverlayButton.style.display = 'none';
    });
});
