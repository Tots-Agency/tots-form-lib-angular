import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { TotsFormHelper } from '../../helpers/tots-form-helper';

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

  selectedKey(item: any): string {
    if (this.field.extra?.selected_key) {
      return TotsFormHelper.getItemValueByKey(item, this.field.extra.selected_key);
    }

    return item["id"];
  }

  displayName(item: any): string {
    if(item == undefined){
      return '';
    }

    if (this.field.extra?.display_key) {
      return TotsFormHelper.getItemValueByKey(item, this.field.extra.display_key);
    }

    return item.title;
  }
}
