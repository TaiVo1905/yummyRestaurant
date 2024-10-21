import getDataLocalStorage, {setDataLocalStorage} from "./localStorage.js";
const data = getDataLocalStorage();
let filtered=[];

// định dạng cho class active hoạt động đúng như mong đợi (MẶC ĐỊNH)
function active(){
    document.querySelectorAll('#menu_list a').forEach(category => {
        category.addEventListener('click', function(e){
            e.preventDefault();
            document.querySelectorAll('#menu_list a').forEach(i => {
                i.classList.remove('active');
            })
            this.classList.add('active');
        });
    });
}

// Hamf chuyển sang trang chi tiết
function switchToDetals() {
    const productElements = document.querySelectorAll('.product_image, .product_name, .product_price');
    const trElements = document.querySelectorAll('tbody tr');
    productElements.forEach( (element) => {
        element.addEventListener('click', (e) => {
                for (const tr of trElements) {
                    if (tr.contains(e.target)) {
                        window.location.href = "./details.html";
                        sessionStorage.setItem('foodId', tr.querySelector('tr .btn_add').id.split('-')[1]);
                        return;
                    }
                }
        });
    });
}

// Hàm thêm món ăn vào giỏ hàng
function addToCart(filtered){
    document.querySelectorAll('.btn_add').forEach(button=>{
        // gắn sự kiện onclick cho các nút button "thêm vào giỏ hàng"
        button.addEventListener('click', function(){
            // lấy id của nút gán cho foodID
            const foodID = parseInt(this.id.split('-')[1]); 
            
            const foodQuantity = document.querySelector(`#input_sl-${foodID}`).value;
            const foodNote = document.querySelector(`#input_note-${foodID}`).value;
            console.log(foodNote)
            // lấy dữ liệu 
            
            const foodItem = filtered.find(item =>{
                return item.id == foodID;
            })
            const userID = parseInt(sessionStorage.getItem('UserID'));
            // kiểm tra nếu chưa có userID tức là chưa đăng nhập thành công
            if(!userID){
                const userConfirmed = confirm("Bạn chưa đăng nhập. Bạn có muốn đăng nhập hoặc đăng ký không?");
                if (userConfirmed) {
                        document.getElementById('logAndReg_modal').style.display = 'block';
                } else {
                    alert("Hãy đăng nhập để thêm món vào giỏ hàng.");
                }
            }
            else{
                const cartItem = {
                    "userId": userID,
                    "nameFood": foodItem.name,
                    "foodId": foodItem.id,
                    "type": foodItem.type,
                    "image_url": foodItem.image_url,
                    "price": foodItem.price,
                    "food_Qty": parseInt(foodQuantity),
                    "describe": foodItem.describe,
                    "food_Note": foodNote
                }
                // Kiểm tra xem có trong cart có chưa. Nếu có rồi thì tăng số lượng
                let itemIndex = data.carts.findIndex(item =>{
                    return item.foodId == foodItem.id && item.userId == userID;
                })
                console.log(cartItem.food_Note)
                if (itemIndex !== -1){
                    data.carts[itemIndex].food_Qty = parseInt(data.carts[itemIndex].food_Qty) + cartItem.food_Qty;
                    console.log(data.carts[itemIndex].food_Note, cartItem.food_Note)
                    if ((data.carts[itemIndex].food_Note !== "") && (cartItem.food_Note == "")) {
                        cartItem.food_Note = data.carts[itemIndex].food_Note;
                    } else {
                        data.carts[itemIndex].food_Note = cartItem.food_Note;
                    }
                    alert("Bạn thêm thành công!")
                }
                else{
                    data.carts.push(cartItem);
                    alert("Thêm thành công!")
                }
                document.querySelector(`#input_sl-${foodID}`).value = 1;
                document.querySelector(`#input_note-${foodID}`).value = "";
                setDataLocalStorage(data);
            }   
        })
    })
}

// Hàm hiển thị món ăn đã lọc
function displayFilteredMenu() {
    const menuTblBody = document.querySelector("#menu_tbl tbody");
    menuTblBody.innerHTML = ''; // Xóa nội dung cũ

    filtered.forEach(item => {
        menuTblBody.innerHTML += `
            <tr>
                <td class="product_image"><img src="${item.image_url}" alt="${item.name}" width="100px" height="100px"></td>
                <td class="product_name">${item.name}</td>
                <td class="product_price">${item.price}</td>
                <td>
                    <div id="number-input">
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" id="number_subtraction">-</button>
                        <input class="input_sl" id="input_sl-${item.id}" type="number" value="1" min="1" />
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="number_addition">+</button>
                    </div>
                </td>
                <td>
                    <textarea name="note" class="input_note" id="input_note-${item.id}" placeholder="Nhập ghi chú..."></textarea>
                </td>
                <td><button class="btn_add" id="btn_add-${item.id}">Thêm vào giỏ hàng</button></td>
            </tr> 
            `;
        });
        
    // Nếu không có món ăn nào phù hợp
        if (filtered.length === 0) {
            menuTblBody.innerHTML = `
                <tr>
                    <td colspan="6">Không có món nào thuộc loại này.</td>
                </tr>
            `;
        }
    addToCart(filtered);
    switchToDetals();
}

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

// Hàm lọc món ăn theo loại và hiển thị dưới dạng bảng
function filterMenu() {
    active();
    const menu = data.menu;
    const menu_list = document.querySelector('#menu_list');
    menu_list.addEventListener('click', (e) => {
        const type = e.target.textContent;
        // Lọc món ăn theo loại
        filtered = menu.filter(item => {
            return item.type.toLowerCase() === type.toLowerCase();
        });

        // Hiển thị menu theo loại đã lọc
        displayFilteredMenu();
    });
    // Thêm sự kiện cho nút tìm kiếm
    const searchButton = document.querySelector('#btn_search');
    const reset_Search = document.querySelector('#reset_search');
    searchButton.addEventListener('click', () => {
        reset_Search.style.display='block';
        const searchKey = document.getElementById('search_input').value.toLowerCase();
        filtered = filtered.filter(item => {
            return item.name.toLowerCase().includes(searchKey); // Tìm món ăn có chứa từ khóa 'thuộc tính "includes"
        });
        displayFilteredMenu();
    });
    // Thêm sự kiện cho nút reset tìm kiếm
    reset_Search.addEventListener('click', () => { // Reset lại tìm kiếm và làm mới menu
        window.location.href='./menu.html';
    });

}

/*sd hàm forEach để duyệt qua tất cả các thẻ a trong menu list
    thêm sự kiện click vào mỗi thẻ a
    chạy function: ngăn chặn các hành vi mặc định của thẻ a (như href)
    duyệt qua từng thẻ a một lần nữa:
    - Xóa class active trong các thẻ a khác
    - thêm class active vào thẻ a hiện tại (this.classList.add('active'))
*/

// Hàm chạy chương trình
function runPage() {
    document.addEventListener("DOMContentLoaded", () => {
        filterMenu();
        document.querySelector('#menu_list a').click(); // Luôn luôn hiển thị Những món khai vị khi load trang
    })
}

runPage();