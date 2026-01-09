// Product Database
const products = [
    {
        id: 1,
        name: 'iPhone 13 Pro',
        category: 'mobile',
        price: 52999,
        originalPrice: 79999,
        condition: 'Superb',
        image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500',
        features: ['128GB Storage', 'A15 Bionic Chip', '6 Month Warranty', 'ProMotion Display'],
        description: 'Premium refurbished iPhone 13 Pro in excellent condition with all accessories.',
        ram: '6GB',
        storage: '128GB'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S22',
        category: 'mobile',
        price: 38999,
        originalPrice: 59999,
        condition: 'Good',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        features: ['128GB Storage', 'Snapdragon 8 Gen 1', '6 Month Warranty', '120Hz Display'],
        description: 'Samsung Galaxy S22 with minimal usage marks, fully functional.',
        ram: '8GB',
        storage: '128GB'
    },
    {
        id: 3,
        name: 'MacBook Air M1',
        category: 'laptop',
        price: 54999,
        originalPrice: 89999,
        condition: 'Superb',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        features: ['8GB RAM', '256GB SSD', 'Apple M1 Chip', '6 Month Warranty'],
        description: 'MacBook Air M1 in pristine condition with original charger and box.',
        ram: '8GB',
        storage: '256GB'
    },
    {
        id: 4,
        name: 'iPad Air 2022',
        category: 'tablet',
        price: 42999,
        originalPrice: 59999,
        condition: 'Superb',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        features: ['64GB Storage', 'M1 Chip', 'Apple Pencil Support', '10.9" Display'],
        description: 'iPad Air with M1 chip, perfect for productivity and entertainment.',
        ram: '8GB',
        storage: '64GB'
    },
    {
        id: 5,
        name: 'Apple Watch Series 7',
        category: 'watch',
        price: 28999,
        originalPrice: 42999,
        condition: 'Good',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
        features: ['GPS + Cellular', 'Always-On Display', 'Health Monitoring', '6 Month Warranty'],
        description: 'Apple Watch Series 7 with all health features working perfectly.',
        ram: 'N/A',
        storage: '32GB'
    },
    {
        id: 6,
        name: 'OnePlus 11',
        category: 'mobile',
        price: 44999,
        originalPrice: 61999,
        condition: 'Superb',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        features: ['256GB Storage', 'Snapdragon 8 Gen 2', 'Hasselblad Camera', '100W Charging'],
        description: 'OnePlus 11 flagship with premium build and fast charging.',
        ram: '12GB',
        storage: '256GB'
    },
    {
        id: 7,
        name: 'Dell XPS 13',
        category: 'laptop',
        price: 62999,
        originalPrice: 99999,
        condition: 'Good',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        features: ['16GB RAM', '512GB SSD', 'Intel i7 11th Gen', 'FHD Display'],
        description: 'Dell XPS 13 premium ultrabook with excellent performance.',
        ram: '16GB',
        storage: '512GB'
    },
    {
        id: 8,
        name: 'Samsung Galaxy Tab S8',
        category: 'tablet',
        price: 35999,
        originalPrice: 52999,
        condition: 'Superb',
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500',
        features: ['128GB Storage', 'Snapdragon 8 Gen 1', 'S Pen Included', '11" Display'],
        description: 'Samsung Galaxy Tab S8 with S Pen for productivity.',
        ram: '8GB',
        storage: '128GB'
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartUI();
    setupEventListeners();
    setupSmoothScroll();
});

// Setup Event Listeners
function setupEventListeners() {
    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.category;
            displayProducts();
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        displayProducts(searchTerm);
    });

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    });

    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
}

// Setup Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
}

