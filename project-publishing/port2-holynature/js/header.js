//hover-nav
let header = document.querySelector("header");
let navWrap = document.querySelector(".nav-wrap");
let navWrapUl = document.querySelector(".nav-wrap .nav ul");
let hoverNav = document.querySelector(".hover-nav");
let dimdBg = document.querySelector(".dimd-bg");

navWrap.addEventListener("mouseover", () => {
    if( window.innerWidth >= 1100 ) {
        hoverNav.classList.add("active");
        header.classList.add("hover");
        dimdBg.classList.add("dimdBgActive");
    }
});
navWrap.addEventListener("mouseout", () => {
    if( window.innerWidth >= 1100 ) {
        hoverNav.classList.remove("active");
        header.classList.remove("hover");
        dimdBg.classList.remove("dimdBgActive");
    }
});
navWrap.addEventListener("click", () => {
    if( window.innerWidth >= 1100 ) {
        hoverNav.classList.toggle("active");
        header.classList.toggle("hover");
        dimdBg.classList.toggle("dimdBgActive");
    }
});

//모바일
let mobileNav = document.querySelector(".mo");
let mobileNavWrap = document.querySelector(".mo-nav-wrap");
let dimdBgMo = document.querySelector(".dimd-bg-mo");

mobileNav.addEventListener("click", (e) => {
    mobileNavWrap.classList.toggle("moNavActive");
    dimdBgMo.classList.toggle("dimdBgActive");
    mobileNav.classList.toggle("moIconAni");
})

window.addEventListener("resize", () => {
    mobileNavWrap.classList.remove("moNavActive");
    mobileNav.classList.remove("moIconAni");
    dimdBgMo.classList.remove("dimdBgActive");
})
dimdBgMo.addEventListener("click", () => {
    mobileNavWrap.classList.remove("moNavActive");
    mobileNav.classList.remove("moIconAni");
    dimdBgMo.classList.remove("dimdBgActive");
})

//모바일 sub 메뉴 오픈
let mobileLi = document.querySelectorAll(".mo-nav-wrap");    
let mobilePlusIcon = document.querySelectorAll(".mo-plus-icon");
let mobileMinusIcon = document.querySelectorAll(".mo-minus-icon");
let mobileSubList = document.querySelectorAll(".mo-sub");

mobilePlusIcon.forEach((pIcon, iconIndex) => {
    pIcon.addEventListener("click", (e)=> {
        mobileSubList.forEach((list, listIndex) => {
            if (iconIndex == listIndex) {
                list.classList.add("listActive");
            } else { 
                list.classList.remove("listActive");
            }
        })
        e.target.style.opacity = "0";
        e.target.style.visibility = "hidden";
        mobileMinusIcon[iconIndex].style.opacity = "1";
        mobileMinusIcon[iconIndex].style.visibility = "visible";

        mobilePlusIcon.forEach((otherIcon, otherIndex) => {
            if (otherIndex !== iconIndex) {
                otherIcon.style.opacity = "1";
                otherIcon.style.visibility = "visible";
                mobileMinusIcon[otherIndex].style.opacity = "0";
                mobileMinusIcon[otherIndex].style.visibility = "hidden";
            }
        });
    })
})
mobileMinusIcon.forEach((mIcon, iconIndex) => {
    mIcon.addEventListener("click", ()=> {
        mobileSubList.forEach((list, listIndex) => {
            if (iconIndex == listIndex) {
                list.classList.remove("listActive");
                mobilePlusIcon[iconIndex].style.opacity = "1";
                mobilePlusIcon[iconIndex].style.visibility = "visible";
                mIcon.style.opacity = "0";
                mIcon.style.visibility = "hidden";
            }
        })
    })
})