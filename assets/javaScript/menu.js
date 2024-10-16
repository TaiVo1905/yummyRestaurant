import getDataLocalStorage, {setDataLocalStorage} from "../javaScript/localStorage.js";
const data = getDataLocalStorage();
let filtered = [];
// hàm lọc món ăn theo loại và hiển thị dưới dạng bảng
function filterMenu (){
    const menu = data.menu;
    const menu_list = document.querySelector('#menu_list');
    menu_list.addEventListener('click', (e) => {
        const type = e.target.textContent;
        // console.log(type, menu);
        // lọc món ăn theo loại
        filtered = menu.filter(item => {
            return item.type.toLowerCase() === type.toLowerCase();
        })

        // nơi hiển thị dữ liệu của menu
        const menuTblBody = document.querySelector("#menu_tbl tbody");
        menuTblBody.innerHTML = ''; // Xóa nội dung cũ
    
        // hiển thị các món đã lọc được
        filtered.forEach(item => {
            menuTblBody.innerHTML += `
                <td><img src="${item.image_url}" alt="${item.name}" width="100px" height="100px"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
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
    })
}


filterMenu()

// định dạng cho class active hoạt động đúng như mong đợi
document.querySelectorAll('#menu_list a').forEach(category => {
    category.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelectorAll('#menu_list a').forEach(i => {
            i.classList.remove('active');
        })
        this.classList.add('active');
    });
});

/*sd hàm forEach để duyệt qua tất cả các thẻ a trong menu list
    thêm sự kiện click vào mỗi thẻ a
    chạy function: ngăn chặn các hành vi mặc định của thẻ a (như href)
    duyệt qua từng thẻ a một lần nữa:
    - Xóa class active trong các thẻ a khác
    - thêm class active vào thẻ a hiện tại (this.classList.add('active'))
*/

// lấy category khai vị làm mặc định khi tải trang
window.addEventListener('load',()=>{
    const defaultPage = document.querySelector('#menu_list a');
    if (defaultPage){
        defaultPage.click();
        // mô phỏng quá trình click. Tức là khi tải trang nó sẽ tự động click vào thẻ a đầu tiên mà không cần người dùng click vào.
    }
})

// Khi click vào nút "Thêm vào giỏ hàng"
document.querySelectorAll('.btn_add').forEach(button=>{
    // gắn sự kiện onclick cho các nút button "thêm vào giỏ hàng"
    button.addEventListener('click', function(){
        // lấy id của nút gán cho foodID
        const foodID = this.id.split('-')[1]; 
        const foodQuantity = document.querySelector(`#input_sl-${foodID}`).value;
        const foodNote = document.querySelector(`#input_note-${foodID}`).value;
        // lấy dữ liệu 
        const foodItem = filtered.find(item =>{
            return item.id===foodID;
        })

        const userID = sessionStorage.getItem('UserID');
        // kiểm tra nếu chưa có userID tức là chưa đăng nhập thành công
        if(!userID){
            alert("Bạn chưa đăng nhập. Vui lòng đăng nhập trước khi thêm vào giỏ hàng!")
        }
        // tạo một đối tượng chứa các thông tin (user_ID, foodName, ....)
        const cartItem = {
            user_ID: userID,
            food_Name: foodItem.name,
            food_Image: foodItem.image_url,
            food_Price: foodItem.price,
            food_Number: foodQuantity,
            food_Note: foodNote
        }
        // Đẩy dữ liệu lên mảng data.carts(json)
        data.carts.push(cartItem);
        // Đẩy lên localstorage 
        setDataLocalStorage(data);
        // Sau khi đẩy lên localStorage xong. Hiển thị 1 dòng trạng thái "thêm thành công"
        alert("Quý khách đã thêm món ăn vào giỏ hàng thành công!")
    })
})