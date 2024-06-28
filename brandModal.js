import { CustomModal } from "./main.js";

const createBrandModalTitle = `Create brand`;
const createBrandModalContent =`<form name="createBrandForm" id="createBrandForm">
        <table class="form-table">
            <tr>
                <td class="form-label"><label for="createBrandName">Brand name:</label> </td>
                <td class="form-input"><input type="text" name="createBrandName" id="createBrandName" class="form-control touppercase" required></td>
            </tr>
            <tr>
                <td></td>
                <td class="form-email-eror" id="createBrandNameError" onfocus="createBrandNameErrorHandler"></td>
            </tr>
        </table>
        <div class="modal-form-footer">
            <input type="submit" class="btn btn-success" id="submitCreateBrandBtn" value="Create">
        </div>
    </form>`;    
const createBrandModalFooter =``;
export const createBrandModal = new CustomModal('crBra', createBrandModalTitle, createBrandModalContent, createBrandModalFooter);
createBrandModal.create();


const editBrandModalTitle = `Edit brand`;
const editBrandModalContent = `<form name="editBrandForm" id="editBrandForm" >
        <input type="hidden" id="editBrandId" name="editBrandId">
        <table class="form-table">
            <tr>
                <td class="form-label"><label for="editBrandName">Brand name:</label> </td>
                <td class="form-input"><input type="text" name="editBrandName" id="editBrandName" class="form-control touppercase" required></td>
            </tr>
            <tr>
                <td></td>
                <td class="form-email-eror" id="editBrandNameError" onfocus="editBrandNameErrorHandler"></td>
            </tr>
        </table>
        <div class="modal-form-footer">
            <input type="submit" class="btn btn-success" id="submitEditBrandBtn" value="Confirm">
        </div>
    </form>`    
const editBrandModalFooter =``;
export const editBrandModal = new CustomModal('edBra', editBrandModalTitle, editBrandModalContent, editBrandModalFooter);
editBrandModal.create('edBra');