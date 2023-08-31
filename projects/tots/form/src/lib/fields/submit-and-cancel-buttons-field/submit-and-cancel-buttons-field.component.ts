import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TotsFieldForm } from '../../entities/tots-field-form';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-submit-and-cancel-buttons-field',
  templateUrl: './submit-and-cancel-buttons-field.component.html',
  styleUrls: ['./submit-and-cancel-buttons-field.component.css']
})
export class SubmitAndCancelButtonsFieldComponent extends TotsBaseFieldComponent implements OnInit {

  cancelLabel! : string;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.cancelLabel = this.field.extra.cancelLabel || "Cancel";
  }

  onClick() {
    this.onAction.next({ key: this.field.key, item: {} });
  }
  onCancel() {
    this.onAction.next({ key: "cancel", item: {} });
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }
}
