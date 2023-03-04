import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TotsFieldForm } from '../../entities/tots-field-form';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-row-field',
  templateUrl: './row-field.component.html',
  styleUrls: ['./row-field.component.scss']
})
export class RowFieldComponent extends TotsBaseFieldComponent implements OnInit {

  override ngOnInit(): void {}

  isHasIcon(field: TotsFieldForm) {
    if(field.extra && field.extra.icon){ return true; }
    return false;
  }

  getIconField(field: TotsFieldForm) {
    if(field.extra && field.extra.icon){ return field.extra.icon; }
    return '';
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
    for (const subfield of field.extra.fields) {
      subfield.component.updateFormByItem(group, item, subfield);
    }
  }

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
    for (const subfield of field.extra.fields) {
      subfield.component.updateItemByForm(group, item, subfield);
    }
  }
}
