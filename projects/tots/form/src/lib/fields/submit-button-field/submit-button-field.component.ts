import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TotsFieldForm } from '../../entities/tots-field-form';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-submit-button-field',
  templateUrl: './submit-button-field.component.html',
  styleUrls: ['./submit-button-field.component.css']
})
export class SubmitButtonFieldComponent extends TotsBaseFieldComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void { }

  onClick() {
    this.onAction.next({ key: this.field.key, item: {} });
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }
}
