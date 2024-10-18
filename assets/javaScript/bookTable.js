import getDataLocalStorage, {setDataLocalStorage} from "../javaScript/localStorage.js";
const btn_done = document.querySelector("#btn_done");
const btn_search = document.querySelector("#btn_search");
const input_frm = document.querySelector("#input_frm");
const logAndReg_modal = document.getElementById("logAndReg_modal");
const data = getDataLocalStorage(); // Lấy dữ liệu từ localStorage

//Hàm hiển thị bàn còn trống
function displaytable() {
    input_frm.addEventListener('submit', (e) => {
        e.preventDefault();
        const User_ID = sessionStorage.getItem('UserID');
        if (!User_ID){
            if (confirm("Bạn cần đăng nhập để đặt bàn!")) {
                logAndReg_modal.style.display = 'block';
                return;
            } else {
                return;
            }
        }
        const time = document.getElementById('input_time').value;
        const date = document.getElementById('input_date').value.split("-");
        const people = parseInt(document.getElementById('input_number').value);
        // Xử lý dữ liệu đầu vào
        const dateTime = new Date();
        const currentDate = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
        // console.log(currentDate)
        const inputDate = new Date(date[0], date[1] - 1, date[2]);
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const inputTime = time.split(':');
        const isDate = currentDate < inputDate ? true:false;
        const isTime = parseInt(inputTime[0]) > (currentHours <= 20 ? currentHours + 2: currentHours) ? true:false;
        function render() {
            // dãy các bàn trong nhà hàng (tables)
            const tables = [
                { number: 1, available: true, maxPeople: 4 },
                { number: 2, available: true, maxPeople: 16 },
                { number: 3, available: true, maxPeople: 10 },
                { number: 4, available: true, maxPeople: 8 },
                { number: 5, available: true, maxPeople: 12 },
                { number: 6, available: true, maxPeople: 12 },
                { number: 7, available: true, maxPeople: 12 },
                { number: 8, available: true, maxPeople: 16 },
                { number: 9, available: true, maxPeople: 8 },
                { number: 10, available: true, maxPeople: 6 },
                { number: 11, available: true, maxPeople: 8 },
                { number: 12, available: true, maxPeople: 6 },
                { number: 13, available: true, maxPeople: 4 },
                { number: 14, available: true, maxPeople: 6 },
                { number: 15, available: true, maxPeople: 8 },
                { number: 16, available: true, maxPeople: 4 },
                { number: 17, available: true, maxPeople: 6 },
                { number: 18, available: true, maxPeople: 2 },
                { number: 19, available: true, maxPeople: 4 },
                { number: 20, available: true, maxPeople: 2 },
                { number: 21, available: true, maxPeople: 2 },
                { number: 22, available: true, maxPeople: 4 },
                { number: 23, available: true, maxPeople: 2 },
                { number: 24, available: true, maxPeople: 2 },
                { number: 25, available: true, maxPeople: 4 },
                { number: 26, available: true, maxPeople: 2 },
                { number: 27, available: true, maxPeople: 10 },
                { number: 28, available: true, maxPeople: 2 },
                { number: 29, available: true, maxPeople: 12 },
                { number: 30, available: true, maxPeople: 2 },
            ];
            // console.log(date.join("-"))
            data.bookTables.forEach( (row) => {
                // console.log(row.date);
                if (row.date == date.join("-") && row.time == time) {
                    row.tableNumber.forEach ((tableNumber) => {
                        tables.some( (table) => {
                            if (parseInt(table.number) == parseInt(tableNumber)) {
                                table.available = false;
                                return true;
                            }
                        })
                    })
                } 
            })
            const tableList = document.querySelector('#table_list');
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
            btn_done.style.display="block";
        }
        if (currentDate > inputDate) {
            alert("Bạn cần đặt bàn ở ngày hiện tại hoặc sau ngày hiện tại!");
        }else if(isDate) {
            render();
        }
        else if (isTime) {
            render()
        } else {
            alert("Bạn cần đặt bàn trước 2 giờ!");
        }
        })
}


// Hàm lấy các bàn đã chọn và hiển thị vào form
function booktable() {
    btn_done.addEventListener('click', () => {
        const User_ID = parseInt(sessionStorage.getItem('UserID'));
        const infoUser = data.users.find( (user) => user.id == User_ID);
            const array_table = []; // Lưu trữ bàn khách đang chọn
        
            // Lấy tất cả các checkbox đã được tick
            const checkboxes = document.querySelectorAll('.table-checkbox:checked');
            checkboxes.forEach(checkbox => {
                array_table.push(checkbox.value); // Thêm số bàn vào mảng
            });
        
            if (array_table.length > 0) {
                document.getElementById('tableNumber').value = array_table.join(", ");
                document.getElementById('input_time1').value = document.getElementById('input_time').value;
                document.getElementById('input_date1').value = document.getElementById('input_date').value;
                document.getElementById('input_number1').value = document.getElementById('input_number').value;
                
                
                document.getElementById('input_name').value = infoUser.firstName + " " + infoUser.lastName;
                document.getElementById('input_email').value = infoUser.email;
                document.getElementById('input_phone').value = infoUser.phoneNum || "";
                document.getElementById('frm_booktable').style.display = "block"; // Hiển thị form
            }
            else {
                alert("Vui lòng chọn ít nhất một bàn.");
            }

    })
}

// Khi người dùng nhấn vào nút đóng form
function remove() {
    document.querySelector('#remove').addEventListener('click', () => {
        document.getElementById('frm_booktable').style.display = "none";
    })
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
    logAndReg.addEventListener('click', (e) => {
        logAndReg_modal.style.display = 'block';
    })
    logAndReg_modal.addEventListener('click', (e) => {
        if(e.target === logAndReg_modal){
            logAndReg_modal.style.display = 'none';
        }
    })
}

displaytable();
booktable()
remove()
handleLogAndRegModal()
