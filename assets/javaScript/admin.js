import {getDataLocalStorage, setDataLocalStorage} from "./localStorage.js";
import {toast} from "./app.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const admin_food = $('#admin_food');
const admin_orders = $('#admin_orders');
const admin_bookTables = $('#admin_bookTables');
const admin_users = $('#admin_users');
const foodTable = $('.admin_food #admin_items');
const orderTable = $('.admin_orders #admin_items');
const bookTable = $('.admin_bookTables #admin_items');
const userTable = $('.admin_users #admin_items');

// Lấy data từ localStorage
const data = getDataLocalStorage();

// Hàm xử lý hiển thị form thêm món ăn
function handleDisplayAddItemsModal () {
    const addItemsModal = $('#admin_addItems_modal');
    const closeAddItemsModal = $('#close_addItems_modal');
    const admin_addItem = $('#admin_addItem');
    const form = $('.form--modal');
    admin_addItem.addEventListener('click', function () {
        addItemsModal.style.display = 'block';
        addItems(data);
    })
    closeAddItemsModal.addEventListener('click', function () {
        addItemsModal.style.display = 'none';
        form.reset();
    })
}

// Hàm xử lý khi nhấp chuột vào các thành phần ở sidebar
function handleDisplayAdminTable () {
    $('.admin_sidebar').addEventListener('click', function (e) {
        if( e.target === admin_food || e.target === admin_orders || e.target === admin_bookTables || e.target === admin_users) {
            const admin_sidebarActive = $('.admin_sidebar > .active');
            const admin_food_class = $(`.${admin_sidebarActive.id}`);
            e.preventDefault();
            admin_food_class.style.display = 'none';
            admin_food_class.querySelector('.admin_tb_thead').style.display = "none";
            admin_sidebarActive.classList.remove('active');
            e.target.classList.add('active');
            $(`.${e.target.id}`).style.display = "block";
            $(`.${e.target.id}`).querySelector('.admin_tb_thead').style.display = "table";
            renderData(data);
        } 
    })
}

// Hàm hiển thị các món ăn
function renderFood(menu) {
    menu.forEach(food => {
        if (food.name != '') {
            foodTable.innerHTML += `
                <tr>
                    <td>${food.id}</td>
                    <td>${food.name}</td>
                    <td>${food.type}</td>
                    <td>${food.describe}</td>
                    <td>
                        <div class="item_img" style="background-image: url(${food.image_url});"></div>
                    </td>
                    <td>${food.price}</td>
                    <td>
                        <i class="fa-solid fa-pen-to-square" id="update" title="Chỉnh sửa"></i>
                        <i class="fa-solid fa-trash-can-arrow-up" id="delete" title="Xóa">
                        </i></td>
                </tr>
            `
        }
    });


console.log(foodTable);
}

// Hàm hiện thị các đơn đặt hàng
function renderOrders(orders) {
    orders.forEach(order => {
        if (order.foodName != '') {
            orderTable.innerHTML += `
                <tr>
                        <td>${order.id}</td>
                        <td>${order.foodName.join(", ")}</td>
                        <td>${order.amount}</td>
                        <td>${order.time}</td>
                        <td>${order.customerName}</td>
                        <td>${order.phoneNumber}</td>
                        <td>${order.address}</td>
                        <td>
                            <i></i>
                            <i class="fa-solid fa-trash-can-arrow-up" id="delete" title="Xóa"></i>
                        </td>
                    </tr>
            `
        }
});

}

// Hàm hiển thị các đơn đặt bàn
function renderBookTable(bookTables) {
    bookTables.forEach(bookTb => {
        if (bookTb.customerName != '') {
            bookTable.innerHTML += `
                <tr>
                    <td>${bookTb.id}</td>
                    <td>${bookTb.customerName}</td>
                    <td>${bookTb.email}</td>
                    <td>${bookTb.phoneNumber}</td>
                    <td>${bookTb.tableNumber.join(", ")}</td>
                    <td>${bookTb.peopleNum}</td>
                    <td>${bookTb.time}</td>
                    <td>${bookTb.date}</td>
                    <td>
                        <i></i>
                        <i class="fa-solid fa-trash-can-arrow-up" id="delete" title="Xóa"></i>
                    </td>
                </tr>
            `
        }
});
}

