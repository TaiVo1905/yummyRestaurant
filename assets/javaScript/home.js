import getDataLocalStorage from "../javaScript/localStorage.js";

const allData = getDataLocalStorage(); //tạo biến lưu data trả về từ hàm getDataLocalStorage ở file localStorage.js

function renderFeaturedDishes(data){
    const menuAllDish = document.getElementById('body-menu'); //nơi để đưa thông tin các món ăn vào
    data.featuredDishes.forEach(dish => { //duyệt từng phần tử trong featuredDishes
    menuAllDish.innerHTML += `
                              <div class="menu_card">
                                  <div class="card_dish">
                                      <img src="${dish.image_url}">
                                  </div>
                                  <h5>${dish.name}</h5>
                                  <h6>${dish.price}</h6>
                                  <button>Thêm vào giỏ hàng</button>
                              </div>
                              `;
    })
};
function handleLogAndRegModal() {
    const logAndReg = document.getElementById("logAndReg");
    const logAndReg_modal = document.getElementById("logAndReg_modal");
    logAndReg.addEventListener('click', (e) => {
        logAndReg_modal.style.display = 'block';
    })
    logAndReg_modal.addEventListener('click', (e) => {
        if(e.target === logAndReg_modal){
            logAndReg_modal.style.display = 'none';
        }
    })
}

function search_menu(){  
    const btn_search = document.getElementById('btn_search');
    btn_search.addEventListener('click', function(){
        const search_item = document.getElementById('search_input').value; 
        const search_result = allData.menu.find(item => {
            return item.name.toLowerCase() === search_item.toLowerCase(); // So sánh không phân biệt chữ hoa/thường
        })

        if(search_result){
            // Lưu kết quả vào sessionStorage
            sessionStorage.setItem('searchResult', JSON.stringify(search_result));
            // Chuyển hướng sang trang searchResults.html
            window.location.href = 'searchResults.html';
        }
        else{
            // Hiển thị thông báo lỗi nếu không tìm thấy
            document.getElementById('result').innerHTML = "Không tìm thấy sản phẩm trong hệ thống menu của nhà hàng YUMMY!";
        }
    });  
}

handleLogAndRegModal();
renderFeaturedDishes(allData);
search_menu();