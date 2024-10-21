import getDataLocalStorage from "./localStorage.js";

const returnData = getDataLocalStorage(); //tạo biến lưu data trả về từ hàm getDataLocalStorage ở file localStorage.js
let currentDishIndex = 0;

// Hàm hiển thị thông tin món ăn chi tiết
function renderDishDetails(data) {
    const foodId = sessionStorage.getItem('foodId');
    const dish = data.menu.find( (food) => {
        return food.id == parseInt(foodId);
    })
    const dishDetails = document.getElementById('details_top');
    dishDetails.innerHTML = `
            <div class="details_img">
                <img src="${dish.image_url}" alt="">
            </div>
            <div class="details_introduce">
                <span class="text1"><b id="foodType">${dish.type}<b></span><br><br>
                <span class="text2">${dish.name}</span><br>
                <hr>
                <span class="price"><b>${dish.price}<b></span>
                <div class="quantity">
                    <div id="number-input">
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" id="number_subtraction">-</button>
                        <input class="input_sl" id="input_sl-${dish.id}" type="number" value="1" min="1" />
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="number_addition">+</button>
                    </div>
                    <button id="addCart">Thêm Vào Giỏ Hàng</button>
                </div>
                <br><span>Danh Mục: ${dish.type}</span><br>
                <hr><br>
                <span>Mô Tả<br>
                    <div class="describe">${dish.describe}</div>
                </span>
            </div>
    `;
    similarToDish(data);
}

// Cập nhật slider sau khi render
function updateDishSlider(currentDishIndex) {
    const sliderContent = document.getElementById('list_dish_content');
    // Di chuyển slider để hiển thị 4 món ăn
    sliderContent.style.transform = `translateX(-${currentDishIndex * 25}%)`; // Di chuyển 25% mỗi lần
}


// lấy danh sách các dish tương tự
function similarToDish(data) {
    const update = document.getElementById('list_dish_content');
    data.menu.forEach((dish) => {
        if (dish.type == document.getElementById('foodType').innerText){
            const dishElement = document.createElement('div');
            dishElement.className = 'list_dish'; /*đặt tên class để css*/
            dishElement.innerHTML = `
                <div class="dish">
                    <div class="dish1">
                        <img src="${dish.image_url}" alt="">
                    </div>
                    <h6>${dish.type}</h6>
                    <h5>${dish.name}</h5>
                    <span><b>${dish.price}<b></span><br>
                    <button id=${dish.id}><b>Thêm Vào Giỏ Hàng<b></button>
                </div>
            `;
        update.appendChild(dishElement);
        }
    });
    document.querySelectorAll('.list_dish').forEach( (card) => {
        card.addEventListener('click', (e) => {
            if (e.target != card.querySelector('button')){
                sessionStorage.setItem('foodId', card.querySelector('button').id);
                window.location.href = "./details.html";
            }
        })
    })
    updateDishSlider(currentDishIndex); // Cập nhật slider sau khi render
}



function handleListFood(currentDishIndex) {
    // click để xem món trước
    document.getElementById('prev_dish').addEventListener('click', () => {
        if (currentDishIndex > 0) {
            currentDishIndex--; // Giảm chỉ số món hiện tại
            updateDishSlider(currentDishIndex); 
        }
    });

    // click để xem món sau
    document.getElementById('next_dish').addEventListener('click', () => {
        const totalDishes = document.getElementById('list_dish_content').children.length;
        if (currentDishIndex < totalDishes - 4) { // Kiểm tra xem có đủ món để di chuyển không
            currentDishIndex++; // Tăng chỉ số món hiện tại
            updateDishSlider(currentDishIndex); 
        }
    });
}

// Hàm chạy chương trình
function runPage() {
    document.addEventListener('DOMContentLoaded', () => {
        renderDishDetails(returnData);
        handleListFood(currentDishIndex);
    });

}

runPage();