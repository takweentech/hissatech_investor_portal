import { Component, inject, Input } from '@angular/core';
import { ModalData } from './confirmation-modal.types';
import { ConfirmationModalService } from './confirmation-modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  private readonly confirmationModalService = inject(ConfirmationModalService);
  private readonly activeModal = inject(NgbActiveModal);

  @Input() data: ModalData = {
    title: 'Action confirmation',
    desc: 'Are you sure you want to proceed with this action ?',
    acceptBtnText: 'Confirm',
    declineBtnText: 'Cancel',
  };

  public decline(): void {
    this.activeModal.close(false);
  }

  public accept(): void {
    this.activeModal.close(true);
  }

  public onCloseModal(): void {
    this.confirmationModalService.closeAll();
  }
}
