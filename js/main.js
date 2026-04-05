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

    // Products are now rendered directly by Jekyll in index.html

    // Modal logic
    function openModal(title, price, description, imageUrl) {
        modalProductName.textContent = title;
        
        // Construct the detailed message
        const message = `Hi Lovemade Studio! I would like to make an enquiry about a product:\\n\\n*${title}*\\n*Price:* ${price}\\n*Description:* ${description}\\n\\n*Image Reference:* ${imageUrl}\\n\\nHow can we proceed with the order?`;
        
        const waMessage = encodeURIComponent(message);
        
        // Update WhatsApp link based on product
        if (WA_NUMBER) {
            waLink.href = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;
            waLink.style.display = "block";
        } else {
            // Default WhatsApp link. Once a number is provided, this will route perfectly.
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
            const price = e.target.getAttribute('data-price');
            const desc = e.target.getAttribute('data-description');
            const image = e.target.getAttribute('data-image');
            openModal(title, price, desc, image);
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
