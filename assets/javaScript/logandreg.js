import {getDataLocalStorage, setDataLocalStorage} from "./localStorage.js";
import {toast} from "./app.js";
import {countUniqueItemsInCart} from "./cart.js";
const data = getDataLocalStorage();
// Hàm chuyển đổi giữa form đăng ký và đăng nhập
function changeFormLogAndReg(){
    document.getElementById('switchToLogin').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('registerContainer').style.display = 'none';
        document.getElementById('loginContainer').style.display = 'block';
    });
    document.getElementById('switchToRegister').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('registerContainer').style.display = 'block';
    });
}
// Xử lý đăng ký
function regisTer(){
    document.getElementById('register_Form').addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        const lastName = this.lastName.value.trim();
        const firstName = this.firstName.value.trim();
        const email = this.email.value.trim();
        const password = this.password.value.trim();
        const confirm_password = this.confirm_password.value.trim();
        // Lấy danh sách người dùng đã đăng ký từ localStorage
        ;
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = data.users.find(user => user.email === email);
        if (existingUser) {
            toast('Email đã được sử dụng!');
        } else if (confirm_password != password) {
            toast('Xác nhận mật khẩu thất bại!');
        } else {
            const lastUser = data.users[data.users.length - 1]; // Lấy người dùng cuối cùng
            const id = lastUser.id + 1; // Cộng 1 vào id của người dùng cuối
            data.users.push({
                id: id,                   
                lastName: lastName,       
                firstName: firstName,     
                email: email,             
                pass: password,
                date: new Date().toLocaleString()
            });
            setDataLocalStorage(data);
            toast('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ!');
            this.reset(); // Đặt lại form
            document.getElementById('registerContainer').style.display = 'none';
            document.getElementById('loginContainer').style.display = 'block';
        }
    });
}
// Xử lý đăng nhập
function logIn(){
    document.getElementById('login_Form').addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        const email = this.email.value.trim();
        const password = this.password.value.trim();
        // Lấy danh sách người dùng từ localStorage
        const users = data.users;
        // Kiểm tra thông tin đăng nhập
        const user = users.find(user => user.email.toLowerCase() == email.toLowerCase() && user.pass == password);
        if (user) {
            toast('Đăng nhập thành công!');
            document.querySelector('#login_Form').reset();
            document.getElementById('logAndReg_modal').style.display = 'none';
            if (user.email == 'admin2024@gmail.com') {
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1500);
            }
            // lưu userID vào sessionStorage 
            sessionStorage.setItem('UserID', user.id);
            countUniqueItemsInCart();
        } else {
            toast('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });
}

//Lấy thông tin khách hàng đã đăng ký từ localstorage sau đó hiển thị lên form thông tin khách hàng
function getInformation() {
    const users = data.users; // Lấy mảng người dùng từ localStorage
    const user_ID = parseInt(sessionStorage.getItem('UserID')); // Lấy ID người dùng từ sessionStorage
    const user_exist = users.find(user => user.id == user_ID); // Tìm người dùng dựa theo ID

    if (user_exist) {
        // Nếu tìm thấy người dùng, điền thông tin vào form
        document.querySelector('.information_firstName').value = user_exist.lastName;
        document.querySelector('.information_lastName').value = user_exist.firstName;
        document.querySelector('.information_email').value = user_exist.email;
        document.querySelector('.information_phoneNumber').value = user_exist.phoneNum || ''; // Trường hợp người dùng chưa nhập phone
    }
}

// Hàm xử lý đổi mật khẩu cho user;
function changePassUser (personalInformation) {
    // Click vào nút đổi mật khẩu
    const password_btn = document.querySelector('.password_button');
    const changePassword = document.querySelector('.changePassword_modal');
    password_btn.addEventListener('click',(e) => {
        e.preventDefault();
        personalInformation.style.display = 'none';
        changePassword.style.display='block';
    });
    // click vào nút cập nhật
    document.querySelector('#password_frm').addEventListener('submit', (e) => {
        e.preventDefault();
        const user_ID = parseInt(sessionStorage.getItem('UserID'));
        const oldPassword = document.querySelector('.password_current').value;
        const newPassword = document.querySelector('.password_new').value;
        const confirmPassword = document.querySelector('.password_newConfirm').value;

        // Lấy thông tin user từ localStorage
        const user = data.users.find(user => {return user.id == user_ID});
        console.log(user);
        if (user.pass == oldPassword) {
            if (newPassword == confirmPassword) {
                // Cập nhật mật khẩu mới
                if (newPassword == user.pass) {
                    toast('Mật khẩu mới trùng với mật khẩu cũ!');
                } else {
                    const index = data.users.findIndex(user => {return user.id == user_ID});
                    data.users[index].pass = newPassword;
                    setDataLocalStorage(data); // Lưu lại vào localStorage
                    console.log(data);
                    toast('Đổi mật khẩu thành công!');
                    changePassword.style.display = 'none';
                    document.querySelector('#password_frm').reset();
                }
            } else {
                toast('Mật khẩu xác nhận không khớp!');
            }
        } else {
            toast('Mật khẩu cũ không đúng!');
        }
    });
    
    // click vào nút hủy
    const cancel = document.querySelector('.cancel_button');
    cancel.addEventListener('click', (e) => {
        e.preventDefault();
        changePassword.style.display='none';
    });
}

// Hàm xử lý đăng xuất cho user;
function logOut (personalInformation) {
    // click vào nút đăng xuất
    const logout = document.querySelector('.logout_button');
    logout.addEventListener('click', (e)=>{
        e.preventDefault();
        sessionStorage.removeItem('UserID');
        personalInformation.style.display='none';
        toast('Bạn đã đăng xuất thành công!');
        setTimeout( () => {
            if (window.location.pathname == '/admin.html' || window.location.pathname == '/ymmyRestaurantWebsite/admin.html') {
                window.location.href = "./index.html";
                console.log(1);
                return;
            }
            countUniqueItemsInCart();
        }, 1500);
    });
}

// Khi click vào biểu tượng con người
function handleLogIn() {
    const logAndReg = document.getElementById("logAndReg");
    const logAndRegModal = document.querySelector('.logAndReg_modal');
    const personalInformation = document.querySelector('.personalInformation_modal');
    const modal = document?.querySelectorAll('.logAndReg_modal, .personalInformation_modal, .changePassword_modal');
    logAndReg.addEventListener('click', () => {
        const userid = parseInt(sessionStorage.getItem('UserID')); 
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (userid) {
            // personal_information(); // Nếu đã đăng nhập, hiển thị thông tin cá nhân
            if(logAndRegModal){
                logAndRegModal.style.display = 'none';
            }
            personalInformation.style.display = 'block'; // Hiển thị form thông tin cá nhân
            getInformation(); // Lấy thông tin người dùng để điền vào form
        } else {
            if(logAndRegModal){
                logAndRegModal.style.display = 'block';
            } // Nếu chưa đăng nhập, hiển thị modal đăng nhập
        }

    });
    changePassUser(personalInformation); // Xử lý khi người dùng nhấn vào đổi mật khẩu
    logOut(personalInformation); //Xử lý khi người dùng nhấn vào nút đăng xuất
    document.querySelector('#information_frm').addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneNum = document.querySelector('#information_frm')['phoneNumer'].value;
        const index = data.users.findIndex( (user) => { return user.id == parseInt(sessionStorage.getItem('UserID'))});
        if(data.users[index].phoneNum == phoneNum) {
            toast('Bạn chưa thay đổi số điện thoại, vui lòng thử lại!');
            return;
        }
        data.users[index].phoneNum = phoneNum;
        toast('Cập nhật số điện thoại thành công!');
        setDataLocalStorage(data);
    })
    modal.forEach ( (m) => {
        m.addEventListener('click', (e) => {
            if (e.target.className == 'logAndReg_modal' || e.target.className == 'personalInformation_modal' || e.target.className == 'changePassword_modal') {
                e.target.style.display = 'none';
                e.target.querySelector('form').reset();
            }
        })
    })
    
};

// Hàm chạy chương trình
function runPage() {
    document.addEventListener('DOMContentLoaded', () => {
        handleLogIn();
        if (window.location.pathname == '/admin.html' || window.location.pathname == '/ymmyRestaurantWebsite/admin.html') {
            return;
        }
        changeFormLogAndReg();
        regisTer();
        logIn();
    })
}

runPage();