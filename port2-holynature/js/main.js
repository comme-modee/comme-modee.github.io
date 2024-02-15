// 로고(a태그) 클릭시 스크롤 탑으로 올려주는 애니
// $('a').click(function(){
// $('html, body').animate({
// scrollTop: $( $.attr(this, 'href') ).offset().top
// }, 600);
// return false;
// });


// let isMobile = /Mobi/i.test(window.navigator.userAgent); // "Mobi" 가 User agent에 포함되어 있으면 모바일
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // 안드로이드 아이폰을 검사해 체크

let wrap = document.getElementById("main-wrap");
let container = Array.from(document.querySelectorAll(".container"));
let paginationWrap = document.querySelector(".pagination");
let pagination = document.querySelectorAll(".pagination p");
let firstContainer = container[0];
let lastContainer = container[3];
let body = document.body;

body.style.overflow = "hidden";

document.addEventListener("DOMContentLoaded", function(){
    footer.style.display="none";
});

let vh = 0;
vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

//모바일에서 비디오 컨트롤
// let video = document.getElementById("video");
// let playBtn = document.querySelector(".play-btn");

// if ( window.innerWidth <= 540 && isMobile == true ) {
//     playBtn.style.display = "flex";
//     video.pause();
//     video.loop = false;
//     playBtn.addEventListener("click", () => {
//         if (video.paused == true) {
//             video.play(); // 재생
//             playBtn.className = playBtn.className.replace("ion-play", "ion-pause");
//         } else {
//             video.pause(); // 일시정지
//             playBtn.className = playBtn.className.replace("ion-pause", "ion-play");
//         }
//     });
//     video.addEventListener("ended", () => {
//         video.pause();
//         playBtn.className = playBtn.className.replace("ion-pause", "ion-play");
//     });
// }



//페이지네이션
function paginationON(index) {
    pagination.forEach((e) => { 
        e.classList.remove("on"); //페이지네이션의 on클래스를 전부 없앤다.
    });
    pagination[index].classList.add("on"); //해당 페이지네이션에 on클래스를 추가한다.
}


//밝은배경일때 페이지네이션과 헤더에 dark모드
function darkMode(ContainerNum) { 
    if ( ContainerNum == 2 || ContainerNum == 3 || ContainerNum == 4 ) {
        navWrap.classList.add("headerDarkText");
        paginationWrap.classList.add("dark");
        mobileNav.classList.add("moDark")
    } else {
        navWrap.classList.remove("headerDarkText");
        paginationWrap.classList.remove("dark");    
        mobileNav.classList.remove("moDark")
    }
}


//컨테이너별 페이드 애니메이션
function ani(ContainerNum) { 
    let tl = gsap.timeline();

    if( ContainerNum == 2 ) {
        tl.from(".brand-title", { opacity: 0, y:100, duration: 1, delay: 0.6 })
          .from(".slide-container", { opacity: 0, y:100, duration: 0.8 }, "<0.2")
    }
    if( ContainerNum == 3 ) {
        tl.from(".PR-title", { opacity: 0, y:100, duration: 1, delay: 0.6 })
          .from(".PR-news1", { opacity: 0, y:50, duration: 0.8 }, "<0.3")
          .from(".PR-news2", { opacity: 0, y:50, duration: 0.8 }, "<0.2")
          .from(".PR-news3", { opacity: 0, y:50, duration: 0.8 }, "<0.2")
          .from(".PR-news-btn", { opacity: 0, duration: 0.5 }, "<0.3")
    }
    // if( ContainerNum == 4 ) {
    //     tl.from(".ending-text1", { opacity: 0, y:50, duration: 0.8, delay: 0.6 })
    //       .from(".ending-text2", { opacity: 0, y:50, duration: 0.8 }, "<0.2")
    //       .from(".ending-text3", { opacity: 0, y:50, duration: 0.8 }, "<0.2")
    //       .from(".ending-text4", { opacity: 0, y:50, duration: 0.6 }, "<0.2")
    // } 
}


