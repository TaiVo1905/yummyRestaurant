function renderHeader () {
    const header = document.querySelector('.header');
    header.innerHTML = `
                        <div class="header_logo">
                            <div class="logo">
                                <!-- <img src="../assets/image/logo.jpg" alt=""> -->
                            </div>
                        </div>
                        <!-- Menu Icon -->
                        <label for="nav_mobile_input" class="menu_icon">
                            <i class="fa-solid fa-bars"></i>
                        </label>
                        <input type="checkbox" name="" hidden class="nav_input" id="nav_mobile_input">
                        <div class="header_nav" id="nav_Menu">
                            <!-- Close Icon -->
                            <label for="nav_mobile_input" class="menu_icon_close">
                                <i class="fa-solid fa-xmark"></i>
                            </label>
                            <ul>
                                <li><a class="active" href="./index.html">TRANG CHỦ</a></li>
                                <li><a class="active" href="./menu.html">ĐẶT MÓN</a></li>
                                <li><a class="active" href="./bookTable.html">ĐẶT BÀN</a></li>
                                <li><a class="active" href="./contact.html">LIÊN HỆ</a></li>
                            </ul>
                        </div>
                        <div class="header-right">
                            <div class="searchBar">
                                <input class="search_input" id="search_input" type="search" placeholder="Tìm kiếm...">
                                <button class="btn_search" id="btn_search">Tìm Kiếm</button>
                                
                            </div>
                            <div class="header_cart">
                                <div>
                                    <a href="./cart.html" style="color: #000"><i class="cart_logo fa-solid fa-cart-shopping"></i></a>
                                </div>
                                <div class="quantity_cart"><p id="quantity_cart"></p></div>
                            </div>
                            <div class="header_regiter">
                                <i class="regiter_logo fa-solid fa-user" id="logAndReg"></i>
                            </div>
                        </div>
                    `
}

function renderFooter () {
    const footer = document.querySelector('.footer');
    footer.innerHTML = `
                        <div class="footer_card">
                            <div class="card_textTop"><b>Địa chỉ</b></div><br/>
                            <div class="card_textBottom">99 Tô Hiến Thành - Phước Mỹ<br>Sơn Trà - Đà Nẵng</div>
                        </div>
                        <div class="footer_card">
                            <div class="card_textTop"><b>Thời Gian</b></div><br/>
                            <div class="card_textBottom">8h00 - 23h59<br/> Monday - Sunday</div>
                        </div>
                        <div class="footer_card">
                            <div class="card_textTop"><b>Email</b></div><br/>
                            <div class="card_textBottom">yummyrestaurant1905@gmail.com</div>
                        </div>
                        <div class="footer_card">
                            <div class="card_textTop"><b>Theo Dõi</b></div><br/>
                            <div class="card_logo">
                                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                                    <a href="#"><i class="fa-brands fa-square-instagram"></i></a>
                                    <a href="#"><i class="fa-solid fa-phone-volume"></i></a>
                            </div>
                        </div>
                    `
}

function renderLogAndReg () {
    const logAndRegModal = document.querySelector('#logAndReg_modal');
    logAndRegModal.innerHTML = `
                            <div class="containers_logandreg" id="registerContainer">
                                <form id="register_Form">
                                    <h1 class="title_register">ĐĂNG KÝ</h1>
                                    <div class="input_register">
                                        <i class="fa-solid fa-user register_icon"></i>
                                        <input type="text" name="lastName" class="register_lastName" placeholder="Họ" required>
                                    </div>
                                    <div class="input_register">
                                    <i class="fa-solid fa-user register_icon"></i>
                                        <input type="text" name="firstName" class="register_firstName" placeholder="Tên" required>
                                    </div>
                                    <div class="input_register">
                                        <i class="fa-solid fa-envelope register_icon"></i>
                                        <input type="email" name="email" class="register_email" placeholder="Email của bạn" required>
                                    </div>
                                    <div class="input_register">
                                        <i class="fa-solid fa-lock register_icon"></i>
                                        <input type="password" name="password" class="register_password" placeholder="Nhập mật khẩu" minlength="6" required>
                                    </div>
                                    <div class="input_register">
                                        <i class="fa-solid fa-lock register_icon"></i>
                                        <input type="password" name="confirm_password" class="register_confirm" placeholder="Nhập lại mật khẩu" minlength="6" required>
                                    </div>
                                    <button type="submit" class="register_button">Đăng ký</button>
                                    <div class="register_prompt">Bạn đã có tài khoản? <a href="#" id="switchToLogin">Đăng nhập</a></div>
                                </form>
                            </div>
                            <div class="containers_logandreg" id="loginContainer" style="display: none;">
                                <form id="login_Form">
                                    <h1 class="title_login">ĐĂNG NHẬP</h1>
                                    <div class="input_login">
                                        <i class="fa-solid fa-envelope login_icon"></i>
                                        <input type="email" name="email" class="login_email" placeholder="Email của bạn" required>
                                    </div>
                                    <div class="input_login">
                                        <i class="fa-solid fa-lock login_icon"></i>
                                        <input type="password" name="password" class="login_password" placeholder="Nhập mật khẩu" required>
                                    </div>
                                    <button type="submit" class="login_button">Đăng nhập</button>
                                    <div class="login_prompt">Bạn chưa có tài khoản? <a href="#" id="switchToRegister">Đăng ký</a></div>
                                </form>
                            </div>
                        `
}

