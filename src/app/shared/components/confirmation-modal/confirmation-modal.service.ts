import { inject, Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { ModalData } from './confirmation-modal.types';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  // Services injection
  private readonly modalService = inject(NgbModal);

  private readonly defaultConfig: NgbModalOptions = {
    centered: true,
    windowClass: 'modal-w-550',
  };

  openModal(data?: ModalData) {
    const ref: NgbModalRef = this.modalService.open(ConfirmationModalComponent, this.defaultConfig);
    if (data) {
      Object.assign(ref.componentInstance.data, data);
    }
    return ref;
  }

  closeAll(): void {
    this.modalService.dismissAll();
  }
}