// 일정 시간 동안 다음 호출을 막아주는 함수
function throttle(func, limit) { 
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


//페이지네이션 클릭시 컨테이너 이동
pagination.forEach((i, index) => {
    i.addEventListener("click", () => {
        
        darkMode(index);
        ani(index);
        for(let idx=0; idx<container.length; idx++) {
            if(index > idx) { //이동하고자 하는 페이지네이션 인덱스가 컨테이너 인덱스보다 크면
                container[idx].style.top = "-100%"; // 컨테이너를 -100%만큼 이동시킨다.(=화면상의 위로 이동시킨다)
            }
            if(index < idx){ //이동하고자 하는 페이지네이션 인덱스가 컨테이너 인덱스보다 작으면
                container[idx].style.top = "100%"; // 컨테이너를 100%만큼 이동시킨다.(=화면상의 아래로 이동시킨다)
            }
        };
        container[index].style.top = "0"; //클릭한 페이지네이션 인덱스와 일치하는 인덱스의 컨테이너의 top이 0이 되게 한다. 
        paginationON(index);
        }
    );
});


//휠 이벤트
const handleWheelThrottled = throttle((e) => {
    e.preventDefault();
    if(e.deltaY > 0) {
        for (let i=0; i<container.length; i++) {
            let elementTop = getComputedStyle(container[i]).top; //컨테이너의 top값
            if( elementTop == "0px" ){ //top이 0px인 컨테이너가 있을 경우
                if( getComputedStyle(lastContainer).top == "0px" ) { //마지막 컨테이너의 top이 0일 경우 휠이벤트를 빠져나온다.
                    break;
                }
                container[i].style.top = "-100%"; //현재 위치에서 -100%의 위치로 이동시킨다.
                let nextElement = container[i].nextElementSibling;
                nextElement.style.top = "0px"; //다음 컨테이너의 top이 0이 되게 한다.
                paginationON(i+1); //i(현재컨테이너) +1 = (다음컨테이너)
                darkMode(i+1);
                ani(i+1);
                if( !getComputedStyle(firstContainer).top == "0px" ) {
                    let prevElement = container[i].previousElementSibling;
                    prevElement.style.top = "-100%"; //이전 컨테이너의 top이 -100%이 되게 한다.
                }
                break;
            }
        }
    }
    if(e.deltaY < 0) {
        for (let i=0; i<container.length; i++) {
            let elementTop = getComputedStyle(container[i]).top;
            if( elementTop == "0px" ){
                if( getComputedStyle(firstContainer).top == "0px" ) { //첫번째 컨테이너의 top이 0일 경우 휠이벤트를 빠져나온다.
                    break;
                }
                container[i].style.top = "100%";
                let prevElement = container[i].previousElementSibling;
                prevElement.style.top = "0px";
                paginationON(i-1); //i(현재컨테이너) -1 = (이전컨테이너)
                darkMode(i-1);
                ani(i-1);

                if( !getComputedStyle(lastContainer).top == "0px" ) {
                    let nextElement = container[i].nextElementSibling;
                    nextElement.style.top = "100%";
                }
                break;
            }
        }
    }
}, 1200);

window.addEventListener('wheel', handleWheelThrottled, { passive: false });



//메인 2
let hoverItem = Array.from(document.querySelectorAll(".item-subject"));
let hoverBg = Array.from(document.querySelectorAll(".main-bg"));
let hidden = Array.from(document.querySelectorAll(".hidden"));
let horizontal = Array.from(document.querySelectorAll(".horizontal"));
let vertical = Array.from(document.querySelectorAll(".vertical"));
let hoverItemParent = document.querySelector(".hover-item");

hoverBg[0].style.opacity = "1";

if ( window.innerWidth > 540 || isMobile == false ) {
    hoverItem.forEach((item, index) => {
        item.addEventListener("mouseover", () => {
            item.classList.add("itemHover")
            hidden[index].classList.add("show");
            horizontal[index].classList.add("horizontalShrink");
            vertical[index].classList.add("verticalLong");
            if( index > 0 ){
                hoverBg[index].style.opacity = "1";
            };
        });
        item.addEventListener("mouseout", () => {
            item.classList.remove("itemHover");
            hidden[index].classList.remove("show");
            horizontal[index].classList.remove("horizontalShrink");
            vertical[index].classList.remove("verticalLong");
            if( index > 0 ){
                hoverBg[index].style.opacity = "0";
            };
        });
    });

    hoverItem.forEach((i, index) => {  
        i.addEventListener("mouseover", () => {
            hoverItemParent.classList.add(`hover${index+1}`);
        })
        i.addEventListener("mouseout", () => {
            hoverItemParent.classList.remove(`hover${index+1}`);
        })
    })
}

if ( window.innerWidth <= 540 && isMobile == true ) {
    hoverItemParent.classList.add(`hover1`);
    hoverItem[0].classList.add("itemHover");
    hidden[0].classList.add("show");
    
    hoverItem.forEach((i, index) => {  
        i.addEventListener("click", () => {
            hoverItemParent.classList.add(`hover${index+1}`);
            i.classList.add("itemHover")
            hidden[index].classList.add("show");
        
            hoverItem.forEach((otherItem, otherIndex) => {
                if (index !== otherIndex) {
                    hoverItemParent.classList.remove(`hover${otherIndex+1}`);
                    otherItem.classList.remove("itemHover");
                    hidden[otherIndex].classList.remove("show");
                }
            })
        })
    })
}



//메인 3
let slideContainer = document.querySelector(".slide-container");
let slideWrap = document.querySelector(".slide-wrap");
slideWrap.innerHTML += slideWrap.innerHTML;
let slide = document.querySelectorAll(".slide");
let slideWidth = parseFloat(getComputedStyle(slide[0]).width) + parseFloat(getComputedStyle(slide[0]).marginRight) *2;

let slideDescriptionWrap = document.querySelector(".slide-description-wrap");
slideDescriptionWrap.innerHTML += slideDescriptionWrap.innerHTML;
let slideDescription = Array.from(document.querySelectorAll(".slide-description"));

let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let prevBtnChevron = document.querySelector(".ion-chevron-left");
let nextBtnChevron = document.querySelector(".ion-chevron-right");

let container3BgWrap = document.querySelector(".container-03-bg");
for (let i=0; i<slide.length; i++) {
    let newDiv = document.createElement('div');
    container3BgWrap.appendChild(newDiv);
}
let container3Bg = Array.from(document.querySelectorAll(".container-03-bg div"));

container3Bg[0].style.opacity = "1";
slideDescription[0].style.opacity = "1";
slideDescription[0].style.visibility = "visible";


//슬라이드 translateX 셋팅하는 부분
function slideTranslateXSetting() {
    let startSlideIndex = (slide.length/2);

    slide[startSlideIndex-3].style.transform = `translateX(-${slideWidth*3}px)`;
    slide[startSlideIndex-2].style.transform = `translateX(-${slideWidth*2}px)`;
    slide[startSlideIndex-1].style.transform = `translateX(-${slideWidth}px)`;

    //기준이 되는 슬라이드
    slide[startSlideIndex].style.transform = `translateX(${0}px)`;

    slide[startSlideIndex+1].style.transform = `translateX(${slideWidth}px)`;
    slide[startSlideIndex+2].style.transform = `translateX(${slideWidth*2}px)`;
}
slideTranslateXSetting();



let isResized = false;

let windowWidth = window.innerWidth; 

window.addEventListener("resize", () => {
    isResized = true;
    setTimeout(() => (isResized = false), 600);

    windowWidth = window.innerWidth;
    
    if (windowWidth >= 1500) {
        slideWidth = 1290;
    } else if (windowWidth >= 1200) {
        slideWidth = 1150;
    } else if (windowWidth < 1200) {
        slideWidth = windowWidth;
    }

    slideTranslateXSetting();


    container3Bg.forEach((i)=>(i.style.opacity = "0"));
    slideDescription.forEach((i)=>{
        i.style.opacity = "0";
        i.style.visibility = "hidden";
    })

    container3Bg[3].style.opacity = "1";
    slideDescription[3].style.opacity = "1";
    slideDescription[3].style.visibility = "visible";
})

let isAutoSlideRunning = true;
let isMouseOver = false;

slideContainer.addEventListener("mouseover", () => (isMouseOver = true));
slideContainer.addEventListener("mouseout", () => (isMouseOver = false));


// document.addEventListener("visibilitychange", function() {
//     if (document.visibilityState === "visible") {
//         // 현재 탭이 활성화된 경우 실행할 코드
//         console.log("현재 탭이 활성화되었습니다.");
//     } else {
//         // 현재 탭이 비활성화된 경우 실행할 코드
//         console.log("현재 탭이 비활성화되었습니다. 함수를 멈춥니다.");
//         // 여기에서 함수를 멈추는 코드를 추가할 수 있습니다.
//     }
// });

let isWindowVisible = true;

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        isWindowVisible = false;
        // console.log("현재 탭이 비활성화되었습니다. 함수를 멈춥니다.");
    } else {
        isWindowVisible = true;
        // console.log("현재 탭이 활성화되었습니다.");
    }
});


