import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { SelectFieldComponent } from '../select-field/select-field.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'tots-select-obs-field',
  templateUrl: './select-obs-field.component.html',
  styleUrls: ['./select-obs-field.component.scss']
})
export class SelectObsFieldComponent extends SelectFieldComponent {

  options?: Array<any>;

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadOptions();
  }

  displayId(item: any): string {
    if(item == undefined){
      return '';
    }
    return item[this.field.extra.selected_key];
  }

  displayOption(item: any): string {
    if(item == undefined){
      return '';
    }
    return item[this.field.extra.display_key];
  }

  loadOptions() {
    let obs: () => Observable<Array<any>> = this.field.extra.obs;
    obs().subscribe(options => this.options = options);
  }
}
