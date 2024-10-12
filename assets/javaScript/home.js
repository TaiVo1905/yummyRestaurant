fetch('../assets/Data/data.json')
    .then(response => response.json()) //khi fetch dữ liệu nó sẽ trở thành RESPONSE nên phải chuyển thành JSON
    .then(data => { //chứa JSON đã được chuyển đổi thành đối tượng
        const menuAllDish = document.getElementById('body-menu'); //nơi để đưa thông tin các món ăn vào
        data.featuredDishes.forEach(dish => {
            const cardDish = document.createElement('createDiv'); //tạo div mẫu
            cardDish.className = 'menu_card'; //đặt tên cho card này để ăn css
            cardDish.innerHTML = `
                <div class="card_dish">
                    <img src="${dish.image_url}">
                </div>
                <h5>${dish.name}</h5>
                <h6>${dish.price}</h6>
                <button>Thêm vào giỏ hàng</button>
            `;
            menuAllDish.appendChild(cardDish); //thêm cardDish vào menuAllDish
        });
    })
    // .catch(error => console.error('Error loading menu:', error)); CHƯA TÌM HIỂU (Nếu có lỗi trong quá trình tải hoặc xử lý dữ liệu, phần này sẽ bắt lỗi và in ra console với thông báo.)
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
    handleLogAndRegModal();