// Display Products
function displayProducts(searchTerm = '') {
    const grid = document.getElementById('productsGrid');
    let filteredProducts = products;

    // Filter by category
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
    }

    // Filter by search
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <span class="product-condition">${product.condition} Condition</span>
                <ul class="product-features">
                    ${product.features.slice(0, 3).map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                </ul>
                <div class="product-pricing">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <span class="product-original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <span class="product-discount">${Math.round((1 - product.price/product.originalPrice) * 100)}% OFF</span>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); askQuestion(${product.id})">
                        <i class="fas fa-question-circle"></i> Ask
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show Product Details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 12px;">
            </div>
            <div>
                <span class="product-category">${product.category}</span>
                <h2 style="margin: 0.5rem 0;">${product.name}</h2>
                <span class="product-condition">${product.condition} Condition</span>
                <p style="margin: 1rem 0; color: var(--text-light); line-height: 1.6;">${product.description}</p>
                
                <div style="margin: 1.5rem 0;">
                    <h4 style="margin-bottom: 0.75rem;">Specifications:</h4>
                    <ul class="product-features">
                        ${product.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                        <li><i class="fas fa-check"></i> RAM: ${product.ram}</li>
                        <li><i class="fas fa-check"></i> Storage: ${product.storage}</li>
                    </ul>
                </div>
                
                <div class="product-pricing" style="margin: 1.5rem 0;">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <span class="product-original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <span class="product-discount">${Math.round((1 - product.price/product.originalPrice) * 100)}% OFF</span>
                
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.85rem;" onclick="addToCart(${product.id}); closeProductModal();">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;

    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        alert('This item is already in your cart!');
        return;
    }

    cart.push({...product, quantity: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '₹0';
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('active');
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Checkout Functions
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('checkoutSubtotal').textContent = `₹${total.toLocaleString('en-IN')}`;
    document.getElementById('checkoutTotal').textContent = `₹${total.toLocaleString('en-IN')}`;

    toggleCart();
    document.getElementById('checkoutModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

async function handleCheckout(e) {
    e.preventDefault();

    // Get form data
    const customerData = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value
    };

    // Simulate payment processing
    showProcessingOverlay();

    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate order
    const order = {
        orderId: 'GD' + Date.now(),
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN'),
        customer: customerData,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + item.price, 0),
        delivery: 0,
        total: cart.reduce((sum, item) => sum + item.price, 0)
    };

    // Generate PDF Invoice
    generateInvoice(order);

    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();

    // Hide processing overlay
    hideProcessingOverlay();

    // Close modal
    closeCheckoutModal();

    // Show success message
    alert(`✅ Order placed successfully!\n\nOrder ID: ${order.orderId}\n\nYour invoice has been downloaded.\n\nThank you for shopping with Genuine Devices!`);
}

// Processing Overlay
function showProcessingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'processingOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 5000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    overlay.innerHTML = `
        <div style="background: white; padding: 2.5rem; border-radius: 12px; text-align: center; max-width: 90%;">
            <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--primary-color);"></i>
            <p style="margin-top: 1rem; font-size: 1.1rem; font-weight: 600;">Processing your payment...</p>
            <p style="margin-top: 0.5rem; color: var(--text-light);">Please wait</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideProcessingOverlay() {
    const overlay = document.getElementById('processingOverlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 4000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i> ${message}
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Generate PDF Invoice
function generateInvoice(order) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('GENUINE DEVICES', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Tax Invoice', 105, 30, { align: 'center' });

    // Order Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.orderId}`, 20, 50);
    doc.text(`Date: ${order.date}`, 20, 56);
    doc.text(`Time: ${order.time}`, 20, 62);

    // Customer Info
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, 75);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(order.customer.name, 20, 82);
    doc.text(order.customer.email, 20, 88);
    doc.text(order.customer.phone, 20, 94);
    doc.text(`${order.customer.address}, ${order.customer.city}`, 20, 100);
    doc.text(`${order.customer.state} - ${order.customer.pincode}`, 20, 106);

    // Items Table
    let yPos = 120;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, 170, 8, 'F');
    
    doc.setFont(undefined, 'bold');
    doc.text('Product', 25, yPos + 5);
    doc.text('Condition', 110, yPos + 5);
    doc.text('Price', 175, yPos + 5, { align: 'right' });

    yPos += 12;
    doc.setFont(undefined, 'normal');
    
    order.items.forEach(item => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name, 25, yPos);
        doc.text(item.condition, 110, yPos);
        doc.text(`₹${item.price.toLocaleString('en-IN')}`, 175, yPos, { align: 'right' });
        yPos += 8;
    });

    // Totals
    yPos += 10;
    doc.line(20, yPos, 190, yPos);
    yPos += 8;

    doc.text('Subtotal:', 120, yPos);
    doc.text(`₹${order.subtotal.toLocaleString('en-IN')}`, 175, yPos, { align: 'right' });
    yPos += 8;

    doc.text('Delivery:', 120, yPos);
    doc.text('Free', 175, yPos, { align: 'right' });
    yPos += 8;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Total:', 120, yPos);
    doc.text(`₹${order.total.toLocaleString('en-IN')}`, 175, yPos, { align: 'right' });

    // Footer
    yPos += 20;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for shopping with Genuine Devices!', 105, yPos, { align: 'center' });
    doc.text('For support: info@genuinedevices.com | +91 82485 99468', 105, yPos + 5, { align: 'center' });
    doc.text('Designed by Thosho Tech - https://thosho.github.io/', 105, yPos + 10, { align: 'center' });
    doc.text('This is a computer-generated invoice', 105, yPos + 15, { align: 'center' });

    // Save PDF
    doc.save(`Invoice_${order.orderId}.pdf`);
}

// Ask Question Function
function askQuestion(productId) {
    const product = products.find(p => p.id === productId);
    const message = `Hi, I'm interested in the ${product.name}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/918248599468?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