function autoSlide() {
    if (isWindowVisible && !isResized && !isMouseOver && isMobile==false) { //PC
        // let slideXTemp = [];
        slide.forEach((slide, idx) => {
            let slideX = parseFloat(getComputedStyle(slide).transform.split(', ')[4]);     
            // slideXTemp.push(slideX);
            let newSlideX = slideX - slideWidth;
            
            slide.style.transform = `translateX(${newSlideX}px)`;
            
            if (getComputedStyle(slide).transform.split(', ')[4] == `${-slideWidth * 3}`) {
                slide.style.opacity = "0";
                slide.style.transition = "none";
                setTimeout(() => { slide.style.transform = `translateX(${slideWidth * 2}px)`; }, 500);
                setTimeout(() => { slide.style.opacity = "1"; slide.style.transition = "0.5s"; }, 600);
            }
            if (newSlideX === 0) {
                slideDescription[idx].style.opacity = "1";
                slideDescription[idx].style.visibility = "visible";
                container3Bg[idx].style.opacity = "1";
            } else {
                slideDescription[idx].style.opacity = "0";
                slideDescription[idx].style.visibility = "hidden";
                container3Bg[idx].style.opacity = "0";
            }
        });
        // console.log(slideXTemp);
        // let foundValue = slideXTemp.find(value => Math.abs(value) > slideWidth*3);
        // if(slideXTemp.includes(0)) {
        //     console.log("0포함");
        // }
        // if(!slideXTemp.includes(0) || foundValue !== undefined) {
        //     console.log("0 안포함이거나 뭔가 발견됨", foundValue);
        //     let startSlideIndex = (slide.length/2);

        //     slide[startSlideIndex-3].style.transform = `translateX(-${slideWidth*3}px)`;
        //     slide[startSlideIndex-2].style.transform = `translateX(-${slideWidth*2}px)`;
        //     slide[startSlideIndex-1].style.transform = `translateX(-${slideWidth}px)`;

        //     //기준이 되는 슬라이드
        //     slide[startSlideIndex].style.transform = `translateX(${0}px)`;

        //     slide[startSlideIndex+1].style.transform = `translateX(${slideWidth}px)`;
        //     slide[startSlideIndex+2].style.transform = `translateX(${slideWidth*2}px)`;
        // }
    }
    if (isWindowVisible && !isResized && isMobile==true && isTouching==false) { //Mobile
        setTimeout(() => { 
            // console.log("2");
            slide.forEach((slide, idx) => {
                let slideX = parseFloat(getComputedStyle(slide).transform.split(', ')[4]);
                let newSlideX = slideX - slideWidth;

                slide.style.transform = `translateX(${newSlideX}px)`;
                if (getComputedStyle(slide).transform.split(', ')[4] == `${-slideWidth * 3}`) {
                    slide.style.opacity = "0";
                    slide.style.transition = "none";
                    setTimeout(() => { slide.style.transform = `translateX(${slideWidth * 2}px)`; }, 500);
                    setTimeout(() => { slide.style.opacity = "1"; slide.style.transition = "0.5s"; }, 600);
                }
                if (newSlideX === 0) {
                    slideDescription[idx].style.opacity = "1";
                    slideDescription[idx].style.visibility = "visible";
                    container3Bg[idx].style.opacity = "1";
                } else {
                    slideDescription[idx].style.opacity = "0";
                    slideDescription[idx].style.visibility = "hidden";
                    container3Bg[idx].style.opacity = "0";
                }
            });
        }, 600); 
        setTimeout(() => { 
            // console.log("3");
            nextBtn.addEventListener("click", nextBtnHandler);
            prevBtn.addEventListener("click", prevBtnHandler);
            container.forEach((i) => {
                i.addEventListener('touchstart', throttledTouchStart);
                i.addEventListener('touchmove', touch_move);
                i.addEventListener('touchend', throttledTouchEnd);
            });
            
        }, 1500);      
    }
}
setInterval(() => {
    if (isAutoSlideRunning && isMobile==true && getComputedStyle(container[2]).top == "0px") {
        nextBtn.removeEventListener("click", nextBtnHandler);
        prevBtn.removeEventListener("click", prevBtnHandler);
        container.forEach((i) => {
            i.removeEventListener('touchstart', throttledTouchStart);
            i.removeEventListener('touchmove', touch_move);
            i.removeEventListener('touchend', throttledTouchEnd);
        });
        autoSlide();
    } else if (isAutoSlideRunning && isMobile==false && getComputedStyle(container[2]).top == "0px") {
        autoSlide();
    } else {
        return;
    }
}, 3000);

