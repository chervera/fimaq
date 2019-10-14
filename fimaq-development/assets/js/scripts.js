(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

(function () {
    const CLASS_MENU_OPENED = 'menu--opened';
    const CLASS_MENU_VISIBLE = 'menu--visible';
    const menuButton = document.getElementById('menu-button');
    const homepageSection = document.getElementById('home');

    let homepageSectionSize = homepageSection.clientHeight;

    menuButton.addEventListener('click', function (event) {
        event.preventDefault();
        this.closest('.menu').classList.toggle(CLASS_MENU_OPENED);
    })

    let last_known_scroll_position = 0;
    let ticking = false;
    let isMenuVisible = false;

    window.addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                checkMenu(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;
    });

    const checkMenu = (scrollPos) => {
        if(homepageSectionSize < scrollPos && !isMenuVisible){
            const menu = document.getElementById('menu');
            menu.classList.add(CLASS_MENU_VISIBLE);
            menu.classList.remove(CLASS_MENU_OPENED);
            isMenuVisible = true;
        }else if(homepageSectionSize > scrollPos && isMenuVisible){
            const menu = document.getElementById('menu');
            menu.classList.remove(CLASS_MENU_VISIBLE);
            menu.classList.remove(CLASS_MENU_OPENED);
            isMenuVisible = false;
        }
    }
})();