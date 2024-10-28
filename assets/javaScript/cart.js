import {getDataLocalStorage, setDataLocalStorage} from "./localStorage.js";
const data = getDataLocalStorage(); // Lấy dữ liệu từ localStorage
const paymentSuccessful = document.querySelector('.order_success_modal');
const paymentButton = document.querySelector('.payment_button');
const payment_modal = document.querySelector('#payment_modal');

//Hiển thị sản phẩm 
function displayCart(data){
    const user_ID = parseInt(sessionStorage.getItem('UserID'));
    const carts = data.carts;
     // Truy xuất đến phần tử có ID 'menu_body'
     const cartTable = document.getElementById('menu_body');
     cartTable.innerHTML = ""; // Xóa các sản phẩm hiện tại trong giỏ hàng

    // Tìm sản phẩm người dùng đang đăng nhập
    const cart_item = carts.filter(cart => {
        return cart.userId == user_ID;
    })

    cart_item.forEach(item => {
    // Nội dung HTML của từng dòng sản phẩm
        cartTable.innerHTML += `
                                <tr class="cart_form_products">
                                    <!-- Xoá sản phẩm đã thêm vào giỏ hàng -->
                                    <td class="product_remove">
                                        <a href="#" class="remove"><i class="fa-regular fa-circle-xmark item_remove"></i></a>
                                    </td>   
                                    <td class="product_image appear">
                                        <div class="image"><img src="${item.image_url}" style="width: 80px; height: 80px;" alt="${item.nameFood}"></div>
                                    </td>
                                    <td class="product_name appear">
                                        <div id = "${item.foodId}">${item.nameFood}</div>
                                    </td>
                                    <td class="product_price appear">
                                        <div id= "${item.id}">${item.price}</div>				
                                    </td>
                                    <!-- Tăng giảm số lượng đơn hàng -->
                                    <td class="product_quantity">
                                        <div class="quantity buttons_added">
                                            <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" id="number_subtraction" value="-">
                                            <input type="number" value="${item.food_Qty}" id="number_step" min="1">
                                            <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="number_addition" value="+">
                            
                                        </div>
                                    </td>
                                    <td>
                                    <textarea class="input_note" placeholder="Nhập ghi chú tại đây...">${item.food_Note}</textarea>
                                    </td>
                                    <td class="product_subtotal">${item.price}				
                                    </td>
                                </tr>
                            `;
    });
}

// Lưu sản phẩm để hiển thị ở trang chi tiết
function getFoodId(){
    const productElements = document.querySelectorAll('.product_image, .product_name, .product_price');
    const trElements = document.querySelectorAll('.cart_form_products');
    productElements.forEach( (element) => {
        element.addEventListener('click', (e) => {
            const isHeader = e.target.closest('th'); // Kiểm tra xem có phải nhấp vào tiêu đề (thead) không
            if (!isHeader) {// Nếu nhấp vào tiêu đề, không chuyển hướng/
                for (const tr of trElements) {
                    if (tr.contains(e.target)) {
                        console.log(tr.querySelector('.product_name > div').id)
                        window.location.href = "./details.html";
                        sessionStorage.setItem('foodId', tr.querySelector('.product_name div').id);
                        return;
                    }
                }
            }
        });
    });
}

// Hàm cập nhật tổng tạm tính và tổng giá
function updateCart() {
    const cartRows = document.querySelectorAll('.cart_form_products');
    let total = 0;
    //Chạy qua các row
    cartRows.forEach(function(row) {
        const priceElement = row.querySelector('.product_price');
        const quantityElement = row.querySelector('.product_quantity input[type=number]');
        const subtotalElement = row.querySelector('.product_subtotal');

        //Thay đổi 'đ' thành khoảng trắng để lấy số và tính tổng
        const price = parseFloat(priceElement.innerText.replace('đ', '').replace(',', ''));
        const quantity = quantityElement.value;
        const subtotal = price * quantity;
        const food_name = row.querySelector('.product_name div').innerText;
        const user_ID = parseInt(sessionStorage.getItem('UserID'));
        //Khi tính tổng xong chuyển sang dạng chuỗi để thêm chữ 'đ
        subtotalElement.innerText = subtotal.toLocaleString() + 'đ';    
        
        total += subtotal;
        //Lưu giữ liệu khi có thay đổi
        const itemIndex = data.carts.findIndex(item =>{
            return (item.nameFood == food_name) && (item.userId == user_ID);
        })
        data.carts[itemIndex].food_Qty = quantity;
        data.carts[itemIndex].food_Note = row.querySelector('.input_note').value;
    });

    document.querySelector('.cart_total').innerText = total.toLocaleString() + 'đ';
    document.querySelector('.sum_total').innerText = total.toLocaleString() + 'đ';
    setDataLocalStorage(data);   
}

