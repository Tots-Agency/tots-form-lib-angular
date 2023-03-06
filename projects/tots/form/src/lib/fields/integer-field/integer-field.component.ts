import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'lib-integer-field',
  templateUrl: './integer-field.component.html',
  styleUrls: ['./integer-field.component.css']
})
export class IntegerFieldComponent extends TotsBaseFieldComponent {
  getCaption() {
    if(this.field.extra && this.field.extra.caption){ return this.field.extra.caption; }
    return '';
  }
}
