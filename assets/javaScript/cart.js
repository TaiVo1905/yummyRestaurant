//Lấy dữ liệu từ json
import getDataLocalStorage, {setDataLocalStorage} from "../javaScript/localStorage.js";
const data = getDataLocalStorage();
console.log(data)

//Hiển thị sản phẩm 
function displayCart(data){
    const user_ID = parseInt(sessionStorage.getItem('UserID'));
    const carts = data.carts;
     // Truy xuất đến phần tử có ID 'menu_body'
     const cartTable = document.getElementById('menu_body');
     cartTable.innerHTML = ""; // Xóa các sản phẩm hiện tại trong giỏ hàng

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
                                    <div>${item.nameFood}</div>
                                </td>
                                <td class="product_price appear">
                                    <div>${item.price}</div>				
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

//Lấy dữ liệu từ JSON
displayCart(data)

function onclickProduct(event) {
    // Kiểm tra nếu sự kiện xảy ra từ một phần tử sản phẩm
    const productElement = event.target.closest('.product_image, .product_name, .product_price');
    const isHeader = event.target.closest('th'); // Kiểm tra xem có phải nhấp vào tiêu đề (thead) không

    if (!isHeader && productElement) {// Nếu nhấp vào tiêu đề, không chuyển hướng/
        window.location.href = "details.html";
    }
      
}

      /*
        event.target: Trả về phần tử cụ thể mà người dùng đã nhấp vào.
        .closest(selector): Phương thức này tìm kiếm trong chuỗi các phần tử cha gần nhất cho phần tử mà đã được nhấp vào
        (trong trường hợp này là event.target). Nếu phần tử đó khớp với bất kỳ phần tử nào trong chuỗi .product_image, 
        .product_name, hoặc .product_price, nó sẽ trả về phần tử đó. Nếu không, nó sẽ trả về null.
         */


// Thêm sự kiện 'click' cho các sản phẩm sau khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    const productElements = document.querySelectorAll('.product_image, .product_name, .product_price');
    
    productElements.forEach(function(element) {
        element.addEventListener('click', onclickProduct);
    });
});

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
        const price = parseFloat(priceElement.innerText.replace('đ', '').replace('.', ''));
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
}

// hàm xoá sản phẩm khỏi giỏ hàng
function removeCartItem(event) {
    const buttonClicked = event.target;
    const cartRow = buttonClicked.closest('tr'); // Lấy dòng sản phẩm (row)
    const productName = cartRow.querySelector('.product_name div').innerText; // Lấy tên sản phẩm

    // Xóa sản phẩm khỏi localStorage
    const updatedCartLocalStorage = data.carts.filter(cart => cart.nameFood !== productName);
    data.carts = updatedCartLocalStorage;// Cập nhật data
    setDataLocalStorage(data); //Cập nhật lại localStrorage

    cartRow.remove();
    updateCart();
    checkIfCartIsEmpty();
    setMtopFooter()

    // Hiển thị thông báo tùy chỉnh
    const notification = document.getElementById('delete_notification');
    notification.innerHTML = `<i class="fa-solid fa-check notification_check"></i> “${productName}” đã xoá.`; // Thêm tên sản phẩm vào thông báo
    notification.style.display = 'block';

    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000); // Ẩn thông báo sau 1 giây
    
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
    console.log(isCart)
    if (isCart) {
        document.querySelector('.footer').style.marginTop = '0';
    } else {
        document.querySelector('.footer').style.marginTop = '490px';
    }
}


// Khởi tạo sự kiện lắng nghe khi tài liệu được tải xong
document.addEventListener('DOMContentLoaded', function() {
    setupRemoveButtons();
    setupQuantityButtons();
    updateCart();
    checkIfCartIsEmpty();
    setMtopFooter()
});

// xử lý form đăng nhập
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

handleLogAndRegModal()


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



//Lấy thông tin khách hàng đã đăng ký từ localstorage sau đó hiển thị lên form thông tin khách hàng
function getInformationLocalStorage() {
    const users = data.users; // Lấy mảng người dùng từ localStorage
    const user_ID = parseInt(sessionStorage.getItem('UserID')); // Lấy ID người dùng từ sessionStorage
    const existingUser = users.find(user => user.id === user_ID); // Tìm người dùng dựa theo ID

    if (existingUser) {
        // Nếu tìm thấy người dùng, điền thông tin vào form
        document.querySelector('.payment_firstName').value = existingUser.firstName;
        document.querySelector('.payment_lastName').value = existingUser.lastName;
        document.querySelector('.payment_email').value = existingUser.email;
        document.querySelector('.payment_phoneNumber').value = existingUser.phoneNum || ''; // Trường hợp người dùng chưa nhập phone
    } else {
        alert('Không tìm thấy thông tin người dùng!');
    }
}


handleDisplayPaymentModal();
  
// localStorage.clear() //Hiển thị lại sản phẩm


/* ------------------------------------cập nhật số lượng món ăn trong giỏ hàng-----------------------------------------*/
// Hàm đếm số lượng món ăn trong giỏ hàng
function countUniqueItemsInCart() {
    const user_ID = parseInt(sessionStorage.getItem('UserID')); // lấy user ID từ sessionStorage
    const cartItems = data.carts.filter(cart => cart.userId == user_ID); // lọc món ăn thuộc về user hiện tại
    return cartItems.length; // trả về số lượng món ăn trong giỏ
}

// Hàm để xóa món ăn khỏi giỏ hàng và trừ số lượng món ăn
function removeItemFromCart(itemId) {
    const user_ID = parseInt(sessionStorage.getItem('UserID')); // Lấy user ID từ sessionStorage
    const cartIndex = data.carts.findIndex(cart => cart.userId == user_ID && cart.itemId == itemId); // Tìm index của món ăn cần xóa

    if (cartIndex !== -1) {
        data.carts.splice(cartIndex, 1); // xóa món ăn khỏi giỏ hàng
        updateCartQuantity(); // cập nhật số lượng món ăn hiển thị trên logo giỏ hàng
    } 
}

// Hàm cập nhật số lượng món ăn hiển thị trên logo giỏ hàng
function updateCartQuantity() {
    const updatedCount = countUniqueItemsInCart(); // đếm lại số lượng món ăn
    document.getElementById('quantity_cart').innerText = updatedCount; // hiển thị số lượng mới trên logo giỏ hàng
}

// Gọi hàm đếm số lượng món ăn trong giỏ hàng và hiển thị 
const totalUniqueItems = countUniqueItemsInCart();
console.log(totalUniqueItems); // in ra số lượng món ăn
document.getElementById('quantity_cart').innerText = totalUniqueItems; // hiển thị số lượng món ăn trên logo giỏ hàng












