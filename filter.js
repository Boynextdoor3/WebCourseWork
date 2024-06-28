import { attachEventHandler, setPage } from "./config.js";
import { getAndShowAllCamers } from "./cameraAPI/camers.js";

export const renderFiltration = () => {
    const filterContainer = document.querySelector('.filter-container');
    filterContainer.innerHTML  =`<form class="filter-form">
                <div class="filter-brand">
                    <select class="form-select" id="filter-brand" >
                    </select>
                </div>
                <div class="filter-search">
                    <input class="form-control" id="filter-search" type="text" placeholder="-- search camera --" >
                </div>
                <div class="filter-sort">
                    <select class="form-select" id="filter-sort">
                        <option selected value="nosort">-- sort camers (Don't sort) --</option>
                        <option value="incPr">by increasing price</option>
                        <option value="decPr">by decreasing price</option>
                        <option value="incWei">by increasing weight</option>
                        <option value="decWei">by decreasing weight</option>
                        <option value="nf">newest first</option>
                        <option value="of">oldest first</option>
                      </select>
                </div>
            </form>`;

    attachEventHandler('filter-brand', 'change', filtration);
    attachEventHandler('filter-sort', 'change', filtration);
    attachEventHandler('filter-search', 'input', filtration);
}

export const  renderFilterBrandsOptions = (brands) => {
    const filterBrand = document.getElementById('filter-brand');
    filterBrand.innerHTML = ``;
    const defaultCameraBrandOption = document.createElement('option');
  
    defaultCameraBrandOption.setAttribute("selected", "");
    defaultCameraBrandOption.setAttribute("value", "all");
    defaultCameraBrandOption.innerText = ` -- select a brand (All brands) -- `;
    filterBrand.appendChild(defaultCameraBrandOption);

    brands.forEach(brand => {
                const brandOption = document.createElement('option');
                brandOption.value = brand._id;
                brandOption.innerText = `${brand.name}`;
                filterBrand.appendChild(brandOption);
    });
}


const filtration = async () => {
    setPage(1);
    await getAndShowAllCamers();
}