function renderInfoUser () {
    const infoUserModal = document.querySelector('#personalInformation_modal');
    infoUserModal.innerHTML = `
                                <div class="information_Form" id="information_Form">
                                    <form id="information_frm">
                                        <h1 class="information_title">THÔNG TIN CÁ NHÂN</h1>
                                        <div class="input_information">
                                            <i class="fa-solid fa-user information_icon"></i>
                                            <input type="text" name="lastName" class="information_lastName" readonly>
                                        </div>
                                        <div class="input_information">
                                        <i class="fa-solid fa-user information_icon"></i>
                                            <input type="text" name="firstName" class="information_firstName" readonly>
                                        </div>
                                        <div class="input_information">
                                            <i class="fa-solid fa-envelope information_icon"></i>
                                            <input type="email" name="email" class="information_email" readonly>
                                        </div>
                                        <div class="input_information">
                                            <i class="fa-solid fa-phone information_icon"></i>
                                            <input type="tel" name="phoneNumer" class="information_phoneNumber" placeholder="Nhập số điện thoại của bạn" required>
                                        </div>
                                        <div class="btn_information">
                                            <button class="password_button" id="password_button">Đổi mật khẩu</button>
                                            <input type="submit" class="update_phone" id="update_phone" value="Cập nhật">
                                            <button class="logout_button" id="logout_button">Đăng xuất</button>
                                        </div>
                                    </form>
                                </div>
                            `
}

function renderChangePassModal () {
    const changPassModal = document.querySelector('#changePassword_modal');
    changPassModal.innerHTML = `
                                <div class="password_Form" id="password_Form">
                                    <form id="password_frm">
                                        <h1 class="passwordfrm_title">THAY ĐỔI MẬT KHẨU</h1>
                                        <div class="input_password">
                                            <i class="fa-solid fa-lock password_icon"></i>
                                            <input type="password" name="current_password" class="password_current" placeholder="Mật khẩu cũ" required>
                                        </div>
                                        <div class="input_password">
                                            <i class="fa-solid fa-key password_icon"></i>
                                            <input type="password" name="new_password" class="password_new" placeholder="Mật khẩu mới" minlength="6" required>
                                        </div>
                                        <div class="input_password">
                                            <i class="fa-solid fa-key password_icon"></i>
                                            <input type="password" name="confirm_newPassword" class="password_newConfirm" placeholder="Xác nhận mật khẩu mới" required>
                                        </div>
                                        <div class="btn_passwordfrm">
                                            <input type="submit" class="update_button" id="update_button" value = "Cập nhật">
                                            <button class="cancel_button" id="cancel_button">Hủy bỏ</button>
                                        </div>
                                    </form>
                                </div>
                            `
}

function runPage() {
    document.addEventListener('DOMContentLoaded', () => {
        renderInfoUser();
        renderChangePassModal();
        if (window.location.pathname == '/admin.html' || window.location.pathname == '/ymmyRestaurantWebsite/admin.html'){
            return;
        }
        renderHeader();
        renderFooter();
        renderLogAndReg();
    })
}

runPage();