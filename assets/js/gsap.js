(function () {
    //Init ScrollMagic
    var controller = new ScrollMagic.Controller(),
        shape = $(".shape"),
        shape1 = $(".shape1"),
        shape2 = $(".shape2"),
        shape3 = $(".shape3"),
        shape4 = $(".shape4"),
        shape5 = $(".shape5"),
        shape6 = $(".shape6"),
        shape7 = $(".shape7"),
        shape8 = $(".shape8"),
        shape9 = $(".shape9"),
        shape10 = $(".shape10"),
        shape11 = $(".shape11"),
        shape12 = $(".shape12"),
        shape13 = $(".shape13"),
        shape14 = $(".shape14"),
        shape15 = $(".shape15"),
        shape16 = $(".shape16"),
        shape_button = $(".shape_button");

    // Define gotes
    var tmgotes = new TimelineMax()

    // Animation gotes
    tmgotes.to(shape1, .03, {
            autoAlpha: 1
        })
        .to(shape2, .03, {
            autoAlpha: 1
        }, .1)
        .to(shape1, .03, {
            autoAlpha: 0,
        })
        .to(shape3, .03, {
            autoAlpha: 1
        })
        .to(shape2, .03, {
            autoAlpha: 0,
        })
        .to(shape4, .03, {
            autoAlpha: 1
        })
        .to(shape3, .03, {
            autoAlpha: 0,
        })
        .to(shape5, .03, {
            autoAlpha: 1
        })
        .to(shape4, .03, {
            autoAlpha: 0,
        })
        .to(shape6, .03, {
            autoAlpha: 1
        })
        .to(shape5, .03, {
            autoAlpha: 0,
        })
        .to(shape7, .03, {
            autoAlpha: 1
        })
        .to(shape6, .03, {
            autoAlpha: 0
        })
        .to(shape8, .03, {
            autoAlpha: 1
        })
        .to(shape7, .03, {
            autoAlpha: 0
        })
        .to(shape9, .03, {
            autoAlpha: 1
        })
        .to(shape8, .03, {
            autoAlpha: 0
        })
        .to(shape10, .03, {
            autoAlpha: 1
        })
        .to(shape9, .03, {
            autoAlpha: 0
        })
        .to(shape11, .03, {
            autoAlpha: 1
        })
        .to(shape10, .03, {
            autoAlpha: 0
        })
        .to(shape12, .03, {
            autoAlpha: 1
        })
        .to(shape11, .03, {
            autoAlpha: 0
        })
        .to(shape13, .03, {
            autoAlpha: 1
        })
        .to(shape12, .03, {
            autoAlpha: 0
        })
        .to(shape14, .03, {
            autoAlpha: 1
        })
        .to(shape13, .03, {
            autoAlpha: 0
        })
        .to(shape15, .03, {
            autoAlpha: 1
        })
        .to(shape14, .03, {
            autoAlpha: 0
        })
        .to(shape16, .03, {
            autoAlpha: 1
        })
        .to(shape15, .03, {
            autoAlpha: 0
        })
        .to(shape16, .03, {
            autoAlpha: 0
        })
        .to(shape_button, .1, {
            autoAlpha: 1
        })

    //    .staggerFrom(shape, .1, {
    //    autoAlpha: 1,
    //}, .1);
    //.to('.item__image--postvenda', 1, {
    //   autoAlpha: 1
    //}, .1);

    //--------- trigger gotes
    var scgotes = new ScrollMagic.Scene({
            triggerElement: '#idcat',
            triggerHook: 0.3,
            reverse: false
        })
        .setTween(tmgotes)
        .addTo(controller)
        .addIndicators({
            name: 'fade scene',
            colorTrigger: '#000',
            colorStart: '#f0f',
        })
    
    
    

})();
