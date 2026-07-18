document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- Cart Drawer Logic ---
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const emptyCartMsg = document.querySelector('.empty-cart-msg');

    let cart = [];

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('show');
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('show');
    }

    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    function updateCartUI() {
        // Update count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;

        // Update items display
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.appendChild(emptyCartMsg);
            emptyCartMsg.style.display = 'block';
        } else {
            emptyCartMsg.style.display = 'none';
            cart.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.style.display = 'flex';
                itemEl.style.justifyContent = 'space-between';
                itemEl.style.alignItems = 'center';
                itemEl.style.marginBottom = '15px';
                itemEl.style.paddingBottom = '15px';
                itemEl.style.borderBottom = '1px solid #f9ebea';

                itemEl.innerHTML = `
                    <div>
                        <h4 style="font-size: 1rem; margin-bottom: 5px;">${item.name}</h4>
                        <p style="font-size: 0.9rem; color: #795548;">$${item.price} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item" data-index="${index}" style="background: none; border: none; color: #3e2723; cursor: pointer;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        // Update total
        const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
        cartTotalPriceEl.textContent = `$${total.toFixed(2)}`;

        // Attach remove event listeners
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const price = btn.getAttribute('data-price');
            
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            updateCartUI();
            openCart();
        });
    });

    // --- Form Submission Simulation ---
    const bookingForm = document.getElementById('booking-form');
    const formSuccess = document.getElementById('form-success');

    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formSuccess.style.display = 'block';
            bookingForm.reset();
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }
});
