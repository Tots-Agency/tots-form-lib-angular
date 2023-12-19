import { Component, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { TotsFormHelper } from '../../helpers/tots-form-helper';

@Component({
	selector: 'tots-radio-group-field',
	templateUrl: './radio-group-field.component.html',
	styleUrls: ['./radio-group-field.component.scss']
})
export class RadioGroupFieldComponent extends TotsBaseFieldComponent implements OnInit {

	options? : {
		value:number|string,
		caption:string
	}[];
	alignment! : "vertical"|"horizontal";

	override ngOnInit() {
        this.input = TotsFormHelper.createFormControl(this.field, this.group);

		this.options = this.field.extra.options;
		this.alignment = this.field.extra.alignment || "horizontal";
	}
}
