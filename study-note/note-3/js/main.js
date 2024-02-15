const API_KEY = '9963499de40347aa88d42febe10485db';
let newsList = [];
let categorys = document.querySelectorAll(".category span");
let searchInput = document.getElementById("search-input");
let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
    try {
        //URL에서 제공하는 함수
        url.searchParams.set("page", page); // => &page=page
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);
        const data = await response.json(); 

        if(response.status === 200) {
            if(data.articles.length === 0) {
                throw new Error("No result for this search.")
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render()
            paginationRender()
        } else {
            throw new Error(data.message)
        }
    } catch(error) { //에러 핸들
        errorRender(error.message)
    }
}

const getLatesNews = async () => {
    //URL 인스턴스에서는 URL 작업에 필요한 여러 함수와 변수를 제공해준다.
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    
    //fetch를 써서 url을 불러온다.
    //fetch 되기를 기다려달라는 명령어: await
    //await은 async와 함께 써야한다.
    // const response = await fetch(url);

    //이때, response의 body 안에 있는 데이터는 json이라는 확장자를 통해 뽑아줘야한다.
    //json은 ^객체를 텍스트화^시킨 파일형태의 확장자이다. (사진파일은 jpg,png이듯이 하나의 확장자라고 생각하면 됨)
    // const data = await response.json(); 
    // newsList = data.articles;
    // render()

    getNews()
}
getLatesNews()

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="error"><p>${errorMessage}</p></div>`;
    document.querySelector(".news-container").innerHTML = errorHTML;
}

//키워드 받아 랜더하는 함수
const getKeyword = async () => {
    let keyword = searchInput.value;
    url = new URL(`https://newsapi.org/v2/top-headlines?q=${keyword}&country=us&apiKey=${API_KEY}`);
    getNews()
    searchInput.value = '';
}

const render = () => {
    //newsHTML이 배열이라서 news들 사이에 ,(콤마)가 같이 html에 들어가버린다.
    //join을 이용해 배열을 구분해주는 ,을 없앤다.
    const newsHTML = newsList.map(news => {
        if (news.title === '[Removed]') { 
            return '';
        } else if (news.content === null) {
            if (news.author === null){
                return `<div class="news">
                            <a href="${news.url}" class="link">
                                <div class="img">
                                    <img src="${news.urlToImage}" alt="" onerror="this.src='./img/no-image.png'">
                                </div>
                                <div class="text">
                                    <p class="title">${news.title}</p>
                                    <p class="content">No contents</p>
                                    <p class="info">no source, ${news.publishedAt}</p>
                                </div>
                            </a>
                        </div>`;
            } else {
                return `<div class="news">
                            <a href="${news.url}" class="link">
                                <div class="img">
                                    <img src="${news.urlToImage}" alt="" onerror="this.src='./img/no-image.png'">
                                </div>
                                <div class="text">
                                    <p class="title">${news.title}</p>
                                    <p class="content">No contents</p>
                                    <p class="info">${news.author}, ${news.publishedAt}</p>
                                </div>
                            </a>
                        </div>`;
            }
        } else if (news.author === null) {
            return `<div class="news">
                        <a href="${news.url}" class="link">
                            <div class="img">
                                <img src="${news.urlToImage}" alt="" onerror="this.src='./img/no-image.png'">
                            </div>
                            <div class="text">
                                <p class="title">${news.title}</p>
                                <p class="content">${news.content}</p>
                                <p class="info">no source, ${news.publishedAt}</p>
                            </div>
                        </a>
                    </div>`;
        } else {
            return `<div class="news">
                        <a href="${news.url}" class="link">
                            <div class="img">
                                <img src="${news.urlToImage}" alt="" onerror="this.src='./img/no-image.png'">
                            </div>
                            <div class="text">
                                <p class="title">${news.title}</p>
                                <p class="content">${news.content}</p>
                                <p class="info">${news.author}, ${news.publishedAt}</p>
                            </div>
                        </a>
                    </div>`;
        }
        // return ''; // 값이 빠진 또는 null인 아이템에 대해 빈 문자열 반환
    }).join('');
    document.querySelector(".news-container").innerHTML = newsHTML;
}

const paginationRender = () => {
    //totalResult
    //page
    //pageSize
    //groupSize
    //totalPages
    const totalPages = Math.ceil(totalResults / pageSize);
    
    //pageGroup (현재 페이지가 속한 그룹)
    const pageGroup = Math.ceil(page/groupSize);

    //lastPage
    let lastPage = pageGroup * groupSize;
    if(lastPage > totalPages) {
        lastPage = totalPages;
    }
    
    //firstPage
    //첫번째 페이지가 0보다 작거나 같다면 1로 설정하고 아니라면 원래 수식대로 설정.
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    let paginationHTML = ``;
    
    if(page === 1 || totalPages <= groupSize) {
        paginationHTML += ``;
    } else {
        paginationHTML += `<li onclick="moveToPage(${page-1})">prev</li>`;
    }

    for(let i=firstPage; i<=lastPage; i++) {
                                        //i가 내가 보고 있는 페이지라면 active를 넣고 아니라면 ''.
        paginationHTML += `<li class="${i===page?'active':''}" onclick="moveToPage(${i})">${i}</li>`;
    }

    if(page === totalPages || totalPages <= groupSize) {
        paginationHTML += ``;
    } else {
        paginationHTML += `<li onclick="moveToPage(${page+1})">next</li>`;
    }
    document.querySelector(".pagination ul").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews()
}

const getCategory = async (event) => {
    page = 1;
    let category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`);
    console.log(url);
    getNews()
}

categorys.forEach(category => {
    category.addEventListener("click", (event) => getCategory(event))
})

//헤더 좌측에 오늘의 날짜 출력
function getCurrentDateAndDay() {
    const today = new Date();
    
    // 날짜 및 요일 정보
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    
    // 결과 반환
    const result = `<p>${formattedDate}</p>`

    return result;
}

const currentDateAndDay = getCurrentDateAndDay();
document.querySelector(".todays-date").innerHTML = currentDateAndDay;

//모바일 nav 토글버튼
let mobileIcon = document.querySelector(".mo");
let sideBar = document.querySelector(".category");

mobileIcon.addEventListener("click", () => {
    mobileIcon.classList.toggle("moIconAni");
    sideBar.classList.toggle("active");
})