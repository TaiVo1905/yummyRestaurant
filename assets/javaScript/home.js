function renderFeaturedDishes(){
    fetch('../assets/Data/data.json')
        .then(response => response.json()) //khi fetch dữ liệu nó sẽ trở thành RESPONSE -> chuyển thành object JS
        .then(data => { //return data đại diện cho đối  tượng được trả về
            const menuAllDish = document.getElementById('body-menu'); //nơi để đưa thông tin các món ăn vào
                data.featuredDishes.forEach(dish => { //duyệt từng phần tử trong featuredDishes
                    menuAllDish.innerHTML += `
                        <div class="menu_card">
                            <div class="card_dish">
                                <img src="${dish.image_url}">
                            </div>
                            <h5>${dish.name}</h5>
                            <h6>${dish.price}</h6>
                            <button>Thêm vào giỏ hàng</button>
                        </div>
                    `;
                });
        })
}

renderFeaturedDishes();
        
    