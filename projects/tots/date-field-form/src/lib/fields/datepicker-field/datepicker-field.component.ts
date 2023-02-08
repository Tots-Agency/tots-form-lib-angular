import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TotsBaseFieldComponent, TotsFieldForm } from '@tots/form';
import * as moment from 'moment';

@Component({
  selector: 'tots-datepicker-field',
  templateUrl: './datepicker-field.component.html',
  styleUrls: ['./datepicker-field.component.css']
})
export class DatepickerFieldComponent extends TotsBaseFieldComponent {

  getCaption() {
    if(this.field.extra && this.field.extra.caption){ return this.field.extra.caption; }
    return '';
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
    group.get(field.key)?.setValue(moment(item[field.key], 'YYYY-MM-DD HH:mm:ss'));
  }

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
      item[field.key] = group.get(field.key)?.value.format('YYYY-MM-DD HH:mm:ss');
  }
}
