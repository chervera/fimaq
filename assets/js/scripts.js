(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

(function () {
    const CLASS_MENU_OPENED = 'menu--opened';
    const CLASS_MENU_VISIBLE = 'menu--visible';
    const ID_ASPIRADOR = 'aspirador';
    const ID_TERRA = 'terra';
    const menuButton = document.getElementById('menu-button');
    const homepageSection = document.getElementById('home');
    const serviceCleanerSection = document.getElementById('service-cleaner');
    const aspirador = document.getElementById(ID_ASPIRADOR);
    const terra = document.getElementById(ID_TERRA);

    const homepageSectionSize = homepageSection.clientHeight;
    const serviceCleanerSectionSize = serviceCleanerSection && serviceCleanerSection.clientHeight;
    const serviceCleanerSectionTop = serviceCleanerSection && serviceCleanerSection.offsetTop;
    const MARGIN_TO_START_MOVEMENT = window.innerHeight < window.innerWidth ? window.innerHeight : (window.innerWidth*0.5);

const init = () =>{
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
                checkSections(last_known_scroll_position, isMenuVisible);
                ticking = false;
            });
        }
        ticking = true;
    });

    checkSections(last_known_scroll_position, isMenuVisible);

};
    
    const checkSections = (last_known_scroll_position, isMenuVisible) => {
        checkMenu(last_known_scroll_position, isMenuVisible);
        serviceCleanerSection && checkServeis(last_known_scroll_position);
    };

    const checkMenu = (scrollPos, isMenuVisible) => {
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

    const checkServeis = (scrollPos) => {
        console.log('---');
        console.log(MARGIN_TO_START_MOVEMENT);
        console.log(scrollPos);
        console.log(`scrollPos[${scrollPos}] > [${serviceCleanerSectionTop-MARGIN_TO_START_MOVEMENT}](serviceCleanerSectionTop[${serviceCleanerSectionTop}] - MARGIN[${MARGIN_TO_START_MOVEMENT}])`);
        if(scrollPos > (serviceCleanerSectionTop - MARGIN_TO_START_MOVEMENT) && scrollPos < ((serviceCleanerSectionTop - MARGIN_TO_START_MOVEMENT) + serviceCleanerSectionSize)){
            let computedLeft = scrollPos - serviceCleanerSectionTop + MARGIN_TO_START_MOVEMENT;
            aspirador.style.left = computedLeft + 'px';
            terra.style.left = computedLeft + 'px';
            console.log('left:' + computedLeft );
        }
    }

    init();
})();