const nextBtnHandler = throttle(() => {
    prevBtn.removeEventListener("click", prevBtnHandler);
    isAutoSlideRunning = false;
        slide.forEach((slide, idx) => {
            let slideX = parseFloat(getComputedStyle(slide).transform.split(', ')[4]);
            let newSlideX = slideX - slideWidth;

            slide.style.transform = `translateX(${newSlideX}px)`;
            if (getComputedStyle(slide).transform.split(', ')[4] == `${-slideWidth * 3}`) {
                slide.style.opacity = "0";
                slide.style.transition = "none";
                setTimeout(() => { slide.style.transform = `translateX(${slideWidth * 2}px)`; }, 500);
                setTimeout(() => { slide.style.opacity = "1"; slide.style.transition = "0.5s"; }, 600);
            }
            if (newSlideX === 0) {
                slideDescription[idx].style.opacity = "1";
                slideDescription[idx].style.visibility = "visible";
                container3Bg[idx].style.opacity = "1";
            } else {
                slideDescription[idx].style.opacity = "0";
                slideDescription[idx].style.visibility = "hidden";
                container3Bg[idx].style.opacity = "0";
            }
        });
        setTimeout(() => { 
            prevBtn.addEventListener("click", prevBtnHandler);
            isAutoSlideRunning = true;
        }, 1000);
}, 600);
nextBtn.addEventListener("click", nextBtnHandler);

