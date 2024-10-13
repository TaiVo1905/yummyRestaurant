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
}
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
handleLogAndRegModal();
renderFeaturedDishes(allData);