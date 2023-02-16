import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-button-toggle-field',
  templateUrl: './button-toggle-field.component.html',
  styleUrls: ['./button-toggle-field.component.css']
})
export class ButtonToggleFieldComponent extends TotsBaseFieldComponent {

  onChange(event: MatButtonToggleChange) {
    this.input.setValue(event.value);
  }
}
