document.addEventListener('DOMContentLoaded', function() {
    // 初始化变量
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalStats = document.getElementById('modal-stats');
    const modalAuthor = document.getElementById('modal-author');
    const modalDate = document.getElementById('modal-date');
    const closeBtn = document.querySelector('.close');
    const loadingIndicator = document.querySelector('.loading');
    
    // 图片懒加载
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('.lazy');
        
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.add('loaded');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            }, {
                rootMargin: '100px 0px' // 提前100px加载
            });
            
            lazyImages.forEach(lazyImage => {
                lazyImageObserver.observe(lazyImage);
            });
        } else {
            // 不支持IntersectionObserver的备用方案
            lazyImages.forEach(lazyImage => {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.add('loaded');
            });
        }
    }
    
    // 打开大图模态框
    function setupWorkCardClick() {
        document.querySelectorAll('.work-card').forEach(card => {
            card.addEventListener('click', function() {
                const largeImageUrl = this.getAttribute('data-large');
                const title = this.querySelector('.work-title').textContent;
                const stats = this.querySelector('.work-stats').textContent;
                const author = this.querySelector('.work-author').textContent;
                const date = this.querySelector('.work-date').textContent;
                
                // 显示模态框和加载状态
                modal.style.display = "block";
                loadingIndicator.style.display = "block";
                modalImg.style.display = "none";
                document.body.style.overflow = "hidden"; // 禁止背景滚动
                
                // 设置作品信息
                modalTitle.textContent = title;
                modalStats.textContent = stats;
                modalAuthor.textContent = author;
                modalDate.textContent = date;
                
                // 加载大图
                const img = new Image();
                img.src = largeImageUrl;
                
                img.onload = function() {
                    modalImg.src = largeImageUrl;
                    modalImg.style.display = "block";
                    loadingIndicator.style.display = "none";
                    modalImg.classList.add('loaded');
                };
                
                img.onerror = function() {
                    loadingIndicator.textContent = "图片加载失败";
                };
            });
        });
    }
    
    // 关闭模态框
    function setupModalClose() {
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // 恢复背景滚动
        }
    }
    
    // 键盘ESC关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    // 初始化功能
    lazyLoadImages();
    setupWorkCardClick();
    setupModalClose();
});