import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.css']
})
export class TextareaFieldComponent extends TotsBaseFieldComponent {
  getCaption() {
    if(this.field.extra && this.field.extra.caption){ return this.field.extra.caption; }
    return '';
  }
}
