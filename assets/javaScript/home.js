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
                <button class="add_to_cart" id="${dish.id}">Thêm vào giỏ hàng</button>
            </div>
        `;
    });
}
function handleCart() {
    const data = allData.featuredDishes;
    document.querySelectorAll('.add_to_cart').forEach(button => {
        button.addEventListener('click', function () {
            const foodId = parseInt(this.id);
            const user_ID = parseInt(sessionStorage.getItem('UserID'));
            if (!user_ID) {
                const users_confirm = confirm("Bạn chưa đăng nhập. Bạn có muốn đăng nhập hoặc đăng ký không?");
                if (users_confirm) {
                    document.getElementById('logAndReg_modal').style.display = 'block';
                } else {
                    alert("Hãy đăng nhập để thêm món vào giỏ hàng.");
                }
            } else {
                const food_Item = data.find(dish => dish.id == foodId);
                if (food_Item) {
                    const cartItem = {
                        "id": user_ID,
                        "nameFood": food_Item.name,
                        "foodId": food_Item.id,
                        "type": food_Item.type,
                        "image_url": food_Item.image_url,
                        "price": food_Item.price,
                        "food_Qty": 1,
                        "describe": food_Item.describe,
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
function switchToDetailPage() {
    const menu_cards = document.querySelectorAll(".menu_card");
    menu_cards.forEach( (menu_card) => {
        menu_card.addEventListener("click", (e) => {
            console.log(e)
            if(e.target.className != "add_to_cart") {
                sessionStorage.setItem('foodId', menu_card.querySelector(".add_to_cart").id);
                location.href = "details.html"
            }
        })
    })
        
}
// Render món ăn

renderFeaturedDishes(allData);
handleCart();
handleLogAndRegModal();
// import countUniqueItemsInCart from "../javaScript/cart.js";
switchToDetailPage();

