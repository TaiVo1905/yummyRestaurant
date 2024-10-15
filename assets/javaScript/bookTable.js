document.getElementById("btn_done").style.display="none";
var array_table = []; // Mảng lưu trữ các bàn đã chọn

function displaytable() {
    const time = document.getElementById('input_time').value;
    const date = document.getElementById('input_date').value;
    const people = parseInt(document.getElementById('input_number').value);

    // Mô phỏng dữ liệu từ API (bàn trống, bàn đã đặt)
    // dãy các bàn trong nhà hàng (tables)
    const tables = [
        { number: 1, available: false, maxPeople: 4 },
        { number: 2, available: true, maxPeople: 15 },
        { number: 3, available: true, maxPeople: 11 },
        { number: 4, available: false, maxPeople: 8 },
        { number: 5, available: true, maxPeople: 12 },
        { number: 6, available: true, maxPeople: 10 },
        { number: 7, available: true, maxPeople: 14 },
        { number: 8, available: true, maxPeople: 16 },
        { number: 9, available: false, maxPeople: 8 },
        { number: 10, available: true, maxPeople: 5 },
        { number: 11, available: true, maxPeople: 9 },
        { number: 12, available: false, maxPeople: 6 },
        { number: 13, available: true, maxPeople: 6 },
        { number: 14, available: false, maxPeople: 6 },
        { number: 15, available: true, maxPeople: 8 },
        { number: 16, available: true, maxPeople: 4 },
        { number: 17, available: false, maxPeople: 6 },
        { number: 18, available: true, maxPeople: 2 },
    ];

    const tableList = document.getElementById('table_list');
    tableList.innerHTML = ''; // Xóa danh sách cũ

    tables.forEach(table => {
        const tableDiv = document.createElement('div');
        tableDiv.classList.add('table');
        // thêm tên class
        
        // Thêm checkbox cho mỗi bàn
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = table.number;
        checkbox.classList.add('table-checkbox');
        // thêm tên class

        if (!table.available) {
            tableDiv.classList.add('booked');
            // thêm tên class
            tableDiv.textContent = `Bàn ${table.number} đã được đặt`;
        } 
        else if (table.available && people <= table.maxPeople) {
            tableDiv.textContent = `Bàn ${table.number} (Tối đa ${table.maxPeople} người)`;
            tableDiv.appendChild(checkbox);
            // hiển thị check box ở bàn đủ điều kiện 
        } 
        else {
            tableDiv.textContent = `Bàn ${table.number}`;
        }
        tableList.appendChild(tableDiv);
    });
    document.getElementById("btn_done").style.display="block";
}

// Hàm lấy các bàn đã chọn và hiển thị vào form
function booktable() {
    array_table = []; // Reset mảng bàn đã chọn

    // Lấy tất cả các checkbox đã được tick
    const checkboxes = document.querySelectorAll('.table-checkbox:checked');
    checkboxes.forEach(checkbox => {
        array_table.push(checkbox.value); // Thêm số bàn vào mảng
    });

    if (array_table.length > 0) {
        document.getElementById('tableNumber').value = array_table.join(", ");
        document.getElementById('frm_booktable').style.display = "block"; // Hiển thị form
    }
    else {
        alert("Vui lòng chọn ít nhất một bàn.");
    }
}

// Khi người dùng nhấn vào nút đóng form
function remove() {
    document.getElementById('frm_booktable').style.display = "none";
}

// Đóng form khi click bên ngoài form
window.onclick = function(event) {
    const modal = document.getElementById('frm_booktable');
    if (event.target == modal) {
        modal.style.display = "none";
    }
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
