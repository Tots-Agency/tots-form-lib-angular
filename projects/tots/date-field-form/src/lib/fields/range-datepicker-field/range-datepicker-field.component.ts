import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TotsBaseFieldComponent, TotsFieldForm, TotsFormHelper } from '@tots/form';
import moment from 'moment';

@Component({
	selector: 'tots-range-datepicker-field',
	templateUrl: './range-datepicker-field.component.html',
	styleUrls: ['./range-datepicker-field.component.scss']
})
export class RangeDatepickerFieldComponent extends TotsBaseFieldComponent implements OnInit {

	inputEnd = new UntypedFormControl();

	override ngOnInit() {
        this.input = TotsFormHelper.createFormControl(this.field, this.group);

        this.inputEnd = new UntypedFormControl(null, this.field.validators);
    	this.group.addControl(this.field.extra.end_date_field_key, this.inputEnd);
	}

	protected get minDate() {
		return this.field.extra?.minDate;
	}
	protected get maxDate() {
		if (this.field.extra?.maxDays && this.input.value) {
			return this.input.value.clone().add(this.field.extra?.maxDays, "days");

		} else if (this.field.extra?.maxDate) {
			return this.field.extra.maxDate;
		}
	}
	
	hasError_end(): boolean {
        return this.inputEnd.invalid && (this.inputEnd.dirty || this.inputEnd.touched);
    }
	getMessageError_end(): string {
        if(this.field.errors == undefined){
            return "";
        }

        for (const error of this.field.errors) {
            if(this.inputEnd.hasError(error.name)){
                return error.message;
            }
        }

        return "";
    }

	static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
		if(Array.isArray(field.key)){
		} else {
			if (item[field.key]) {
				group.get(field.key)?.setValue(moment(item[field.key], field.extra?.format_input ?? 'YYYY-MM-DD HH:mm:ss'));
			}

			if (item[field.extra.end_date_field_key]) {
				group.get(field.extra.end_date_field_key)?.setValue(moment(item[field.extra.end_date_field_key], field.extra?.format_input ?? 'YYYY-MM-DD HH:mm:ss'));
			}
		}
	}

	static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
		if(Array.isArray(field.key)){
		} else {
			if (group.get(field.key)?.value) {
				item[field.key] = group.get(field.key)?.value.format(field.extra?.format_output ?? 'YYYY-MM-DD HH:mm:ss');
			}
			
			if (group.get(field.extra.end_date_field_key)?.value) {
				item[field.extra.end_date_field_key] = group.get(field.extra.end_date_field_key)?.value.format(field.extra?.format_output ?? 'YYYY-MM-DD HH:mm:ss');
			}
		}
	}
}