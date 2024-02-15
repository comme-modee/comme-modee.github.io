// 로고(a태그) 클릭시 스크롤 탑으로 올려주는 애니
$('a').click(function(){
    $('html, body').animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top - 60
    }, 600);
    return false;
});


let headerMenu = Array.from(document.querySelectorAll(".pc-nav li a"));
let underLine = document.querySelector(".underline");

headerMenu.forEach((menu, idx) => {
    menu.addEventListener("click", (a) => {
        underLine.style.cssText = `width:${a.currentTarget.offsetWidth}px; left:${a.currentTarget.offsetLeft}px`;
    })
})

//모바일 nav 토글버튼
let mobileIcon = document.querySelector(".mo");
let mobileNav = document.querySelector(".mobile-nav");

mobileIcon.addEventListener("click", () => {
    mobileIcon.classList.toggle("moIconAni");
    mobileNav.classList.toggle("active");
})

let workBtns = document.querySelectorAll(".work-btns > span");
let workContent = document.querySelectorAll(".project");

workBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if(btn.id === "all") {
            workContent.forEach((e)=>{ e.style.display = "block"; })
        } else if(btn.id === "responsive") {
            workContent.forEach((e)=>{ 
                if(e.className.includes("responsive")){
                    e.style.display = "block"; 
                } else {
                    e.style.display = "none"; 
                }
            })
        } else if(btn.id === "pc") {
            workContent.forEach((e)=>{ 
                if(e.className.includes("pc")){
                    e.style.display = "block"; 
                } else {
                    e.style.display = "none"; 
                }
            })
        }
    })
})