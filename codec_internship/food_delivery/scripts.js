// Global variables
let cart = [];
let currentRestaurant = null;
let currentOrders = [];
let orderHistory = [];
let currentItemForCustomization = null;

// Sample data
const restaurants = [
    {
        id: 1,
        name: "Pizza Palace",
        cuisine: "Italian",
        rating: 4.5,
        deliveryTime: "25-35 min",
        image: "🍕",
        categories: ["Pizzas", "Sides", "Drinks"],
        menu: {
            "Pizzas": [
                {
                    id: 1,
                    name: "Margherita Pizza",
                    description: "Fresh tomatoes, mozzarella cheese, basil leaves",
                    price: 12.99,
                    image: "🍕",
                    sizes: [
                        { name: "Small", price: 0 },
                        { name: "Medium", price: 3 },
                        { name: "Large", price: 6 }
                    ],
                    addons: [
                        { name: "Extra Cheese", price: 2 },
                        { name: "Pepperoni", price: 3 },
                        { name: "Mushrooms", price: 2 }
                    ]
                },
                {
                    id: 2,
                    name: "Pepperoni Pizza",
                    description: "Pepperoni, mozzarella cheese, tomato sauce",
                    price: 15.99,
                    image: "🍕",
                    sizes: [
                        { name: "Small", price: 0 },
                        { name: "Medium", price: 3 },
                        { name: "Large", price: 6 }
                    ],
                    addons: [
                        { name: "Extra Cheese", price: 2 },
                        { name: "Extra Pepperoni", price: 3 },
                        { name: "Olives", price: 2 }
                    ]
                }
            ],
            "Sides": [
                {
                    id: 3,
                    name: "Garlic Bread",
                    description: "Crispy bread with garlic butter and herbs",
                    price: 6.99,
                    image: "🥖"
                }
            ],
            "Drinks": [
                {
                    id: 4,
                    name: "Coca Cola",
                    description: "Refreshing cola drink",
                    price: 2.99,
                    image: "🥤"
                }
            ]
        }
    },
    {
        id: 2,
        name: "Burger House",
        cuisine: "American",
        rating: 4.3,
        deliveryTime: "20-30 min",
        image: "🍔",
        categories: ["Burgers", "Sides", "Drinks"],
        menu: {
            "Burgers": [
                {
                    id: 5,
                    name: "Classic Burger",
                    description: "Beef patty, lettuce, tomato, cheese, special sauce",
                    price: 10.99,
                    image: "🍔",
                    addons: [
                        { name: "Extra Patty", price: 4 },
                        { name: "Bacon", price: 2 },
                        { name: "Avocado", price: 1.5 }
                    ]
                },
                {
                    id: 6,
                    name: "Chicken Burger",
                    description: "Grilled chicken breast, lettuce, mayo",
                    price: 9.99,
                    image: "🍔",
                    addons: [
                        { name: "Extra Chicken", price: 3 },
                        { name: "Cheese", price: 1 },
                        { name: "Spicy Sauce", price: 0.5 }
                    ]
                }
            ],
            "Sides": [
                {
                    id: 7,
                    name: "French Fries",
                    description: "Crispy golden fries",
                    price: 4.99,
                    image: "🍟"
                }
            ],
            "Drinks": [
                {
                    id: 8,
                    name: "Milkshake",
                    description: "Creamy vanilla milkshake",
                    price: 5.99,
                    image: "🥤"
                }
            ]
        }
    },
    {
        id: 3,
        name: "Sushi Zen",
        cuisine: "Japanese",
        rating: 4.7,
        deliveryTime: "30-40 min",
        image: "🍣",
        categories: ["Sushi", "Rolls", "Drinks"],
        menu: {
            "Sushi": [
                {
                    id: 9,
                    name: "Salmon Sushi",
                    description: "Fresh salmon over seasoned rice",
                    price: 8.99,
                    image: "🍣"
                }
            ],
            "Rolls": [
                {
                    id: 10,
                    name: "California Roll",
                    description: "Crab, avocado, cucumber, sesame seeds",
                    price: 12.99,
                    image: "🍣"
                }
            ],
            "Drinks": [
                {
                    id: 11,
                    name: "Green Tea",
                    description: "Traditional Japanese green tea",
                    price: 3.99,
                    image: "🍵"
                }
            ]
        }
    }
];

// Sample current orders
currentOrders = [
    {
        id: 12345,
        restaurant: "Pizza Palace",
        items: ["Margherita Pizza", "Garlic Bread"],
        total: 19.98,
        status: "preparing",
        estimatedTime: "25 min",
        driver: {
            name: "Mike Johnson",
            phone: "+1234567890"
        }
    },
    {
        id: 12346,
        restaurant: "Burger House",
        items: ["Classic Burger", "French Fries"],
        total: 15.98,
        status: "on-way",
        estimatedTime: "10 min",
        driver: {
            name: "Sarah Wilson",
            phone: "+1234567891"
        }
    }
];

