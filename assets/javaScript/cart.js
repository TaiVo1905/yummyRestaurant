//Lấy dữ liệu từ json
import getDataLocalStorage, {setDataLocalStorage} from "../javaScript/localStorage.js";
const data = getDataLocalStorage()

//Hiển thị sản phẩm 
function displayCart(data){
    const user_ID = sessionStorage.getItem('UserID');
    const carts = data.carts;
     // Truy xuất đến phần tử có ID 'menu_body'
     const cartTable = document.getElementById('menu_body');
     cartTable.innerHTML = ""; // Xóa các sản phẩm hiện tại trong giỏ hàng

    let cart_item = carts.filter(cart => {
        return cart.userId === user_ID;
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
                        <a href="details.html" class="image"><img src="${item.image_url}" style="width: 80px; height: 80px;" alt="${item.nameFood}"></a>
                    </td>
                    <td class="product_name appear">
                        <a href="details.html">${item.nameFood}</a>
                    </td>
                    <td class="product_price appear">
                        <a href="details.html">${item.price}</a>				
                    </td>
                    <!-- Tăng giảm số lượng đơn hàng -->
                    <td class="product_quantity">
                        <div class="quantity buttons_added">
                            <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" id="number_subtraction" value="-">
                            <input type="number" value="1" id="number_step" min="1">
                            <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="number_addition" value="+">
                        </div>
                    </td>
                    <td>
                      <div class="input_note">Cay vừa phải, không ăn được hành, thích mùi vị thơm nồng</div>
                     </td>
                    <td class="product_subtotal appear">${item.price}				
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

    if (isHeader) {
        return; // Nếu nhấp vào tiêu đề, không chuyển hướng
    }

    if (!productElement) {
        return; // Nếu không phải, ngăn chặn việc chuyển trang
    }

        /*
        event.target: Trả về phần tử cụ thể mà người dùng đã nhấp vào.
        .closest(selector): Phương thức này tìm kiếm trong chuỗi các phần tử cha gần nhất cho phần tử mà đã được nhấp vào
        (trong trường hợp này là event.target). Nếu phần tử đó khớp với bất kỳ phần tử nào trong chuỗi .product_image, 
        .product_name, hoặc .product_price, nó sẽ trả về phần tử đó. Nếu không, nó sẽ trả về null.
         */

        window.location.href = "details.html"; // Chuyển hướng đến trang chi tiết
    }


// Thêm sự kiện 'click' cho các sản phẩm sau khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    const productElements = document.querySelectorAll('.product_image, .product_name, .product_price');
    
    productElements.forEach(function(element) {
        element.addEventListener('click', onclickProduct);
    });
});

// Hàm cập nhật tổng tạm tính và tổng giá
function updateCartTotal() {
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

        //Khi tính tổng xong chuyển sang dạng chuỗi để thêm chữ 'đ
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
    updateCartTotal();
    checkIfCartIsEmpty();

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

localStorage.clear() //Hiển thị lại sản phẩm




