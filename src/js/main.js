import $ from '../local_modules/jquery/dist/jquery.min'
import { gsap, TimelineMax, Back, Power1 } from 'gsap';

$.fn.exists = function () {
    return $(this).length;
};

// const canvasBg = () => {
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let particlesArray;

//     let mouse = {
//         x: null,
//         y: null,
//         radius: (canvas.height/80) * (canvas.width/80)
//     }

//     window.addEventListener('mousemove', function(event){
//             mouse.x = event.x;
//             mouse.y = event.y;
//         }
//     );

//     // create particle

//     class Particle {
//         constructor(x, y, directionX, directionY, size, color){
//             this.x = x;
//             this.y = y;
//             this.directionX = directionX;
//             this.directionY = directionY;
//             this.size = size;
//             this.color = color;
//         }
//         //method to draw individual particle
//         draw() {
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
//             ctx.fillStyle = ' #BC5523';
//             ctx.fill();
//         }

//         //check particle position

//         update() {
//             if(this.x > canvas.width || this.x < 0) {
//                 this.directionX = -this.directionX;
//             }

//             if(this.y > canvas.height || this.y < 0) {
//                 this.directionY = -this.directionY;
//             }

//             let dx = mouse.x - this.x;
//             let dy = mouse.y - this.y;
//             let distance = Math.sqrt(dx*dx + dy*dy);

//             if(distance < mouse.radius + this.size){
//                 if(mouse.x < this.x && this.x < canvas.width - this.size*10){
//                     this.x += 10;
//                 }
//                 if(mouse.x > this.x && this.x >this.size*10){
//                     this.x -= 10;
//                 }
//                 // if()
//             }
//         }
//     }
// }

const projectFunc = {
    showOverlay: function (form, status) {
        if ($('.js-overlay').exists()) {

            const overlayEl = document.querySelector('.js-overlay');

            const showOvTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.3 },
                onStart: projectFunc.lockedDOM,
                onStartParams: [true],
                onComplete: projectFunc.stateObject,
                onCompleteParams: [form, 'start'],
            });

            const hideOvTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.3 },
                onStart: projectFunc.stateObject,
                onStartParams: [form, 'end'],
                onComplete: projectFunc.lockedDOM,
                onCompleteParams: [false]
            });

            showOvTl
                .to(
                    overlayEl,
                    {
                        autoAlpha: 0.5,
                        ease: 'power2.out'
                    }
                );

            hideOvTl
                .to(
                    overlayEl,
                    {
                        autoAlpha: 0,
                        ease: 'power2.out'
                    },
                    '+=0.6'
                );

            if (status) {
                showOvTl.reverse();
                showOvTl.play();
            } else {
                hideOvTl.reverse();
                hideOvTl.play();
            }
        }
    },
    stateObject: function (form, status) {
        if (status == 'start') {
            projectFunc.popupShow(form, true);
        }
        else {
            projectFunc.popupShow(form, false);
        }
    },
    popupShow: function (form, status) {
        if ($(form).exists()) {
            const element = form;

            const formShowTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.5 }
            });

            const formHideTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.5 }
            });

            const menuShowTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.5 }
            });

            const menuHideTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 1 }
            });

            menuShowTl
                .to(
                    element,
                    {
                        autoAlpha: 1,
                        ease: 'power2.out'
                    }
                )

            menuHideTl
                .to(
                    element,
                    {
                        autoAlpha: 0,
                        ease: 'power2.out'
                    }
                )

            formHideTl
                .to(
                    element,
                    {
                        autoAlpha: 0,
                        ease: 'power2.out'
                    }
                )

            formShowTl
                .set(
                    element, {
                    // yPercent: -100,
                    // xPercent: -50,
                    autoAlpha: 0
                }
                )
                .to(
                    element,
                    {
                        autoAlpha: 1,
                        // yPercent: -50,
                        //xPercent: -50,
                        ease: 'power2.out'
                    }
                )

            if (status) {
                formHideTl.reverse();
                formShowTl.play();
            }
            else {
                formShowTl.reverse();
                formHideTl.play();
            }
        }
    },
    lockedDOM(status) {
        if (status) {
            $('html').css('overflow', 'hidden');
        } else {
            $('html').css('overflow', 'auto');
        }
    },
    getScrollbarWidth() {
        let div, width = projectFunc.getScrollbarWidth.width;
        if (width === undefined) {
            div = document.createElement('div');
            div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
            div = div.firstChild;
            document.body.appendChild(div);
            width = projectFunc.getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
        }
        return width;
    },
    scrollbarPage() {
        let locked = document.querySelector('html');
        locked.style.setProperty('--wScroll', projectFunc.getScrollbarWidth() + 'px');
    }
}


$(document).ready(() => {
    projectFunc.scrollbarPage();
    // Init ScrollMagic
    var controller = new ScrollMagic.Controller();
    
    const headers = ["#slide01 header", "#slide02 header", "#slide03 header", "#slide04 header", "#slide05 header"];
    const dots = document.querySelectorAll('.nav-dot');
    
    headers.forEach(function (header, index) {
            
        // number for highlighting scenes
        var num = index+1;
    
        // make scene
        var headerScene = new ScrollMagic.Scene({
            triggerElement: header,
            offset: -95
        })

        .setClassToggle('#slide0'+num, 'is-active')
        .addTo(controller)

        headerScene.on("leave", function (event) {
            dots[index].classList.add('active');
            dots[index+1].classList.remove('active');
        });

        headerScene.on("enter", function (event) {
            dots[index].classList.remove('active');
            dots[index+1].classList.add('active');
        });
    });


    // canvasBg();

    if($('.js-btn-call').exists()){
        let btnCall = document.querySelectorAll('.js-btn-call');

        btnCall.forEach((item, _) => {
            item.addEventListener('click', function(){
                projectFunc.showOverlay('.js-modal-call', true);
            });
        });
    }

    if($('.js-overlay').exists()){
        $('.js-overlay').on('click', function(){
            projectFunc.showOverlay('.js-modal-call', false);
        });
    }

    if($('.js-modal-close').exists()){
        $('.js-modal-close').on('click', function(){
            projectFunc.showOverlay('.js-modal-call', false);
        });
    }
})
