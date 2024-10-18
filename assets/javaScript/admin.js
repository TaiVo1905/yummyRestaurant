import getDataLocalStorage, {setDataLocalStorage} from "../javaScript/localStorage.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const admin_food = $('#admin_food');
const admin_orders = $('#admin_orders');
const admin_bookTables = $('#admin_bookTables');
const admin_users = $('#admin_users');
const admin_sidebarA = $$('.admin_sidebar a');
const foodTable = $('.admin_food #admin_items');
const orderTable = $('.admin_orders #admin_items');
const bookTable = $('.admin_bookTables #admin_items');
const userTable = $('.admin_users #admin_items');


const data = getDataLocalStorage();

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
                            <i class="fa-solid fa-pen-to-square" id="update" title="Chỉnh sửa"></i>
                            <i class="fa-solid fa-trash-can-arrow-up" id="delete" title="Xóa"></i>
                        </td>
                    </tr>
            `
        }
});

}

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
                        <i class="fa-solid fa-pen-to-square" id="update" title="Chỉnh sửa"></i>
                        <i class="fa-solid fa-trash-can-arrow-up" id="delete" title="Xóa"></i>
                    </td>
                </tr>
            `
        }
});
}

function renderUser(users) {
    users.forEach(user => {
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
});
}


function handleDisplayAddItemsModal () {
    const addItemsModal = $('#admin_addItems_modal');
    const closeAddItemsModal = $('#close_addItems_modal');
    const admin_addItem = $('#admin_addItem');
    admin_addItem.addEventListener('click', function () {
        addItemsModal.style.display = 'block';
    })
    closeAddItemsModal.addEventListener('click', function () {
        addItemsModal.style.display = 'none';
    })
}

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



function search(data) {
    const admin_find = $('#admin_find');
    const admin_inputSearch = $('#admin_inputSearch');
    const admin_food = $('.admin_food');
    const admin_orders = $('.admin_orders');
    const admin_bookTables = $('.admin_bookTables');
    const admin_users = $('.admin_users');
    
    admin_find.addEventListener('click', () => {
        const searchValue = admin_inputSearch.value;
        console.log(searchValue)
        if (searchValue !== "") {
            if (admin_food.style.display === "block") {
                const foodSearch = data.menu.filter(food => {
                    return food.name.includes(searchValue) || food.type.includes(searchValue) || food.describe.includes(searchValue);
                })
                foodTable.innerHTML = '';
                renderFood(foodSearch);
            } else if (admin_orders.style.display === "block"){
                const ordersSearch = data.orders.filter(order => {
                    return order.foodName.includes(searchValue) || order.customerName.includes(searchValue) || order.address.includes(searchValue);
                })
                orderTable.innerHTML = '';
                renderOrders(ordersSearch);
            } else if (admin_bookTables.style.display === "block"){
                const bookTablesSearch = data.bookTables.filter(bookTable => {
                    return bookTable.customerName.includes(searchValue) || bookTable.email.includes(searchValue)
                })
                bookTable.innerHTML = '';
                renderBookTable(bookTablesSearch);
            } else if (admin_users.style.display === "block"){
                const userSearch = data.users.filter(user => {
                    return user.firstName.includes(searchValue) || user.lastName.includes(searchValue) || user.email.includes(searchValue)
                })
                userTable.innerHTML = '';
                renderBookTable(userSearch);
            }
        } else {
            renderData(data);
        }
    })

}

function addItems(data) {
    const form = $('.form--modal');
    // const submit = $('#addItem');
    form.addEventListener('submit', (e) => {
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
            "price": itemPrice + "đ"
        })
        setDataLocalStorage(data);

        renderData(data);
        form.reset();
    })
    
}

addItems(data);
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

function deleteRecord(data) {
    // const deleteFood = foodTable.querySelectorAll('#delete');
    // const deletebookTable = bookTable.querySelectorAll('#delete');
    // const deleteOrder = bookTable.querySelectorAll('#delete');
    // const deleteUser = userTable.querySelectorAll('#delete');
    // console.log(deleteFood, deleteOrder, deletebookTable, deleteUser);
    //  Xóa thực đơn
    foodTable.addEventListener('click', (e) => {
        if (e.target.id == "delete") {
            const recordFood = e.target.closest('tr');
            if(confirm(`Bạn chắc chắn muốn xóa món ${recordFood.querySelector('td:nth-child(2)').innerText}`)) {
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
            }
        }
    })

    orderTable.addEventListener('click', (e) => {
        if (e.target.id == "delete") {
            const recordOrder = e.target.closest('tr');
            if(confirm(`Bạn chắc chắn muốn xóa đơn đặt hàng của khách hàng ${recordOrder.querySelector('td:nth-child(5)').innerText}`)) {
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
            }
        }
    })
}
deleteRecord(data);
handleDisplayAddItemsModal();
handleDisplayAdminTable();
renderData(data);
search(data);
