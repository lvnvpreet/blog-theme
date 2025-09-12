// HealthBlog Theme JavaScript - Double Header Version

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle for Double Header
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            mobileMenuToggle.classList.toggle('active');
            
            // Close dropdown menus when mobile menu closes
            if (!navMenu.classList.contains('mobile-active')) {
                const dropdowns = document.querySelectorAll('.dropdown-menu');
                dropdowns.forEach(dropdown => dropdown.style.display = 'none');
            }
        });
    }
    
    // Mobile Dropdown Toggle
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.parentElement.querySelector('.dropdown-menu')) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = this.parentElement.querySelector('.dropdown-menu');
                    const isVisible = dropdown.style.display === 'block';
                    
                    // Hide all dropdowns first
                    const allDropdowns = document.querySelectorAll('.dropdown-menu');
                    allDropdowns.forEach(d => d.style.display = 'none');
                    
                    // Toggle current dropdown
                    dropdown.style.display = isVisible ? 'none' : 'block';
                }
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-navigation')) {
            navMenu?.classList.remove('mobile-active');
            mobileMenuToggle?.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu?.classList.remove('mobile-active');
            mobileMenuToggle?.classList.remove('active');
            
            // Reset dropdown display for desktop
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => dropdown.style.display = '');
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const elementPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced Search Form
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        // Add search suggestions (placeholder for future enhancement)
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('search-active');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('search-active');
        });
        
        searchForm.addEventListener('submit', function(e) {
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.focus();
                searchInput.setAttribute('placeholder', 'Please enter a search term');
                
                setTimeout(() => {
                    searchInput.setAttribute('placeholder', 'Search for Articles, Recipes, & More');
                }, 2000);
            }
        });
    }
    
    // Newsletter form handling
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                // Show success message
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.textContent = 'Subscribed!';
                button.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    form.reset();
                }, 2000);
            }
        });
    });
    
    // Social share functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = this.getAttribute('href');
            const width = 600;
            const height = 400;
            const left = (screen.width / 2) - (width / 2);
            const top = (screen.height / 2) - (height / 2);
            
            window.open(url, 'share', `width=${width},height=${height},left=${left},top=${top}`);
        });
    });
    
    // Reading progress indicator
    const article = document.querySelector('.post-content');
    if (article) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.appendChild(progressBar);
        
        const progressBarInner = progressBar.querySelector('.reading-progress-bar');
        
        window.addEventListener('scroll', function() {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            
            const progress = Math.min(
                Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
                1
            );
            
            progressBarInner.style.width = (progress * 100) + '%';
        });
    }
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        if (window.pageYOffset > headerHeight + 200) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Image lazy loading fallback for older browsers
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Table of contents generation for long articles
    const contentHeaders = document.querySelectorAll('.post-content h2, .post-content h3');
    if (contentHeaders.length > 3) {
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.innerHTML = '<h4>Table of Contents</h4><ul class="toc-list"></ul>';
        
        const tocList = toc.querySelector('.toc-list');
        
        contentHeaders.forEach((header, index) => {
            const id = `heading-${index}`;
            header.id = id;
            
            const tocItem = document.createElement('li');
            tocItem.className = `toc-item toc-${header.tagName.toLowerCase()}`;
            tocItem.innerHTML = `<a href="#${id}">${header.textContent}</a>`;
            tocList.appendChild(tocItem);
        });
        
        const postContent = document.querySelector('.post-content');
        if (postContent) {
            postContent.insertBefore(toc, postContent.firstChild);
        }
    }
});

// Add custom styles for JavaScript-generated elements and double header
const customStyles = `
    .site-header.scrolled {
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .search-form.search-active .search-input {
        box-shadow: 0 0 0 2px rgba(255,255,255,0.3);
    }
    
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: rgba(45, 181, 165, 0.2);
        z-index: 1001;
    }
    
    .reading-progress-bar {
        height: 100%;
        background-color: #2db5a5;
        width: 0%;
        transition: width 0.1s ease;
    }
    
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #2db5a5;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background-color: #238a7e;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    }
    
    .table-of-contents {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
        border-left: 4px solid #2db5a5;
    }
    
    .table-of-contents h4 {
        margin-bottom: 15px;
        color: #333;
    }
    
    .toc-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .toc-item {
        margin-bottom: 8px;
    }
    
    .toc-item a {
        color: #666;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
    }
    
    .toc-item a:hover {
        color: #2db5a5;
    }
    
    .toc-h3 {
        margin-left: 20px;
        font-size: 0.85rem;
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
        
        .table-of-contents {
            padding: 15px;
            margin-bottom: 25px;
        }
    }
`;

const style = document.createElement('style');
style.textContent = customStyles;
document.head.appendChild(style);