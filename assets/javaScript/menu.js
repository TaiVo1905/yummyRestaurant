import getDataLocalStorage, {setDataLocalStorage} from "../javaScript/localStorage.js";
const data = getDataLocalStorage();
// biến lưu trữ dữ liệu được lấy từ file json
// let menu = [];
// // hàm lấy dữ liệu từ file json
// fetch('./assets/Data/data.json')
//     .then(response => response.json())
//     .then(data => {
//         menu=data.menu;
//         // (toàn bộ dữ liệu về menu trong file data.json sẽ được gán vào mảng menu được khai báo bên trên)
//     })
//     .catch(error => {
//         console.error('Lỗi khi lấy dữ liệu từ file:', error)
//     });
    // hàm lọc món ăn theo loại và hiển thị dưới dạng bảng
     function filterMenu(type){
        const menu = data.menu;
        // lọc món ăn theo loại
        const filtered = menu.filter(item => {
            return item.type===type;
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
                        <input id="input_sl" type="number" value="1" min="1" />
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="number_addition">+</button>
                    </div>
                </td>
                <td>
                    <textarea name="note" id="input_note" placeholder="Nhập ghi chú..."></textarea>
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

    }


export default filterMenu;