const prevBtnHandler = throttle(() => {
    nextBtn.removeEventListener("click", nextBtnHandler);
    isAutoSlideRunning = false;
        slide.forEach((slide, idx) => {
            let slideX = parseFloat(getComputedStyle(slide).transform.split(', ')[4]);
            let newSlideX = slideX + (slideWidth);

            slide.style.transform = `translateX(${newSlideX}px)`;
            if(getComputedStyle(slide).transform.split(', ')[4] == `${slideWidth*2}`) {
                slide.style.opacity = "0";
                slide.style.transition = "none";
                setTimeout(() => { slide.style.transform = `translateX(-${slideWidth*3}px)`; }, 500);
                setTimeout(() => { slide.style.opacity = "1"; slide.style.transition = "0.5s"; }, 600);
            }
            if(newSlideX === 0) {
                slideDescription[idx].style.opacity = "1";
                slideDescription[idx].style.visibility = "visible";
                container3Bg[idx].style.opacity = "1";
            } else {
                slideDescription[idx].style.opacity = "0";
                slideDescription[idx].style.visibility = "hidden";
                container3Bg[idx].style.opacity = "0";
            }
        })
        setTimeout(() => { 
            nextBtn.addEventListener("click", nextBtnHandler); 
            isAutoSlideRunning = true;
        }, 1000);
}, 600);
prevBtn.addEventListener("click", prevBtnHandler);


