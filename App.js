function loaderAnimation(){
    // gsap 
    const tl = gsap.timeline() // this is for loader  

    tl.from(".line h1",{
        y:150,
        stagger:0.25,
        duration:0.6,
        delay:0.5
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
                }, 30);
        }
    })
    tl.to(".line h2",{
        animationName:"anime",
        opacity:1
    })
    tl.to('#loader',{
        opacity:0,
        duration:0.3,
        delay:1,// default = 3
    });
    tl.from('#page1',{
        delay:0.2,
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
        y:130,
        stagger:0.2
    })

}
loaderAnimation();


// curstom cursor
document.addEventListener("mousemove",(dets)=>{
    // console.log("hello");
    gsap.to("#crsr",{
        left:dets.x,
        top:dets.y,

    })
})

function cursorAnimation(){
Shery.makeMagnet("#nav-part2 h4");
}
cursorAnimation();