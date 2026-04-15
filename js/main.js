document.addEventListener('DOMContentLoaded', () => {

    // Inject the current year into the footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Elements
    const grid = document.getElementById('productGrid');
    const modal = document.getElementById('purchaseModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalProductName = document.getElementById('modalProductName');
    const waLink = document.getElementById('waLink');

    const WA_NUMBER = "918281516879";

    // ── Carousel Initialisation ──────────────────────────────────────────
    document.querySelectorAll('.product-card').forEach(card => {
        const imgs = card.querySelectorAll('.carousel-img');
        if (imgs.length <= 1) return; // single item — no carousel needed

        const dots = card.querySelectorAll('.dot');
        const prevBtn = card.querySelector('.carousel-prev');
        const nextBtn = card.querySelector('.carousel-next');
        let current = 0;

        function goTo(index) {
            imgs[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (index + imgs.length) % imgs.length;
            imgs[current].classList.add('active');
            dots[current].classList.add('active');
            updateDetails(card, imgs[current]);
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));

        // Dot navigation
        dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

        // Touch / swipe support
        let touchStartX = 0;
        const track = card.querySelector('.carousel-track');
        track.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                diff > 0 ? goTo(current + 1) : goTo(current - 1);
            }
        }, { passive: true });
    });

    // Update the card's details panel when the active slide changes
    function updateDetails(card, img) {
        card.querySelector('.product-title').textContent     = img.dataset.title;
        card.querySelector('.product-desc').textContent      = img.dataset.description;
        card.querySelector('.product-price').textContent     = img.dataset.price;

        const btn = card.querySelector('.btn-purchase');
        btn.dataset.id          = img.dataset.id;
        btn.dataset.title       = img.dataset.title;
        btn.dataset.price       = img.dataset.price;
        btn.dataset.description = img.dataset.description;
        btn.dataset.category    = img.dataset.category;
        btn.dataset.image       = img.dataset.image;
    }

    // ── Modal Logic ──────────────────────────────────────────────────────
    function openModal(productId, title, price, description, category, imageUrl) {
        modalProductName.textContent = title;

        // Construct the WhatsApp message — product ID first for easy tracking
        const message =
            `Hi Lovemade Studio! I would like to enquire about:\n\n` +
            `*Product ID:* ${productId}\n` +
            `*Category:* ${category}\n` +
            `*Item:* ${title}\n` +
            `*Price:* ${price}\n` +
            `*Description:* ${description}\n\n` +
            `*Image Reference:* ${imageUrl}\n\n` +
            `How can we proceed with the order?`;

        waLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // ── Purchase Button (event delegation) ──────────────────────────────
    grid.addEventListener('click', e => {
        if (e.target.classList.contains('btn-purchase')) {
            const { id, title, price, description, category, image } = e.target.dataset;
            openModal(id, title, price, description, category, image);
        }
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
});
