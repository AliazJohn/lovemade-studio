document.addEventListener('DOMContentLoaded', () => {
    // Inject the current year into the footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Elements
    const grid = document.getElementById('productGrid');
    const modal = document.getElementById('purchaseModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalProductName = document.getElementById('modalProductName');
    const igLink = document.getElementById('igLink');
    const waLink = document.getElementById('waLink');

    // Phone number placeholder for WhatsApp. The user might change this later.
    const WA_NUMBER = ""; // Example format: "1234567890"

    // Render products
    if (typeof products !== 'undefined') {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                </div>
                <div class="product-details">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-desc">${product.description}</p>
                    <p class="product-price">${product.price}</p>
                    <button class="btn-purchase" data-title="${product.title}">Purchase</button>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    // Modal logic
    function openModal(productTitle) {
        modalProductName.textContent = productTitle;
        
        // Update WhatsApp link based on product
        const waMessage = encodeURIComponent(`Hi Lovemade Studio! I'm interested in ordering the custom ${productTitle}.`);
        if (WA_NUMBER) {
            waLink.href = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;
            waLink.style.display = "block";
        } else {
            // Default WhatsApp link without a number if not provided, just drops to general WhatsApp
            waLink.href = `https://wa.me/?text=${waMessage}`; 
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Setup Purchase Buttons Event Delegation
    grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-purchase')) {
            const title = e.target.getAttribute('data-title');
            openModal(title);
        }
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