// Hàm hiển thị người dùng
function renderUser(users) {
    users.forEach(user => {
        if(user.firstName != ""){
            userTable.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.phoneNum}</td>
                    <td>${user.pass}</td>
                    <td>${user.date}</td>
                    <td>
                        <i></i>
                        <i class="fa-solid fa-trash-can-arrow-up" id="delete" title="Xóa"></i>
                    </td>
                </tr>
            `
        }
});
}

// Hàm xử lý tìm kiếm thông tin
function search(data) {
    const admin_find = $('#admin_find');
    const admin_inputSearch = $('#admin_inputSearch');
    const admin_food = $('.admin_food');
    const admin_orders = $('.admin_orders');
    const admin_bookTables = $('.admin_bookTables');
    const admin_users = $('.admin_users');
    
    admin_find.addEventListener('click', () => {
        const searchValue = admin_inputSearch.value;
        if (searchValue !== "") {
            if (admin_food.style.display === "block") { //Tìm kiếm món ăn
                const foodSearch = data.menu.filter(food => {
                    return food.name.toLowerCase().includes(searchValue.toLowerCase()) || food.type.toLowerCase().includes(searchValue.toLowerCase()) || food.describe.toLowerCase().includes(searchValue.toLowerCase());
                })
                foodTable.innerHTML = '';
                renderFood(foodSearch);
            } else if (admin_orders.style.display === "block"){ //Tìm kiếm đơn đặt hàng
                const ordersSearch = data.orders.filter(order => {
                    return order.foodName.toLowerCase().includes(searchValue.toLowerCase()) || order.customerName.toLowerCase().includes(searchValue.toLowerCase()) || order.address.toLowerCase().includes(searchValue.toLowerCase());
                })
                orderTable.innerHTML = '';
                renderOrders(ordersSearch);
            } else if (admin_bookTables.style.display === "block"){ //Tìm kiếm đơn đặt bàn
                const bookTablesSearch = data.bookTables.filter(bookTable => {
                    return bookTable.customerName.includes(searchValue) || bookTable.email.includes(searchValue)
                })
                bookTable.innerHTML = '';
                renderBookTable(bookTablesSearch);
            } else if (admin_users.style.display === "block"){ //Tìm kiếm người dùng
                const userSearch = data.users.filter(user => {
                    return user.firstName.toLowerCase().includes(searchValue.toLowerCase()) || user.lastName.toLowerCase().includes(searchValue.toLowerCase()) || user.email.toLowerCase().includes(searchValue.toLowerCase())
                })
                userTable.innerHTML = '';
                renderUser(userSearch);
            }
        } else {
            // Trả về thông tin khi không có giá trị ở ô tìm kiếm
            renderData(data);
        }
    })

}

// Hàm thêm món ăn
function addItems(data) {
    const form = $('.form--modal');
    const addItemsModal = $('#admin_addItems_modal');
    addItemsModal.querySelector('.modal_header h2').innerText = "THÊM SẢN PHẨM MỚI";
    form.addEventListener('submit', (e) => {
        if (addItemsModal.querySelector('.modal_header h2').innerText == "THÊM SẢN PHẨM MỚI") {
            e.preventDefault();
            const itemName = form['itemName'].value;
            const itemType = form['itemType'].value;
            const itemImgText = form['itemImgText'].value;
            const itemDesc = form['itemDesc'].value;
            const itemPrice = form['itemPrice'].value;
            console.log(itemDesc, itemImgText, itemName, itemPrice, itemType);
            data.menu.push({
                "id": data.menu[data.menu.length -1].id + 1,
                "name": itemName,
                "type": itemType,
                "describe": itemDesc,
                "image_url": `${itemImgText}`,
                "price": parseInt(itemPrice).toLocaleString() + "đ"
            })
            setDataLocalStorage(data);
            renderData(data);
            form.reset();
            toast('Thêm thành công!');
        }
    })
    
}

// Hàm Xử lý hiển thị thông tin
function renderData(data) {
    foodTable.innerHTML = '';
    orderTable.innerHTML = '';
    bookTable.innerHTML = '';
    userTable.innerHTML = '';
    renderFood(data.menu);
    renderOrders(data.orders);
    renderBookTable(data.bookTables);
    renderUser(data.users);
}

// Hàm xóa thông tin
function deleteRecord(data) {
    foodTable.addEventListener('click', (e) => { //Xóa món ăn
        if (e.target.id == "delete") {
            const recordFood = e.target.closest('tr');
            if(confirm(`Bạn chắc chắn muốn xóa món ${recordFood.querySelector('td:nth-child(2)').innerText}?`)) {
                data.menu.some(record => {
                    if (record.id == recordFood.querySelector('td:first-Child').innerText) {
                        record.name = '';
                        record.type = '';
                        record.describe = '';
                        record.image_url = '';
                        record.price = '';
                        console.log(record);
                        return;
                    }
                })
                setDataLocalStorage(data);
                renderData(data);
                toast('Xóa thành công!');
            }
        }
    })

    orderTable.addEventListener('click', (e) => { //Xóa đơn đặt hàng
        if (e.target.id == "delete") {
            const recordOrder = e.target.closest('tr');
            if(confirm(`Bạn chắc chắn muốn xóa đơn đặt hàng của khách hàng ${recordOrder.querySelector('td:nth-child(5)').innerText}?`)) {
                data.orders.some(record => {
                    if (record.id == recordOrder.querySelector('td:first-Child').innerText) {
                        record.foodName = '';
                        record.amount = '';
                        record.time = '';
                        record.customerName = '';
                        record.phoneNumber = '';
                        record.address = '';
                        console.log(record);
                        return;
                    }
                })
                setDataLocalStorage(data);
                renderData(data);
                toast('Xóa thành công!');
            }
        }
    })
    bookTable.addEventListener('click', (e) => { //Xóa đơn đặt bàn
        if (e.target.id == "delete") {
            const recordBookTbl = e.target.closest('tr');
            if(confirm(`Bạn chắc chắn muốn xóa đơn đặt bàn của khách hàng ${recordBookTbl.querySelector('td:nth-child(2)').innerText}?`)) {
                data.bookTables.some(record => {
                    if (record.id == recordBookTbl.querySelector('td:first-Child').innerText) {
                            record.customerName = "";
                            record.email = "";
                            record.phoneNumber = "";
                            record.tableNumber = [];
                            record.peopleNum = "";
                            record.time = "";
                            record.date ="";
                        return;
                    }
                })
                setDataLocalStorage(data);
                renderData(data);
                toast('Xóa thành công!');
            }
        }
    })
    userTable.addEventListener('click', (e) => { //Xóa người dùng
        if (e.target.id == "delete") {
            const recordUser = e.target.closest('tr');
            if(confirm(`Bạn chắc chắn muốn xóa thông tin người dùng ${recordUser.querySelector('td:nth-child(2)').innerText}?`)) {
                data.users.some(record => {
                    if (record.id == recordUser.querySelector('td:first-Child').innerText) {
                        record.firstName = "";
                        record.lastName = "";
                        record.email = "";
                        record.pass = "";
                        record.phoneNum = "";
                        record.date = "";
                        return;
                    }
                })
                setDataLocalStorage(data);
                renderData(data);
                toast('Xóa thành công!');
            }
        }
    })
}

// Hàm chỉnh sửa thông tin món ăn
function updateMenu(data) {
    const addItemsModal = $('#admin_addItems_modal');
    foodTable.addEventListener('click', (e) => {
        if (e.target.id == "update") {
            const recordFood = e.target.closest('tr');
            console.log(recordFood)
            addItemsModal.style.display = "block";
            addItemsModal.querySelector('.modal_header h2').innerText = "CHỈNH SỬA THÔNG TIN MÓN ĂN";
            const form = $('.form--modal');
            form['itemName'].value = recordFood.querySelector('td:nth-child(2)').innerText;
            form['itemType'].value = recordFood.querySelector('td:nth-child(3)').innerText;
            form['itemDesc'].value = recordFood.querySelector('td:nth-child(4)').innerText;
            form['itemImgText'].value = recordFood.querySelector('td:nth-child(5) .item_img').style.backgroundImage.slice(5, -2);
            form['itemPrice'].value = recordFood.querySelector('td:nth-child(6)').innerText.slice(0, -1);
            form.addEventListener('submit', (e) => {
                if (addItemsModal.querySelector('.modal_header h2').innerText == "CHỈNH SỬA THÔNG TIN MÓN ĂN") {
                    e.preventDefault();
                    data.menu.some( (food) => {
                        if(food.id == recordFood.querySelector('td:nth-child(1)').innerText) {
                            food.name = form['itemName'].value;
                            food.type = form['itemType'].value;
                            food.describe = form['itemDesc'].value;
                            food.image_url = form['itemImgText'].value;
                            food.price = form['itemPrice'].value;
                        }
                        return;
                    })
                    setDataLocalStorage(data);
                    renderData(data);
                    form.reset();
                    toast('Chỉnh sửa thành công!');
                }
            })
        }
    })
}

// Hàm chạy chương trình
function runPage(data) {
    document.addEventListener('DOMContentLoaded', () => {
        handleDisplayAddItemsModal();
        handleDisplayAdminTable();
        admin_food.click();
        search(data);
        deleteRecord(data);
        updateMenu(data);
    })
}

runPage(data);