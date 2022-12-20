import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TotsFieldForm } from '../../entities/tots-field-form';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'hos-label-html-field',
  templateUrl: './label-html-field.component.html',
  styleUrls: ['./label-html-field.component.css']
})
export class LabelHtmlFieldComponent extends TotsBaseFieldComponent implements OnInit {

  override ngOnInit(): void {}

  getHtml() {
    if(this.field.extra && this.field.extra.html){ return this.field.extra.html; }
    return '';
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {}

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) {}
}
