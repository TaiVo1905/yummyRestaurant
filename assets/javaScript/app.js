import getDataLocalStorage, {setDataLocalStorage} from "./localStorage.js";
const data = getDataLocalStorage(); // Tạo biến lưu data trả về từ hàm getDataLocalStorage ở file localStorage.js

// Hàm hiển thị món ăn nổi bật
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

// Hàm thêm món ăn vào giỏ hàng
function handleCart(data) {
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
                const food_Item = data.featuredDishes.find(dish => dish.id == foodId);
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
                data.carts.push(cartItem);
                setDataLocalStorage(data); // Lưu giỏ hàng vào localStorage
                alert('Bạn đã thêm món vào giỏ hàng thành công');
            }
        });
    });
}

// Hàm chuyển sang page detail
function switchToDetailPage() {
    const menu_cards = document.querySelectorAll(".menu_card");
    menu_cards.forEach( (menu_card) => {
        menu_card.addEventListener("click", (e) => {
            console.log(e)
            if(e.target.className != "add_to_cart") {
                sessionStorage.setItem('foodId', menu_card.querySelector(".add_to_cart").id);
                window.location.href = "./details.html"
            }
        })
    })
        
}

//Lấy thông tin khách hàng đã đăng ký từ localstorage sau đó hiển thị lên form thông tin khách hàng
function getInformation() {
    const users = data.users; // Lấy mảng người dùng từ localStorage
    const user_ID = parseInt(sessionStorage.getItem('UserID')); // Lấy ID người dùng từ sessionStorage
    const user_exist = users.find(user => user.id === user_ID); // Tìm người dùng dựa theo ID

    if (user_exist) {
        // Nếu tìm thấy người dùng, điền thông tin vào form
        document.querySelector('.information_firstName').value = user_exist.lastName;
        document.querySelector('.information_lastName').value = user_exist.firstName;
        document.querySelector('.information_email').value = user_exist.email;
        document.querySelector('.information_phoneNumber').value = user_exist.phoneNum || ''; // Trường hợp người dùng chưa nhập phone
    }
}
// Khi click vào biểu tượng con người
function handleIconClick() {
    const logAndReg = document.getElementById("logAndReg");
    const logAndRegModal = document.querySelector('.logAndReg_modal');
    const personalInformation = document.querySelector('.personalInformation_modal');
    logAndReg.addEventListener('click', () => {
        const userid = parseInt(sessionStorage.getItem('UserID')); // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (userid) {
            // personal_information(); // Nếu đã đăng nhập, hiển thị thông tin cá nhân
            logAndRegModal.style.display = 'none';
            personalInformation.style.display = 'block'; // Hiển thị form thông tin cá nhân
            getInformation(); // Lấy thông tin người dùng để điền vào form
        } else {
            logAndRegModal.style.display = 'block'; // Nếu chưa đăng nhập, hiển thị modal đăng nhập
        }
    });
    // Click vào nút đổi mật khẩu
    const password_btn = document.querySelector('.password_button');
    const changePassword = document.querySelector('.changePassword_modal');
    password_btn.addEventListener('click',(e) => {
        e.preventDefault();
        personalInformation.style.display = 'none';
        changePassword.style.display='block';

        // click vào nút cập nhật
        document.querySelector('.update_button').addEventListener('click', (e) => {
            e.preventDefault();
            const user_ID = parseInt(sessionStorage.getItem('UserID'));
            const oldPassword = document.querySelector('.password_current').value;
            const newPassword = document.querySelector('.password_new').value;
            const confirmPassword = document.querySelector('.password_newConfirm').value;

            // Lấy thông tin user từ localStorage
            const users = data.users;
            const User = users.find(user => user.id === user_ID);

            if (User.pass === oldPassword) {
                if (newPassword === confirmPassword) {
                    // Cập nhật mật khẩu mới
                    User.pass = newPassword;
                    setDataLocalStorage(data); // Lưu lại vào localStorage
                    console.log(data);
                    alert('Đổi mật khẩu thành công!');
                    changePassword.style.display = 'none';
                } else {
                    alert('Mật khẩu xác nhận không khớp!');
                }
            } else {
                alert('Mật khẩu cũ không đúng!');
            }
        });
        
        // click vào nút hủy
        const cancel = document.querySelector('.cancel_button');
        cancel.addEventListener('click', () => {
            changePassword.style.display='none';
        });
        });
    };

    // click vào nút đăng xuất
    const logout = document.querySelector('.logout_button');
    logout.addEventListener('click', ()=>{
        sessionStorage.removeItem('UserID');
        alert('Bạn đã đăng xuất thành công!')
        changePassword.style.display='none';
    });

// Hàm chạy chương trình
function runPage(data) {
    document.addEventListener('DOMContentLoaded', () => {
        renderFeaturedDishes(data);
        handleCart(data);
        switchToDetailPage();
        handleIconClick();
    })
}

runPage(data);