import getDataLocalStorage, { setDataLocalStorage } from "../javaScript/localStorage.js";
const allData = getDataLocalStorage(); // Tạo biến lưu data trả về từ hàm getDataLocalStorage ở file localStorage.js
function renderFeaturedDishes(data) {
    const menuAllDish = document.getElementById('body-menu'); // Nơi để đưa thông tin các món ăn vào
    data.featuredDishes.forEach(dish => { // Duyệt từng phần tử trong featuredDishes
        menuAllDish.innerHTML += `
            <div class="menu_card">
                <div class="card_dish">
                    <img src="${dish.image_url}">
                </div>
                <h5>${dish.name}</h5>
                <h6>${dish.price}</h6>
                <button class="add_to_cart" data-name="${dish.name}">Thêm vào giỏ hàng</button>
            </div>
        `;
    });
}
 // Đảm bảo biến carts đã được khai báo
function handleCart() {
    const data = allData.featuredDishes;
    document.querySelectorAll('.add_to_cart').forEach(button => {
        button.addEventListener('click', function () {
            const food_Name = this.getAttribute('data-name');
            const user_ID = parseInt(sessionStorage.getItem('UserID'));
            if (!user_ID) {
                const users_confirm = confirm("Bạn chưa đăng nhập. Bạn có muốn đăng nhập hoặc đăng ký không?");
                if (users_confirm) {
                    document.getElementById('logAndReg_modal').style.display = 'block';
                } else {
                    alert("Hãy đăng nhập để thêm món vào giỏ hàng.");
                }
            } else {
                const food_Items = data.find(dish => dish.name == food_Name);
                if (food_Items) {
                    const cartItem = {
                        "id": user_ID,
                        "nameFood": food_Items.name,
                        "type": food_Items.type,
                        "image_url": food_Items.image_url,
                        "price": food_Items.price,
                        "food_Qty": 1,
                        "describe": food_Items.describe,
                    };
                    allData.carts.push(cartItem);
                    setDataLocalStorage(allData); // Lưu giỏ hàng vào localStorage
                    alert('Bạn đã thêm món vào giỏ hàng thành công');
                } else {
                    alert('Món ăn không tồn tại trong danh sách.');
                    
                }
            }
        });
    });
}

function handleLogAndRegModal() {
    const logAndReg = document.getElementById("logAndReg");
    const logAndReg_modal = document.getElementById("logAndReg_modal");
    logAndReg.addEventListener('click', (e) => {
        logAndReg_modal.style.display = 'block';
    });
    logAndReg_modal.addEventListener('click', (e) => {
        if (e.target === logAndReg_modal) {
            logAndReg_modal.style.display = 'none';
        }
    });
}
// Render món ăn
renderFeaturedDishes(allData);
handleCart();
handleLogAndRegModal();
