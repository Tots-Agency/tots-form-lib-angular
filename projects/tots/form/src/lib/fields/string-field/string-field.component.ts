import { Component, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent extends TotsBaseFieldComponent implements OnInit {

  getCaption() {
    if(this.field.extra && this.field.extra.caption){ return this.field.extra.caption; }
    return '';
  }

  protected get icon() : string|undefined {
    return this.field.extra?.icon;
  }
}