// Sample order history
orderHistory = [
    {
        id: 12340,
        restaurant: "Sushi Zen",
        items: ["California Roll", "Green Tea"],
        total: 16.98,
        status: "delivered",
        date: "2024-05-29"
    },
    {
        id: 12341,
        restaurant: "Pizza Palace",
        items: ["Pepperoni Pizza", "Coca Cola"],
        total: 18.98,
        status: "delivered",
        date: "2024-05-28"
    }
];

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const restaurantGrid = document.getElementById('restaurantGrid');
const searchInput = document.getElementById('searchInput');
const categoryCards = document.querySelectorAll('.category-card');

// Modal elements
const customizationModal = document.getElementById('customizationModal');
const closeModal = document.getElementById('closeModal');
const trackingModal = document.getElementById('trackingModal');
const closeTrackingModal = document.getElementById('closeTrackingModal');

// Menu elements
const backToHome = document.getElementById('backToHome');
const restaurantName = document.getElementById('restaurantName');
const restaurantRating = document.getElementById('restaurantRating');
const deliveryTime = document.getElementById('deliveryTime');
const menuTabs = document.getElementById('menuTabs');
const menuItems = document.getElementById('menuItems');

// Cart elements
const cartItems = document.getElementById('cartItems');
const subtotal = document.getElementById('subtotal');
const deliveryFee = document.getElementById('deliveryFee');
const tax = document.getElementById('tax');
const total = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');

// Order elements
const tabBtns = document.querySelectorAll('.tab-btn');
const currentOrdersList = document.getElementById('currentOrdersList');
const orderHistoryList = document.getElementById('orderHistoryList');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    renderRestaurants();
    renderCurrentOrders();
    renderOrderHistory();
    updateCartUI();
});

function initializeApp() {
    // Set active section
    showSection('home');
    
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('foodDeliveryCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('href').substring(1);
            showSection(targetSection);
        });
    });

    // Cart
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', closeAllModals);

    // Search
    searchInput.addEventListener('input', handleSearch);

    // Categories
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            filterRestaurantsByCategory(category);
        });
    });

    // Menu navigation
    backToHome.addEventListener('click', () => showSection('home'));

    // Modals
    closeModal.addEventListener('click', () => closeModal());
    closeTrackingModal.addEventListener('click', () => closeTrackingModal());

    // Order tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchOrderTab(tab);
        });
    });

    // Checkout
    checkoutBtn.addEventListener('click', processCheckout);

    // Quantity controls in customization modal
    document.getElementById('decreaseQty').addEventListener('click', () => updateQuantity(-1));
    document.getElementById('increaseQty').addEventListener('click', () => updateQuantity(1));
    document.getElementById('addToCartBtn').addEventListener('click', addCustomizedItemToCart);
}

function showSection(sectionId) {
    // Update navigation
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });

    // Update sections
    sections.forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });
}

function renderRestaurants(restaurantsToRender = restaurants) {
    restaurantGrid.innerHTML = '';
    
    restaurantsToRender.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'restaurant-card';
        restaurantCard.innerHTML = `
            <div class="restaurant-image">
                ${restaurant.image}
            </div>
            <div class="restaurant-info">
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                <div class="restaurant-meta">
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${restaurant.rating}</span>
                    </div>
                    <div class="delivery-time">
                        <i class="fas fa-clock"></i>
                        <span>${restaurant.deliveryTime}</span>
                    </div>
                </div>
            </div>
        `;
        
        restaurantCard.addEventListener('click', () => {
            openRestaurant(restaurant);
        });
        
        restaurantGrid.appendChild(restaurantCard);
    });
}

function openRestaurant(restaurant) {
    currentRestaurant = restaurant;
    
    // Update restaurant info
    restaurantName.textContent = restaurant.name;
    restaurantRating.textContent = restaurant.rating;
    deliveryTime.textContent = restaurant.deliveryTime;
    
    // Render menu tabs
    renderMenuTabs(restaurant.categories);
    
    // Render menu items for first category
    renderMenuItems(restaurant.menu[restaurant.categories[0]]);
    
    showSection('menu');
}

function renderMenuTabs(categories) {
    menuTabs.innerHTML = '';
    
    categories.forEach((category, index) => {
        const tab = document.createElement('button');
        tab.className = `category-tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = category;
        tab.addEventListener('click', () => {
            // Update active tab
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Render items for selected category
            renderMenuItems(currentRestaurant.menu[category]);
        });
        
        menuTabs.appendChild(tab);
    });
}

function renderMenuItems(items) {
    menuItems.innerHTML = '';
    
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'menu-category';
    
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-content">
                <div class="menu-item-info">