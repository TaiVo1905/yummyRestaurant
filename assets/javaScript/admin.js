const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const admin_food = $('#admin_food');
const admin_orders = $('#admin_orders');
const admin_bookTables = $('#admin_bookTables');
const admin_users = $('#admin_users');
const admin_sidebarA = $$('.admin_sidebar a');


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
    console.log(admin_addItem)
}

function handleDisplayAdminTable () {
    // const tblOld = $(`${tblOlds} .admin_tb_thead`);
    // const tblNew = $(`${tblNews} .admin_tb_thead`);
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
        }

    })
    // console.log(foodManage)

}

handleDisplayAddItemsModal();
handleDisplayAdminTable()