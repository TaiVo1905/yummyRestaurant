// Chuyển đổi giữa form đăng ký và đăng nhập
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
// Xử lý đăng ký
document.getElementById('register_Form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    const lastName = this.lastName.value.trim();
    const firstName = this.firstName.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    // Lấy danh sách người dùng đã đăng ký từ localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('Email đã được sử dụng!');
    } else {
        users.push({ lastName, firstName, email, password });
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
        this.reset(); // Đặt lại form
    }
});
// Xử lý đăng nhập
document.getElementById('login_Form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    // Kiểm tra thông tin đăng nhập
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert('Đăng nhập thành công!');
        // Chuyển hướng hoặc thực hiện hành động khác
        window.location.href = 'home.html';
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});