// 모바일 터치
let start_x, end_x;
let start_y, end_y;

let isTouching = false;

const throttledTouchStart = throttle(touch_start, 600);
const throttledTouchEnd = throttle(touch_end, 600);

container.forEach((i) => {
    i.addEventListener('touchstart', throttledTouchStart);
    i.addEventListener('touchmove', touch_move);
    i.addEventListener('touchend', throttledTouchEnd);
});

function prev(){
    for (let i=0; i<container.length; i++) {
        let elementTop = getComputedStyle(container[i]).top;
        if( elementTop == "0px" ){
            if( getComputedStyle(firstContainer).top == "0px") { //첫번째 컨테이너의 top이 0일 경우 break.
                break;
            } 
            
            container[i].style.top = "100%";
            let prevElement = container[i].previousElementSibling;
            prevElement.style.top = "0px";
            paginationON(i-1); //i(현재컨테이너) -1 = (이전컨테이너)
            darkMode(i-1);
            ani(i-1);

            if( !getComputedStyle(lastContainer).top == "0px" ) {
                let nextElement = container[i].nextElementSibling;
                nextElement.style.top = "100%";
            }
            break;
        }
    }
}
function next(){              
    for (let i=0; i<container.length; i++) {
        let elementTop = getComputedStyle(container[i]).top; //컨테이너의 top값
        if( elementTop == "0px" ){ //top이 0px인 컨테이너가 있을 경우
            if( getComputedStyle(lastContainer).top == "0px") { //마지막 컨테이너의 top이 0일 경우 break.
                break;
            }
            container[i].style.top = "-100%"; //현재 위치에서 -100%의 위치로 이동시킨다.
            let nextElement = container[i].nextElementSibling;
            nextElement.style.top = "0px"; //다음 컨테이너의 top이 0이 되게 한다.
            paginationON(i+1); //i(현재컨테이너) +1 = (다음컨테이너)
            darkMode(i+1);
            ani(i+1);
            if( !getComputedStyle(firstContainer).top == "0px" ) {
                let prevElement = container[i].previousElementSibling;
                prevElement.style.top = "-100%"; //이전 컨테이너의 top이 -100%이 되게 한다.
            }
            break;
        }
    }                
}
function slidePrev() {
    nextBtn.removeEventListener("click", nextBtnHandler);
    prevBtn.removeEventListener("click", prevBtnHandler);
    slide.forEach((slide, idx) => {
        let slideX = parseFloat(getComputedStyle(slide).transform.split(', ')[4]);
        let newSlideX = slideX + (slideWidth);

        slide.style.transform = `translateX(${newSlideX}px)`;
        if(getComputedStyle(slide).transform.split(', ')[4] == `${slideWidth*2}`) {
            slide.style.opacity = "0";
            slide.style.transition = "none";
            setTimeout(() => { slide.style.transform = `translateX(-${slideWidth*3}px)`; }, 500);
            setTimeout(() => { slide.style.opacity = "1"; slide.style.transition = "0.5s"; }, 600);
        }
        if(newSlideX === 0) {
            slideDescription[idx].style.opacity = "1";
            slideDescription[idx].style.visibility = "visible";
            container3Bg[idx].style.opacity = "1";
        } else {
            slideDescription[idx].style.opacity = "0";
            slideDescription[idx].style.visibility = "hidden";
            container3Bg[idx].style.opacity = "0";
        }
    })
    setTimeout(() => { 
        prevBtn.addEventListener("click", prevBtnHandler); 
        nextBtn.addEventListener("click", nextBtnHandler);
    }, 600);
}
function slideNext() {
    nextBtn.removeEventListener("click", nextBtnHandler);
    prevBtn.removeEventListener("click", prevBtnHandler);
    slide.forEach((slide, idx) => {
        let slideX = parseFloat(getComputedStyle(slide).transform.split(', ')[4]);
        let newSlideX = slideX - slideWidth;

        slide.style.transform = `translateX(${newSlideX}px)`;
        if (getComputedStyle(slide).transform.split(', ')[4] == `${-slideWidth * 3}`) {
            slide.style.opacity = "0";
            slide.style.transition = "none";
            setTimeout(() => { slide.style.transform = `translateX(${slideWidth * 2}px)`; }, 500);
            setTimeout(() => { slide.style.opacity = "1"; slide.style.transition = "0.5s"; }, 600);
        }
        if (newSlideX === 0) {
            slideDescription[idx].style.opacity = "1";
            slideDescription[idx].style.visibility = "visible";
            container3Bg[idx].style.opacity = "1";
        } else {
            slideDescription[idx].style.opacity = "0";
            slideDescription[idx].style.visibility = "hidden";
            container3Bg[idx].style.opacity = "0";
        }
    });
    setTimeout(() => { 
        prevBtn.addEventListener("click", prevBtnHandler); 
        nextBtn.addEventListener("click", nextBtnHandler);
    }, 600);
}
const throttledSlidePrev = throttle(slidePrev, 600);
const throttledSlideNext = throttle(slideNext, 600);


