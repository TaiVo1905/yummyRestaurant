// Hàm cập nhật tổng tạm tính và tổng giá
function updateCartTotal() {
    const cartRows = document.querySelectorAll('.cart-form-products');
    let total = 0;
    cartRows.forEach(function(row) {
        const priceElement = row.querySelector('.product-price');
        const quantityElement = row.querySelector('.product-quantity input[type=number]');
        const subtotalElement = row.querySelector('.product-subtotal');
        
        const price = parseFloat(priceElement.innerText.replace('đ', '').replace('.', ''));
        const quantity = quantityElement.value;
        const subtotal = price * quantity;

        subtotalElement.innerText = subtotal.toLocaleString() + 'đ'; 
        total += subtotal;
    });

    document.querySelector('.cart-total').innerText = total.toLocaleString() + 'đ';
    document.querySelector('.sum-total').innerText = total.toLocaleString() + 'đ';
}

// hàm xoá sản phẩm khỏi giỏ hàng
function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('tr').remove();

    updateCartTotal();
    // Hiển thị thông báo tùy chỉnh
    const notification = document.getElementById('delete-notification');
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Ẩn thông báo sau 3 giây
}

// Hàm thêm sự kiện lắng nghe cho các nút xoá
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.item-remove');
    removeButtons.forEach(function(button) {
        button.addEventListener('click', removeCartItem);
    });
}

// Hàm xử lý khi thay đổi số lượng và cập nhật tổng giá
function setupQuantityButtons() {
    const quantityInputs = document.querySelectorAll('.product-quantity input[type=number]');
    const additionButtons = document.querySelectorAll('#number-addition');
    const subtractionButtons = document.querySelectorAll('#number-subtraction');

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
    updateCartTotal(); // Ensure the totals are calculated at the beginning
});

// Hàm chuyển sang trang menu khi người dùng nhấn "Tiếp tục mua sản phẩm"
function onclickAddCart() {
    window.location.href = 'menu.html';// Chuyển hướng đến trang thực đơn
}
