import { CustomModal } from "./main.js";

const confirmModalTitle = `Removal confirmation`;
const confirmModalContent = `<div class="confirmation-message"></div> `;
const confirmModalFooter =`<div class="confirmation-footer">
                                <input type="submit" class="btn btn-danger" id="removeCameraBtn" value="Remove">
                                <input type="reset" class="btn btn-success" id="cancelCameraBtn" data-close="true" value="Cancel">
                            </div>`;
export const confirmModal = new CustomModal("cfm", confirmModalTitle, confirmModalContent, confirmModalFooter);

confirmModal.create();

export const waitForRemoveButtonPress = async () => {
    const removeCameraBtn = document.getElementById('removeCameraBtn');
        return new Promise((resolve, reject) => {
            removeCameraBtn.addEventListener('click', () => {
            resolve();                  
        });
    });
}