//Hàm kiểm tra nếu giỏ hàng trống
function checkIfCartIsEmpty() {
    const cartRows = document.querySelectorAll('.cart_form_products');
    if(cartRows.length === 0) {
        // Ẩn phần giỏ hàng và hiển thị thông báo trống
        document.querySelector('.cart_container').style.display = 'none';

        // //Hiển thị thông báo
        const announcementCart = document.getElementById('cart_announcement');
        announcementCart.innerHTML = 'Chưa có sản phẩm nào trong giỏ hàng.';
        announcementCart.style.display = 'block';//Hiển thị thông báo.
    } else {
        document.getElementById('cart_announcement').style.display = 'none';
        document.querySelector('.cart_container').style.display = 'flex';
    }
    countUniqueItemsInCart();
}

// hàm xoá sản phẩm khỏi giỏ hàng
function removeCartItem(event) {
    const buttonClicked = event.target;
    const cartRow = buttonClicked.closest('tr'); // Lấy dòng sản phẩm (row)
    const foodId = cartRow.querySelector('.product_name div').id; // Lấy tên sản phẩm

    // Xóa sản phẩm khỏi localStorage
    const updatedCartLocalStorage = data.carts.filter(cart => cart.foodId != foodId);
    data.carts = updatedCartLocalStorage;// Cập nhật data
    setDataLocalStorage(data); //Cập nhật lại localStrorage

    cartRow.remove();
    updateCart();
    checkIfCartIsEmpty();
    setMtopFooter()

    // Hiển thị thông báo tùy chỉnh
    const notification = document.getElementById('delete_notification');
    notification.innerHTML = `<i class="fa-solid fa-check notification_check"></i> “${cartRow.querySelector('.product_name div').innerText}” đã xoá.`; // Thêm tên sản phẩm vào thông báo
    notification.style.display = 'block';

    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000); // Ẩn thông báo sau 1 giây
    countUniqueItemsInCart();
}

// Hàm thêm sự kiện lắng nghe cho các nút xoá
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.item_remove');
    removeButtons.forEach(function(button) {
        button.addEventListener('click', removeCartItem);
    });
}


// Hàm xử lý khi thay đổi số lượng  đổi giá ngay lập tức
function setupQuantityButtons() {
    const quantityInputs = document.querySelectorAll('.product_quantity input[type=number]');
    const additionButtons = document.querySelectorAll('#number_addition');
    const subtractionButtons = document.querySelectorAll('#number_subtraction');
    const food_notes = document.querySelectorAll('.input_note');

    quantityInputs.forEach(function(input) {
        input.addEventListener('change', updateCart);
    });

    additionButtons.forEach(function(button) {
        button.addEventListener('click', updateCart);
    });

    subtractionButtons.forEach(function(button) {
        button.addEventListener('click', updateCart);
    });

    food_notes.forEach((note_row) => {
        note_row.addEventListener ('change', updateCart)
    })
}

function setMtopFooter() {
    const isCart = data.carts.find( (cart) => {
        return sessionStorage.getItem('UserID') == cart.userId;
    })
    if (isCart) {
        document.querySelector('.footer').style.marginTop = '0';
    } else {
        document.querySelector('.footer').style.marginTop = '585px';
    }
}

//Lấy thông tin khách hàng đã đăng ký từ localstorage sau đó hiển thị lên form thông tin khách hàng
function getInformationLocalStorage() {
    const users = data.users; // Lấy mảng người dùng từ localStorage
    const user_ID = parseInt(sessionStorage.getItem('UserID')); // Lấy ID người dùng từ sessionStorage
    const existingUser = users.find(user => user.id === user_ID); // Tìm người dùng dựa theo ID
        document.querySelector('.payment_firstName').value = existingUser.firstName;
        document.querySelector('.payment_lastName').value = existingUser.lastName;
        document.querySelector('.payment_email').value = existingUser.email;
        document.querySelector('.payment_phoneNumber').value = existingUser.phoneNum || ''; // Trường hợp người dùng chưa nhập phone
}