function touch_start(event) {
    start_x = event.touches[0].pageX;
    start_y = event.touches[0].pageY;

    if(container[2].style.top === "0px"){
        isAutoSlideRunning = false;
        isTouching = true; 
        // console.log("touch");
    }
    if(320 <= start_x && 370 >= start_x && 315 <= start_y && 370 >= start_y) {
        console.log("next btn");
        
    }
    if(6 <= start_x && 60 >= start_x && 315 <= start_y && 370 >= start_y) {
        console.log("prev btn");

    }
}
function touch_move(event) {
    var touch = event.touches[0]; // 첫 번째 터치 포인트만 고려
    var touchX = touch.clientX;
    var touchY = touch.clientY;

    // console.log("Touch move at X: " + touchX + ", Y: " + touchY);

    if(container[2].style.top === "0px"){
        nextBtn.removeEventListener("click", nextBtnHandler);
        prevBtn.removeEventListener("click", prevBtnHandler);
        isAutoSlideRunning = false;
        isTouching = true;
        console.log("슬라이드3번쨰");
    }
}
function touch_end(event) {
    end_x = event.changedTouches[0].pageX;
    end_y = event.changedTouches[0].pageY;

    if(container[2].style.top === "0px" && start_x - end_x > 50){
        slideNext();
        setTimeout(() => { 
            isTouching = false;
            isAutoSlideRunning = true;
            prevBtn.addEventListener("click", prevBtnHandler); 
            nextBtn.addEventListener("click", nextBtnHandler);
        }, 600);
    } else if(container[2].style.top === "0px" && end_x - start_x > 50){
        slidePrev();
        setTimeout(() => { 
            isTouching = false;
            isAutoSlideRunning = true;
            prevBtn.addEventListener("click", prevBtnHandler); 
            nextBtn.addEventListener("click", nextBtnHandler);
        }, 600);
    } 
    
    if(start_y - end_y > 50){
        next();
    } else if(end_y - start_y > 50){
        prev();
    } 
    setTimeout(() => { 
        isTouching = false;
        isAutoSlideRunning = true;
    }, 600);
}

