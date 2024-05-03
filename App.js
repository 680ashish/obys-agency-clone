function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}



function loaderAnimation(){
    // gsap 
    const tl = gsap.timeline() // this is for loader  

    tl.from(".line h1",{
        y:250,
        stagger:0.25,
        duration:0.6,
        delay:0.2,
        opacity:1
    })
    tl.from('#line1-part1',{
        opacity:0,
        onStart:function(){
                // counter 
                var h5timer = document.querySelector('#line1-part1 h5');
                var grow=0;
                setInterval(() => {
                    if(grow<100){
                        grow++;
                        h5timer.innerHTML= grow;
                        // console.log(grow)
                    }
                    else{
                        grow=100;
                    }
                }, 18);
        }
    })
    tl.to(".line h2",{
        animationName:"anime",
        opacity:1,
        // duration:0.5,
    })
    tl.to('#loader',{
        opacity:0,
        duration:1,
        delay:2,// default = 3
        display:"none"
    });
    tl.from('#page1',{
        y:1600,
        opacity:0,
        duration:0.5,
        ease:Power4
    })
    tl.to('#loader',{
        display:"none"
        
    })
    tl.from('#nav',{
        opacity:0
    })
    tl.from('.hero h1',{
        y:500,
        stagger:0.4,
        opacity:0,
    })

}


// function cursorAnimation(){
// Shery.makeMagnet("#nav-part2 h4");
// }

function magnetAnimation(){
    Shery.makeMagnet("#nav-part2 h4");
    Shery.makeMagnet("#nav .brand__svg");
}


function cursorAnimation(){
    Shery.mouseFollower({
        skew:true,
        ease: "cubic-bezier(0.23,1,0.320,1)",
        duration:0.2,
    });


    const videoContainer = document.querySelector("#video-container");
    const videoCursor = document.querySelector("#video-cursor");
    
    videoContainer.addEventListener("mousemove", (event) => {
        const rect = videoContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left; // Adjust for container position
        const mouseY = event.clientY - rect.top;  // Adjust for container position
    
        gsap.to(".mouseFollower", {
            opacity: 1,
        });
        gsap.to(videoCursor, {
            x: mouseX - 800,
            y: mouseY - 100,
        });
    });
    
    videoContainer.addEventListener("mouseleave", () => {
        gsap.to(videoCursor, {
            x: 0, // Original X position
            y: 0, // Original Y position
        });
    });
}

//  page 5 animation or you can say slider animations
const scrollers = document.querySelectorAll(".scroller");
if(!window.matchMedia("(prefers-reduced-motion)").matches){
    addAnimation();
}
function addAnimation(){
    scrollers.forEach(scroller =>{
        scroller.setAttribute("data-animated",true);
    })
}

const imgDiv = document.querySelector(".img-div");
imgDiv.addEventListener("mouseenter",()=>{})

function sheryAnimation() {
    Shery.imageEffect(".img-div", {
        style: 5,
        gooey: true,
        config: {"a":{"value":0.46,"range":[0,30]},"b":{"value":-0.71,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":1.2000000476837158},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.4,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":1.37,"range":[0,10]},"metaball":{"value":0.41,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.37,"range":[0,2]},"noise_scale":{"value":15.27,"range":[0,100]}}
    });
}

sheryAnimation();

// calling loader 
loaderAnimation();
// calling cursor animation
cursorAnimation();
//calling locomotive fuction
locomotiveAnimation();
// magent animation
magnetAnimation();


document.addEventListener("mousemove",function(dets){
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y,
    });
;
})
document.querySelector("#hero3").addEventListener("mouseenter",function(){
    gsap.to("#flag",{
        opacity:1,
    })
})
document.querySelector("#hero3").addEventListener("mouseleave",function(){
    gsap.to("#flag",{
        opacity:0,
    })
})