// Xử lý payment
function handleDisplayPaymentModal () {
    const payment_modal = document.querySelector('#payment_modal');
    const sub_payment = document.querySelector('.sub_payment');
    const paymentForm = document.querySelector('#paymentForm');

    //Hiển thị model khi bấm nút thanh toán
    sub_payment.addEventListener('click', function (e) {
        e.preventDefault();
        payment_modal.style.display = 'block';
        getInformationLocalStorage();
    })

    //Ẩn model khi bấm ra ngoài form
    payment_modal.addEventListener('click', function (e) {
        if(e.target !== paymentForm && !paymentForm.contains(e.target)){
            payment_modal.style.display = 'none';

        }
    })
}

// Hàm Xử lý dặt hàng
function handleOrder(){
    document.querySelector('#paymentfrm').addEventListener( 'submit', (e) => {
        e.preventDefault();
        const user_id = parseInt(sessionStorage.getItem('UserID'));
        const cart_userID = data.carts.filter(item => item.userId === user_id);
        payment_modal.style.display='none';
        paymentSuccessful.style.display='block';
        const firstName = document.querySelector('.payment_firstName').value;
        const lastName = document.querySelector('.payment_lastName').value;
        const customerName = firstName + " " + lastName;
        const email = document.querySelector('.payment_email').value;
        const phoneNumber = document.querySelector('.payment_phoneNumber').value; 
        const address = document.querySelector('.payment_address').value; 
        const food_Name = cart_userID.map(item=> item.nameFood + ` (${item.food_Qty})`)
        const amount = document.querySelector('.sum_total').innerText;
    
        const newOrder = {
            'id': data.orders.length + 1,
            'foodName': food_Name,
            'amount': amount,
            'time': new Date().toLocaleString(),
            'customerName': customerName,
            'phoneNumber': phoneNumber,
            'address': address
        }
    
        data.orders.push(newOrder);
        setDataLocalStorage(data);
        sendMailOrder(customerName, email, amount, data);
        // Xóa dữ liệu trong carts
        data.carts = data.carts.filter(item => item.userId !== user_id);
        setDataLocalStorage(data);
    
        // ẩn form quay về trang menu
        const successfullyorder_btn = document.querySelector('.successfullyOder_button');
        successfullyorder_btn.addEventListener('click', function(){
            paymentSuccessful.style.display='none';
            window.location.href='./menu.html';
        })
        countUniqueItemsInCart();
    })
}

// Khởi tạo sự kiện lắng nghe khi tài liệu được tải xong
function runPage(data) {
    document.addEventListener('DOMContentLoaded', function() {
        if(window.location.pathname == '/cart.html' || window.location.pathname == '/yummyRestaurantWebsite/cart.html') {
            (function () {
                emailjs.init({
                    publicKey: 'RLQrS8shW-Hgt9gSp',
                });
            })()
            displayCart(data);
            setupRemoveButtons();
            setupQuantityButtons();
            updateCart();
            checkIfCartIsEmpty();
            setMtopFooter();
            getFoodId();
            handleDisplayPaymentModal();
            handleOrder();
        }
    });
}

runPage(data);

  


/* ------------------------------------cập nhật số lượng món ăn trong giỏ hàng-----------------------------------------*/
// Hàm đếm số lượng món ăn trong giỏ hàng
export function countUniqueItemsInCart() {
    const data = getDataLocalStorage(); // Cập nhật data theo thời gian thực;
    const user_ID = parseInt(sessionStorage.getItem('UserID')); // lấy user ID từ sessionStorage
    const cartItems = data.carts.filter(cart => cart.userId == user_ID); // lọc món ăn thuộc về user hiện tại
    document.querySelector('#quantity_cart').innerText = cartItems.length; // trả về số lượng món ăn trong giỏ
}


function sendMailOrder(customerNameame, email, amounT, data) {
    const userId = parseInt(sessionStorage.getItem('UserID'));
    let mess = "";
    let dem = 1;
    data.carts.forEach ( (cart) => {
        if (userId == cart.userId) {
            mess += `${dem}. ${cart.nameFood} - ${cart.food_Qty} - ${(cart.food_Qty * parseInt(cart.price.replace('đ', '').replace(',', ''))).toLocaleString()}đ\n`;
            dem++;
        }
    })
    const info = {
        to_name: customerNameame,
        to_email: email,
        message: mess,
        amount: amounT
    }

    emailjs.send('service_v65g29u', 'template_72ggs8a', info);
}