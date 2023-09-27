import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-toggle-field',
  templateUrl: './toggle-field.component.html',
  styleUrls: ['./toggle-field.component.scss']
})
export class ToggleFieldComponent extends TotsBaseFieldComponent {

  onChange(event: MatSlideToggleChange) {
    this.input.setValue(event.checked);
  }
}
