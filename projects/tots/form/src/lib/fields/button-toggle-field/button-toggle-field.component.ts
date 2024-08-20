import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-button-toggle-field',
  templateUrl: './button-toggle-field.component.html',
  styleUrls: ['./button-toggle-field.component.css']
})
export class ButtonToggleFieldComponent extends TotsBaseFieldComponent {

  validatorRequired = Validators.required;

  override ngOnInit(): void {
    super.ngOnInit();
    this.setDefaultValue();
  }

  setDefaultValue() {
    const defaultValue = this.field.extra?.default_value;
    if(defaultValue){
      this.input.setValue(defaultValue)
    }
  }

  onChange(event: MatButtonToggleChange) {
    this.input.setValue(event.value);
  }
}
