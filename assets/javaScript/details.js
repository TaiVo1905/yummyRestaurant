import getDataLocalStorage from "../javaScript/localStorage.js";

const returnData = getDataLocalStorage(); //tạo biến lưu data trả về từ hàm getDataLocalStorage ở file localStorage.js

// function renderMenu(data){
//     const dish = document.getElementById('details_top'); //nơi để đưa thông tin các món ăn vào
//     data.menu.forEach(dishes => { //duyệt từng phần tử trong menu
//     dish.innerHTML += `
//                         <div class="details_top">
//                             <div class="details_img">
//                                 <img src="${dishes.image_url}" alt="">
//                             </div>
//                             <div class="details_introduce">
//                                 <span class="text1"><a href="../home.html">Trang Chủ </a>/${dishes.type}</span><br><br>
//                                 <span class="text2">${dishes.name}</span><br>
//                                 <hr>
//                                 <span class="price"><b>${dishes.price}<b></span>
//                                 <div class="quantity">
//                                     <div class="quantity_logo1">-</div>
//                                     <div class="quantity_logo2">1</div>
//                                     <div class="quantity_logo3">+</div>
//                                     <button><b>Thêm Vào Giỏ Hàng<b></button>
//                                 </div>
//                                 <br><span>Danh Mục: ${dishes.type}</span><br>
//                                 <hr><br>
//                                 <span>Mô Tả<br>
//                                     <div class="describe">${dishes.describe}</div>
//                                 </span>
//                             </div>
//                         </div>
//                         `;
//     })
// };
// renderMenu(returnData);
// ------------------------------------------------------------------------------------

// tạo dish chi tiết
function renderDishDetails(dish) {
    const dishDetails = document.getElementById('details_top');
    dishDetails.innerHTML = `
        <div class="details_top">
            <div class="details_img">
                <img src="${dish.image_url}" alt="">
            </div>
            <div class="details_introduce">
                <span class="text1"><a href="../home.html">Trang Chủ </a> / ${dish.type}</span><br><br>
                <span class="text2">${dish.name}</span><br>
                <hr>
                <span class="price"><b>${dish.price}<b></span>
                <div class="quantity">
                    <div class="quantity_logo1">-</div>
                    <div class="quantity_logo2">1</div>
                    <div class="quantity_logo3">+</div>
                    <button>Thêm Vào Giỏ Hàng</button>
                </div>
                <br><span>Danh Mục: ${dish.type}</span><br>
                <hr><br>
                <span>Mô Tả<br>
                    <div class="describe">${dish.describe}</div>
                </span>
            </div>
        </div>
    `;
}

// Cập nhật slider sau khi render
function updateDishSlider() {
    const sliderContent = document.getElementById('list_dish_content');
    const totalDishes = sliderContent.children.length;

    // Di chuyển slider để hiển thị 4 món ăn
    sliderContent.style.transform = `translateX(-${currentDishIndex * 25}%)`; // Di chuyển 25% mỗi lần
}


let currentDishIndex = 0;
// lấy danh sách các dish tương tự
function similarToDish(data) {
    const update = document.getElementById('list_dish_content');
    data.menu.forEach((dish) => {
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
                <button><b>Thêm Vào Giỏ Hàng<b></button>
            </div>
        `;
        
        dishElement.addEventListener('click', () => {
            renderDishDetails(dish); // Cập nhật nội dung chi tiết của món
        });

        update.appendChild(dishElement);
    });
    updateDishSlider(); // Cập nhật slider sau khi render
}
similarToDish(returnData);


// click để xem món trước
document.getElementById('prev_dish').addEventListener('click', () => {
    if (currentDishIndex > 0) {
        currentDishIndex--; // Giảm chỉ số món hiện tại
        updateDishSlider(); 
    }
});
// click để xem món sau
document.getElementById('next_dish').addEventListener('click', () => {
    const totalDishes = document.getElementById('list_dish_content').children.length;
    if (currentDishIndex < totalDishes - 4) { // Kiểm tra xem có đủ món để di chuyển không
        currentDishIndex++; // Tăng chỉ số món hiện tại
        updateDishSlider(); 
    }
});







