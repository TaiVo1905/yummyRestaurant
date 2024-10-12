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
    buttonClicked.closest('tr').remove();

    updateCartTotal();
    checkIfCartIsEmpty();
    // Hiển thị thông báo tùy chỉnh
    const notification = document.getElementById('delete_notification');
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 1000); // Ẩn thông báo sau 1 giây
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


