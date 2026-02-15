document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-items-list');
    const totalAmount = document.getElementById('total-amount');
    const totalCount = document.getElementById('total-count');

    function render() {
        // Отримуємо актуальні дані з пам'яті
        let cart = JSON.parse(localStorage.getItem('samsung_cart')) || [];
        cartList.innerHTML = '';
        let sum = 0;
        let count = 0;

        if (cart.length === 0) {
            cartList.innerHTML = `
                <div style="text-align:center; padding: 50px;">
                    <i class="fas fa-shopping-basket" style="font-size: 50px; color: #ddd;"></i>
                    <p>Ваш кошик порожній</p>
                </div>`;
            totalAmount.innerText = "0 ₴";
            totalCount.innerText = "0";
            return;
        }

        cart.forEach((item, index) => {
            sum += item.price * item.quantity;
            count += item.quantity;

            cartList.innerHTML += `
                <div class="cart-item-card">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price.toLocaleString()} ₴</p>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                    <div class="item-remove">
                        <i class="fas fa-trash" style="color: #ccc; cursor:pointer;" onclick="removeItem(${index})"></i>
                    </div>
                </div>
            `;
        });

        totalAmount.innerText = sum.toLocaleString() + " ₴";
        totalCount.innerText = count;
    }

    // Зміна кількості
    window.updateQty = (index, change) => {
        let cart = JSON.parse(localStorage.getItem('samsung_cart'));
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        localStorage.setItem('samsung_cart', JSON.stringify(cart));
        render();
    };

    // Видалення
    window.removeItem = (index) => {
        let cart = JSON.parse(localStorage.getItem('samsung_cart'));
        cart.splice(index, 1);
        localStorage.setItem('samsung_cart', JSON.stringify(cart));
        render();
    };

    // Очистити все
    document.getElementById('clear-cart').onclick = () => {
        localStorage.removeItem('samsung_cart');
        render();
    };

    render();
});
