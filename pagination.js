import { attachEventHandler, getPage, getPageCount, setPage } from "./config.js";
import { getAndShowAllCamers } from "./cameraAPI/camers.js";

export const renderPagination = async () => {
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.innerHTML = `
        <nav aria-label="Page navigation">
            <ul class="pagination" id="pagination"></ul>
        </nav>`;
   
    const pageCount = getPageCount();
    const currentPage = getPage() || 1 ;
    const ul = document.getElementById('pagination');
    ul.style.display = 'flex';
    ul.innerHTML = `   
        <li class="page-item" id="previous-page">
            <span class="page-link" id="paginationLeftBtn" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </span>
        </li>
        <li class="page-item" id="previous-exist-page" ><span class="page-link" id="paginationPrevBtn">${currentPage-1}</span></li>
        <li class="page-item active"><span class="page-link"  id="current-page">${currentPage}</span></li>
        <li class="page-item" id="next-exist-page"><span class="page-link"  id="paginationNextBtn" >${currentPage+1}</span></li>
        <li class="page-item" id="next-page">
            <span class="page-link"  id="paginationRightBtn" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </span>
        </li>`;

    attachEventHandler('paginationLeftBtn', 'click', () => { changePage(currentPage-1) })
    attachEventHandler('paginationPrevBtn', 'click', () => { changePage(currentPage-1) })
    attachEventHandler('paginationNextBtn', 'click', () => { changePage(currentPage+1) })
    attachEventHandler('paginationRightBtn', 'click', () => { changePage(currentPage+1) })
    
    if (currentPage === 1) {
        document.getElementById('previous-page').classList.add('disabled');
        document.getElementById('previous-exist-page').style.display = 'none';
    }
    if (currentPage === pageCount) {
        document.getElementById('next-page').classList.add('disabled');
        document.getElementById('next-exist-page').style.display = 'none';
    }
    if ( pageCount === 1 ) {
        ul.style.display = 'none';
    }
}

const changePage = async (page) => {
    setPage(page);
    await getAndShowAllCamers();
}

export const hidePagination = () => {
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.style.display = 'none';
}

export const showPagination = () => {
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.style.display = 'flex';
}


