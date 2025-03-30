document.addEventListener('DOMContentLoaded', function() {
    // 获取元素（添加null检查）
    const modal = document.getElementById('image-modal') || document.getElementById('preview-modal');
    const closeBtn = document.querySelector('.close') || document.querySelector('.close-btn');
    const loadingIndicator = document.querySelector('.loading') || document.querySelector('.loader');
    
    // 如果关键元素不存在，则停止执行
    if (!modal || !closeBtn || !loadingIndicator) {
        console.error('关键元素未找到，请检查HTML结构');
        return;
    }

    // 作品卡片点击事件（添加存在性检查）
    const workCards = document.querySelectorAll('.work-card');
    if (workCards.length > 0) {
        workCards.forEach(card => {
            card.addEventListener('click', function() {
                // 确保这些元素存在
                const largeImageUrl = this.getAttribute('data-large');
                const titleEl = this.querySelector('.work-title');
                const statsEl = this.querySelector('.work-stats');
                const authorEl = this.querySelector('.work-author');
                const dateEl = this.querySelector('.work-date');
                
                if (!largeImageUrl || !titleEl || !statsEl || !authorEl || !dateEl) {
                    console.error('作品卡片缺少必要属性');
                    return;
                }

                // 显示加载状态（确保modal存在）
                modal.style.display = "block";
                loadingIndicator.style.display = "block";
                
                // 其他代码...
            });
        });
    } else {
        console.warn('未找到任何作品卡片');
    }

    // 关闭模态框函数（添加存在性检查）
    function setupModalClose() {
        if (!closeBtn || !modal) return;
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
    
    setupModalClose();
});