import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TotsActionModalForm } from '../../entities/tots-action-modal-form';
import { TotsModalConfig } from '../../entities/tots-modal-config';
import { TotsActionForm } from '../../entities/tots-action-form';

@Component({
  selector: 'tots-form-modal',
  templateUrl: './tots-form-modal.component.html',
  styleUrls: ['./tots-form-modal.component.scss']
})
export class TotsFormModalComponent {

  actions = new Subject<TotsActionModalForm>();

  isLoading = false;
  typeLoading = 'square-in-bits';
  colorLoading = '#80bc00';

  @ViewChild('dialog') dialog? : ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {   
    const target = event.target as HTMLElement;

    if (target.classList.contains("tots-modal-backdrop")) {
      let newAction = new TotsActionModalForm();
      newAction.key = "cancel";
      newAction.item = null;
      newAction.modal = this.dialogRef;
      this.actions.next(newAction);
    }
  }

  constructor(
    protected dialogRef: MatDialogRef<TotsFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TotsModalConfig
  ) { }

  onActionForm(action: TotsActionForm) {
    let newAction = new TotsActionModalForm();
    newAction.key = action.key;
    newAction.item = action.item;
    newAction.modal = this.dialogRef;
    this.actions.next(newAction);
  }

  showLoading(type: string = 'square-in-bits', color: string = '#80bc00') {
    this.isLoading = true;
    this.typeLoading = type;
    this.colorLoading = color;
  }

  hideLoading() {
    this.isLoading = false;
  }
}
