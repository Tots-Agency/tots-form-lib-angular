import { Component, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
	selector: 'tots-toggle-field',
	templateUrl: './toggle-field.component.html',
	styleUrls: ['./toggle-field.component.scss'],
	standalone: false
})
export class ToggleFieldComponent extends TotsBaseFieldComponent implements OnInit {

	protected matColor! : string

  override ngOnInit(): void {
    super.ngOnInit();
    this.matColor = this.field.extra?.matColor || "primary";
  }
}
