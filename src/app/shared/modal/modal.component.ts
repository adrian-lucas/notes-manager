import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomIconComponent } from '../icons/custom-icon/custom-icon.component';

@Component({
  selector: 'app-modal',
  imports: [CustomIconComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() iconName: string = '';
  @Input() modalTitle: string = '';
  @Input() modalMessage: string = '';
  @Input() confirmLabel: string = 'Aceptar';
  @Input() cancelLabel: string = 'Cancelar';

  @Input() confirmColor: 'blue' | 'red' = 'blue';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  getConfirmClasses(): string {
    if (this.confirmColor === 'red') {
      return 'px-[16px] py-[12px] rounded-[8px] hover:bg-red-50 bg-red-500 text-white';
    }
    return "px-[16px] py-[12px] rounded-[8px] hover:bg-blue-50 bg-blue-500 text-white";
  }
}
