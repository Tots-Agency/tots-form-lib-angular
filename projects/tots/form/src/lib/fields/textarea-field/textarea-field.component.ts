import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.css']
})
export class TextareaFieldComponent extends TotsBaseFieldComponent {
  
  protected get hint() : string|undefined {
    return this.field.extra?.caption;
  }
  protected get rows() : number {
    return this.field.extra?.rows || 2;
  }
  
}
