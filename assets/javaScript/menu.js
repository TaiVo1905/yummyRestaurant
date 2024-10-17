import getDataLocalStorage, {setDataLocalStorage} from "../javaScript/localStorage.js";
const data = getDataLocalStorage();
let filtered=[];
// Hàm lọc món ăn theo loại và hiển thị dưới dạng bảng
function filterMenu() {
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
    searchButton.addEventListener('click', searchMenu);
    // Thêm sự kiện cho nút reset tìm kiếm
    const reset_Search = document.querySelector('#reset_search');
    reset_Search.addEventListener('click', resetSearch);
}

filterMenu();

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
    addData()
        // addCart()
  // Thêm sự kiện nhấp chuột cho các sản phẩm mới
  addClickEventToProducts();
    // Nếu không có món ăn nào phù hợp
        if (filtered.length === 0) {
            menuTblBody.innerHTML = `
                <tr>
                    <td colspan="6">Không có món nào thuộc loại này.</td>
                </tr>
            `;
        }
    }
filterMenu()

function addData(){
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
                return item.id === foodID;
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
                    "type": foodItem.type,
                    "image_url": foodItem.image_url,
                    "price": foodItem.price,
                    "food_Qty": parseInt(foodQuantity),
                    "describe": foodItem.describe,
                    "food_Note": foodNote
                }
                // Kiểm tra xem có trong cart có chưa. Nếu có rồi thì tăng số lượng
                let itemIndex = data.carts.findIndex(item =>{
                    return item.nameFood === foodItem.name;
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
                    // alert("Bạn thêm thành công!")
                }
                else{
                    data.carts.push(cartItem);
                    // alert("Thêm thành công!")
                }
                document.querySelector(`#input_sl-${foodID}`).value = 1;
                document.querySelector(`#input_note-${foodID}`).value = "";
                setDataLocalStorage(data);
            }
            
        })
    })
}

// Tìm kiếm món ăn khi người dùng nhấn nút "Tìm"
function searchMenu() {
    const searchKey = document.getElementById('search_input').value.toLowerCase();
    filtered = filtered.filter(item => {
        return item.name.toLowerCase().includes(searchKey); // Tìm món ăn có chứa từ khóa 'thuộc tính "includes"
    });

    // Hiển thị kết quả tìm kiếm
    displayFilteredMenu();
}

// Reset lại tìm kiếm và làm mới menu
function resetSearch() {
    window.location.href='menu.html';
}

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
active();

/*sd hàm forEach để duyệt qua tất cả các thẻ a trong menu list
    thêm sự kiện click vào mỗi thẻ a
    chạy function: ngăn chặn các hành vi mặc định của thẻ a (như href)
    duyệt qua từng thẻ a một lần nữa:
    - Xóa class active trong các thẻ a khác
    - thêm class active vào thẻ a hiện tại (this.classList.add('active'))
*/

// lấy category khai vị làm mặc định khi tải trang (MẶC ĐỊNH)
function displayDefault(){
    window.addEventListener('load',()=>{
        const defaultPage = document.querySelector('#menu_list a');
        if (defaultPage){
            defaultPage.click();
            // mô phỏng quá trình click. Tức là khi tải trang nó sẽ tự động click vào thẻ a đầu tiên mà không cần người dùng click vào.
        }
    })
}
displayDefault();

//Xem sản phẩm chi tiết
// Đảm bảo hàm onclickProduct hoạt động đúng
function onclickProduct(event) {
    // Kiểm tra nếu sự kiện xảy ra từ một phần tử sản phẩm
    const productElement = event.target.closest('.product_image, .product_name, .product_price');
    if (!productElement) {
        return; // Nếu không phải, ngăn chặn việc chuyển trang
    }
     /*
        event.target: Trả về phần tử cụ thể mà người dùng đã nhấp vào.
        .closest(selector): Phương thức này tìm kiếm trong chuỗi các phần tử cha gần nhất cho phần tử mà đã được nhấp vào
        (trong trường hợp này là event.target). Nếu phần tử đó khớp với bất kỳ phần tử nào trong chuỗi .product_image, 
        .product_name, hoặc .product_price, nó sẽ trả về phần tử đó. Nếu không, nó sẽ trả về null.
         */
        
    // Chuyển hướng đến trang chi tiết
    window.location.href = "details.html"; 
}

function addClickEventToProducts() {
    const productElements = document.querySelectorAll('.product_image, .product_name, .product_price');
    productElements.forEach(function (element) {
        element.addEventListener('click', onclickProduct);
    });
}

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