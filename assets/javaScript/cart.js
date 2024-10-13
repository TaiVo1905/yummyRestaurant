//Lấy dữ liệu từ json
import getDataLocalStorage, {setDataLocalStorage} from "../javaScript/localStorage.js";
const data = getDataLocalStorage()


function displayCart(data){
     // Truy xuất đến phần tử có ID 'menu_body'
     const cartTable = document.getElementById('menu_body');
     cartTable.innerHTML = ""; // Xóa các sản phẩm hiện tại trong giỏ hàng

    data.carts.forEach(cart => {
    // Nội dung HTML của từng dòng sản phẩm
    cartTable.innerHTML += `
                <tr class="cart_form_products">
                      <!-- Xoá sản phẩm đã thêm vào giỏ hàng -->
                      <td class="product_remove">
                          <a href="#" class="remove"><i class="fa-regular fa-circle-xmark item_remove"></i></a>
                      </td>
                      <td class="product_image appear">
                          <a href="details.html" class="image"><img src="${cart.image_url}" style="width: 80px; height: 80px;" alt="${cart.nameFood}"></a>
                      </td>
                      <td class="product_name appear">
                          <a href="details.html">${cart.nameFood}</a>
                      </td>
                      <td class="product_price appear">
                          <a href="details.html">${cart.price}</a>				
                      </td>
                      <!-- Tăng giảm số lượng đơn hàng -->
                      <td class="product_quantity">
                          <div class="quantity buttons_added">
                              <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" id="number_subtraction" value="-">
                              <input type="number" value="1" id="number_step" min="1">
                              <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="number_addition" value="+">
              
                          </div>
                      </td>
                      <td class="product_subtotal appear">${cart.price}				
                      </td>
                </tr>
      `;
    });
}

displayCart(data)



// Hàm cập nhật tổng tạm tính và tổng giá
function updateCartTotal() {
    const cartRows = document.querySelectorAll('.cart_form_products');
    let total = 0;
    cartRows.forEach(function(row) {
        const priceElement = row.querySelector('.product_price');
        const quantityElement = row.querySelector('.product_quantity input[type=number]');
        const subtotalElement = row.querySelector('.product_subtotal');
        
        const price = parseFloat(priceElement.innerText.replace('đ', '').replace('.', ''));
        const quantity = quantityElement.value;
        const subtotal = price * quantity;

        subtotalElement.innerText = subtotal.toLocaleString() + 'đ';    
        total += subtotal;
    });

    document.querySelector('.cart_total').innerText = total.toLocaleString() + 'đ';
    document.querySelector('.sum_total').innerText = total.toLocaleString() + 'đ';
}

//Hàm kiểm tra nếu giỏ hàng trống
function checkIfCartIsEmpty() {
    const cartRows = document.querySelectorAll('.cart_form_products');
    if(cartRows.length === 0) {
        document.querySelector('.cart_container').style.display = 'none';

        //Hiển thị thông báo
        const announcementCart = document.getElementById('announcement');
        announcementCart.innerHTML = 'Chưa có sản phẩm nào trong giỏ hàng.';
        announcementCart.style.display = 'block';//Hiển thị thông báo
    } else {
        document.getElementById('announcement').style.display = 'none';
        document.querySelector('.cart_container').style.display = 'flex';
    }
}

// hàm xoá sản phẩm khỏi giỏ hàng
function removeCartItem(event) {
    const buttonClicked = event.target;
    const cartRow = buttonClicked.closest('tr'); // Lấy dòng sản phẩm (row)
    const productName = cartRow.querySelector('.product_name a').innerText; // Lấy tên sản phẩm


    // Xóa sản phẩm khỏi localStorage
    const updatedCartLocalStorage = data.carts.filter(cart => cart.nameFood !== productName);
    data.carts = updatedCartLocalStorage;// Cập nhật data
    setDataLocalStorage(data); //Cập nhật lại localStrorage


    cartRow.remove();
    updateCartTotal();
    checkIfCartIsEmpty();
    // Hiển thị thông báo tùy chỉnh
    const notification = document.getElementById('delete_notification');
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

    quantityInputs.forEach(function(input) {
        input.addEventListener('change', updateCartTotal);
    });

    additionButtons.forEach(function(button) {
        button.addEventListener('click', updateCartTotal);
    });

    subtractionButtons.forEach(function(button) {
        button.addEventListener('click', updateCartTotal);
    });
}


// Khởi tạo sự kiện lắng nghe khi tài liệu được tải xong
document.addEventListener('DOMContentLoaded', function() {
    setupRemoveButtons();
    setupQuantityButtons();
    updateCartTotal();
    checkIfCartIsEmpty();
});
