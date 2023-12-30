console.log('[ DEBUG ] loaded script');

document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-mobile-modal').classList.toggle('expanded');
    document.querySelector('body').style.overflow = "hidden";
});

document.querySelector('.close-button').addEventListener('click', () => {
    document.querySelector('.nav-mobile-modal').classList.toggle('expanded');
    document.querySelector('body').style.overflow = "auto";
});