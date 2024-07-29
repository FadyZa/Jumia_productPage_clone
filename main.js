import { auth, signOut  } from "./firebaseConfig.js";

$(document).ready(function(){

    // fetch products and show it
    $.ajax({url: "./jumia-scraper.json", success: function(result){
        let newArr = [...result.slice(0,10)];
        showData(newArr)

        $(".next-page").click(function(e){
            let currPage = $(".pagination .active");

            let nextListItem = $(currPage).parent().next();
            let nextBtn = $(nextListItem).children();

            currPage.removeClass("active");
            nextBtn.addClass("active");

            let start = (parseInt($(nextBtn).text()) - 1) * 10;
            let end = start + 10;

            console.log(`start: ${start} , end" ${end}`)

            if(parseInt($(".pagination .active").text()) > 1 ){
                $(".prev-page").removeClass("disabled");
            }else{
                $(".prev-page").addClass("disabled");

            }

            if($(".pagination .active").text() >= $(".page-num").length){
                $(".next-page").addClass("disabled");
            }else{
                $(".next-page").removeClass("disabled");
            }
            
            newArr = [...result.slice(start,end)];
            showData(newArr);
        })
        
        $(".prev-page").click(function(e){
            let currPage = $(".pagination .active");

            let nextListItem = $(currPage).parent().prev();
            let prevBtn = $(nextListItem).children();

            currPage.removeClass("active");
            prevBtn.addClass("active");

            let end = (parseInt($(currPage).text()) - 1) * 10;

            let start = end == 0 ? 0 : end - 10;

            console.log(`start: ${start} , end" ${end}`)

            if(parseInt($(".pagination .active").text()) > 1 ){
                $(".prev-page").removeClass("disabled");
            }else{
                $(".prev-page").addClass("disabled");

            }

            if($(".pagination .active").text() >= $(".page-num").length){
                $(".next-page").addClass("disabled");
            }else{
                $(".next-page").removeClass("disabled");
            }
            
            newArr = [...result.slice(start,end)];
            showData(newArr);
        })

       
        $(".page-num").click(function(e){
            $(".page-num").removeClass("active");
            $(e.target).addClass("active");


            let pageNum = +$(".pagination .active").text();
            let start = pageNum == 1 ? 0 : (pageNum - 1) * 10;
            let end = start + 10;

            newArr = [...result.slice(start,end)];

            if(parseInt($(".pagination .active").text()) > 1 ){
                $(".prev-page").removeClass("disabled");
            }else{
                $(".prev-page").addClass("disabled");

            }

            if($(".pagination .active").text() >= $(".page-num").length){
                $(".next-page").addClass("disabled");
            }else{
                $(".next-page").removeClass("disabled");
            }

            console.log(parseInt($(".pagination .active").text()))


            // version 1 ---------XXXXXXX
            // switch (e.target.innerText) { 
            //     case '1': 
            //         newArr = [...result.slice(0,10)];
            //         break;
            //     case '2': 
            //         newArr = [...result.slice(10,20)];
            //         break;
            //     case '3': 
            //         newArr = [...result.slice(20,30)];
            //         break;	
            //     case '4': 
            //         newArr = [...result.slice(30,40)];
            //         break;		
            //     default:
            //         newArr = [...result.slice(0,10)];
            // }

            $('html, body').animate({
                scrollTop: $('.products-section').offset().top - 80
            });
            showData(newArr);
        })

      }})

      function showData(arrOfProducts){
        $(".products").html("");
        for(let prod of arrOfProducts){
            let product = `
                <div class="border-0 col-12 col-md-6 col-lg-3 card">
                        <a href="${prod.url}" target="_blank">
                            <img class="w-100" src="${prod.image}" alt="">
                        </a>
                        <div class="card-body p-1">
                            <p class="card-text fs-6 text-truncate mb-1">${prod.name}</p>
                            <h6 class="card-title mb-0">EUR ${prod.prices.priceEuro}</h6>
                            <div class="d-flex align-items-center gap-3">
                            <p class="card-title fs-6 text-muted text-decoration-line-through m-0">${prod.prices.oldPriceEuro !== undefined ? "EUR " + prod.prices.oldPriceEuro : ""}
                            </p>
                            <span class="bg-warning text-jumia bg-gradient px-1 rounded-1" style="--bs-bg-opacity: .3; font-size:12px;">${prod.prices.discount !== undefined ? prod.prices.discount : '0%'}</span>
                            </div>
                       
                        </div>
                        <div class="text-center my-2">
                            <button class="btn btn-jumia shadow w-100" data-bs-toggle="modal" data-bs-target="#${prod.url}">order now</button>
                        </div>
                    </div>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="${prod.url}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Please select a variation</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex justify-content-between align-items-center">
                            <div class="details">
                                <h6>${prod.name}</h6>
                                <p>EUR ${prod.prices.priceEuro}</p>
                            </div>

                            <div class="qty d-flex gap-2">
                                <button class="increase btn btn-jumia">+</button>
                                <span class="total">1</span>
                                <button class="decrease btn btn-jumia">-</button>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-around">
                            <button type="button" style="width:45%" class="btn btn-secondary" data-bs-dismiss="modal">Continue Shopping</button>
                            <button type="button" style="width:45%" class="btn btn-jumia">Add To Cart</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    `;
            $(".products").append(product)
        }
    }

    // //////////////////////////////////


    
    // custom-carousel function
    $(".custom-carousel").scrollLeft(0)
    let smallScreens = window.matchMedia("(max-width: 767px)");
    let mediumScreens = window.matchMedia("(min-width: 768px) and (max-width: 992px)");

    function CustomCarousel(smScreens){
        let cardWidth = $(".custom-carousel .card").outerWidth();
        let scrollBy = 0;
        let numOfScrollCards = 3;

        if(smScreens.matches){
            numOfScrollCards = 1;
            console.log("this is small")
            // wrap modal dialog in small screens
            $(".modal-dialog").wrap(`<div class="modal" id="filter" tabindex="-1"></div>`)
        }
        if(mediumScreens.matches){
            numOfScrollCards = 2;
            console.log("this is medium")
            $(".modal-dialog").wrap(`<div class="modal" id="filter" tabindex="-1"></div>`)
        }

        $(".next").on("click",function(){
            scrollBy += cardWidth;
            $(".custom-carousel").scrollLeft(scrollBy * numOfScrollCards)
        })
    
        $(".prev").on("click",function(){
            if(scrollBy - cardWidth >= 0){
                scrollBy -= cardWidth;
            }
            $(".custom-carousel").scrollLeft(scrollBy * numOfScrollCards)
        })
    }
    CustomCarousel(smallScreens);
    // //////////////////////////////////



    // check if user Logged in or not
    if(sessionStorage.getItem("user-info")){
        console.log(sessionStorage.getItem("user-info"))
        $("#logOut").removeClass("d-none")
        $("#signIn").addClass("d-none");
    
        $(".alert-success").addClass('show');
        $("#welcomeUser").html(JSON.parse(sessionStorage.getItem("user-info")).userName);
    }else{
        $("#logOut").addClass("d-none")
        $("#signIn").removeClass("d-none")
    }

    
    // Logging Out function
    $("#logOut").on("click",()=>{
        console.log("click")
        signOut(auth).then(() => {
            sessionStorage.removeItem("user-info");
            $("#logOut").addClass("d-none")
            $("#signIn").removeClass("d-none")

            $(".alert-success").removeClass('show');
            $(".alert-secondary").addClass('show');
            $("#byeUser").html(JSON.parse(sessionStorage.getItem("user-info")).userName);

        }).catch((error) => {
            console.log(error);
        });
    });
})