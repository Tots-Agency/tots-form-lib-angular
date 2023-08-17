import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends TotsBaseFieldComponent {
  getCaption() {
    if(this.field.extra && this.field.extra.caption){ return this.field.extra.caption; }
    return '';
  }

  isMultiple(): boolean {
    if(this.field.extra && this.field.extra.multiple){ return this.field.extra.multiple; }
    return false;
  }
}
