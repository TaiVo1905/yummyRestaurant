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
function addCart(){
    document.querySelectorAll('.btn_add').forEach(button => {
        // Gắn sự kiện onclick cho các nút "Thêm vào giỏ hàng"
        button.addEventListener('click', function() {
            // Lấy id của nút để gán cho foodID
            const foodID = this.id.split('-')[1]; 
            const foodQuantity = parseInt(document.querySelector(`#input_sl-${foodID}`).value);
            const foodNote = document.querySelector(`#input_note-${foodID}`).value;
            // Lấy dữ liệu món ăn từ mảng filtered
            const foodItem = filtered.find(item => item.id === foodID);
            const userID = sessionStorage.getItem('UserID');
            // Kiểm tra nếu chưa có userID tức là chưa đăng nhập
            if (!userID) {
                alert("Bạn chưa đăng nhập. Vui lòng đăng nhập trước khi thêm vào giỏ hàng!");
                return; // Thoát hàm nếu chưa đăng nhập
            }
            // Tạo một đối tượng chứa các thông tin sản phẩm
            const cartItem = {
                user_ID: userID,
                food_Name: foodItem.name,
                food_Image: foodItem.image_url,
                food_Price: foodItem.price,
                food_Number: foodQuantity,
                food_Note: foodNote
            };
            // Lấy dữ liệu giỏ hàng hiện tại từ localStorage
            const data = getDataLocalStorage();
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingItemIndex = data.carts.findIndex(item => item.food_Name === foodItem.name && item.user_ID === userID);
            if (existingItemIndex !== -1) {
                // Nếu sản phẩm đã có, cập nhật số lượng
                data.carts[existingItemIndex].food_Number += foodQuantity;
            } 
            else {
                // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
                data.carts.push(cartItem);
            // Đẩy dữ liệu lên localStorage
            setDataLocalStorage(data);
            // Hiển thị thông báo thêm thành công
            alert("Quý khách đã thêm món ăn vào giỏ hàng thành công!");
            }
        });
    });

}
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
addCart();
renderFeaturedDishes(allData);
handleCart();
handleLogAndRegModal();

// function search_menu(){  
//     const btn_search = document.getElementById('btn_search');
//     btn_search.addEventListener('click', function(){
//         const search_item = document.getElementById('search_input').value; 
//         const search_result = allData.menu.find(item => {
//             return item.name.toLowerCase() === search_item.toLowerCase(); // So sánh không phân biệt chữ hoa/thường
//         })

//         if(search_result){
//             // Lưu kết quả vào sessionStorage
//             sessionStorage.setItem('searchResult', JSON.stringify(search_result));
//             // Chuyển hướng sang trang searchResults.html
//             window.location.href = 'searchResults.html';
//         }
//         else{
//             // Hiển thị thông báo lỗi nếu không tìm thấy
//             document.getElementById('result').innerHTML = "Không tìm thấy sản phẩm trong hệ thống menu của nhà hàng YUMMY!";
//         }
//     });  
// }

handleLogAndRegModal();
renderFeaturedDishes(allData);
// search_menu();
