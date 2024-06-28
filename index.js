import { getAllBrandsFromDB } from './brandAPI/brand.js';
import { getUser } from './config.js';
import { renderFilterBrandsOptions, renderFiltration } from './filter.js';
import { navbarRender } from './navbar.js';
import { getAndShowAllCamers } from './cameraAPI/camers.js';
import './userAPI/refreshToken.js';

const app = async () => {
    navbarRender(getUser());
    renderFiltration();
    await getAllBrandsFromDB()
            .then( async brands => {
                renderFilterBrandsOptions(brands);
                await getAndShowAllCamers();
            })
}

app();