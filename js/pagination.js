const totalItems = 1000;
const itemsPerPage = 50;
const totalPages = Math.ceil(totalItems / itemsPerPage);

// 🔍 Get current page from URL
function getCurrentPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("page")) || 1;
}

// 🔘 Create a single page button
function createPageButton(page, currentPage) {
    const isActive = page === currentPage;
    const activeClass = isActive ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-gray-200';
    return `<button class="page-btn px-3 py-1 border rounded ${activeClass}" data-page="${page}">${page}</button>`;
}

// 🔢 Create smart page buttons with ...
function renderPageButtons(currentPage) {
    let buttons = [];

    if (totalPages <= 7) {
        // Show all pages if less than 7
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(createPageButton(i, currentPage));
        }
    } else {
        // Always show 1 & 2
        buttons.push(createPageButton(1, currentPage));
        buttons.push(createPageButton(2, currentPage));

        if (currentPage > 4) {
            buttons.push(`<span class="px-2">...</span>`);
        }

        // Show current-1, current, current+1
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 2 && i < totalPages - 1) {
                buttons.push(createPageButton(i, currentPage));
            }
        }

        if (currentPage < totalPages - 3) {
            buttons.push(`<span class="px-2">...</span>`);
        }

        // Always show last 2
        buttons.push(createPageButton(totalPages - 1, currentPage));
        buttons.push(createPageButton(totalPages, currentPage));
    }

    return buttons.join('');
}

// ◀️ Prev Button
function renderPrevButton(currentPage) {
    if (currentPage > 1) {
        return `<button class="prev-btn px-3 py-1 border rounded" data-page="${currentPage - 1}">Prev</button>`;
    }
    return '';
}

// ▶️ Next Button
function renderNextButton(currentPage) {
    if (currentPage < totalPages) {
        return `<button class="next-btn px-3 py-1 border rounded" data-page="${currentPage + 1}">Next</button>`;
    }
    return '';
}

// 🔁 Full Pagination Renderer
function renderPagination() {
    const currentPage = getCurrentPage();
    const paginationContainer = document.getElementById('pagination-container');

    const html = `
        ${renderPrevButton(currentPage)}
        ${renderPageButtons(currentPage)}
        ${renderNextButton(currentPage)}
    `;

    paginationContainer.innerHTML = html;

    // Event Listener
    paginationContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function () {
            const selectedPage = this.getAttribute('data-page');
            const url = new URL(window.location);
            url.searchParams.set('page', selectedPage);
            window.location.href = url.toString();
        });
    });
}

// Initial Call
renderPagination();
