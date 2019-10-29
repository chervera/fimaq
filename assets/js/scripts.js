(function () {
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
    const MARGIN_TO_START_MOVEMENT = window.innerHeight < window.innerWidth ? window.innerHeight : (window.innerWidth * 0.5);

    const init = () => {
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
        if (document.getElementById('map')) {
            initMap();
        }
    };

    const checkSections = (last_known_scroll_position, isMenuVisible) => {
        checkMenu(last_known_scroll_position, isMenuVisible);
        serviceCleanerSection && checkServeis(last_known_scroll_position);
    };

    const checkMenu = (scrollPos, isMenuVisible) => {
        if (homepageSectionSize < scrollPos && !isMenuVisible) {
            const menu = document.getElementById('menu');
            menu.classList.add(CLASS_MENU_VISIBLE);
            menu.classList.remove(CLASS_MENU_OPENED);
            isMenuVisible = true;
        } else if (homepageSectionSize > scrollPos && isMenuVisible) {
            const menu = document.getElementById('menu');
            menu.classList.remove(CLASS_MENU_VISIBLE);
            menu.classList.remove(CLASS_MENU_OPENED);
            isMenuVisible = false;
        }
    }

    const checkServeis = (scrollPos) => {
        /*console.log('---');
        console.log(MARGIN_TO_START_MOVEMENT);
        console.log(scrollPos);
        console.log(`scrollPos[${scrollPos}] > [${serviceCleanerSectionTop-MARGIN_TO_START_MOVEMENT}](serviceCleanerSectionTop[${serviceCleanerSectionTop}] - MARGIN[${MARGIN_TO_START_MOVEMENT}])`);*/
        if (scrollPos > (serviceCleanerSectionTop - MARGIN_TO_START_MOVEMENT) && scrollPos < ((serviceCleanerSectionTop - MARGIN_TO_START_MOVEMENT) + serviceCleanerSectionSize)) {
            let computedLeft = scrollPos - serviceCleanerSectionTop + MARGIN_TO_START_MOVEMENT;
            aspirador.style.left = computedLeft + 'px';
            terra.style.left = computedLeft + 'px';
            console.log('left:' + computedLeft);
        }
    }

    const initMap = () => {
        google.maps.event.addDomListener(window, 'load', function () {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 12,
                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng({ lat: 41.6738998, lng: 0.603995 }),
                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 65
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": "50"
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [
                            {
                                "lightness": "30"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [
                            {
                                "lightness": "40"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#ffff00"
                            },
                            {
                                "lightness": -25
                            },
                            {
                                "saturation": -97
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "lightness": -25
                            },
                            {
                                "saturation": -100
                            }
                        ]
                    }
                ]
            };
            // Get the HTML DOM element that will contain your map
            // We are using a div with id=”map” seen below in the <body>
            var mapElement = document.getElementById('map');
            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);
            // Let’s also add a marker while we’re at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng({ lat: 41.6738998, lng: 0.603995 }),
                map: map,
                title: 'Fimaq'
            });
        });
    };

    init();

})();