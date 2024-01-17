import { Component, ElementRef, Inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendarUserEvent, MatDatepicker } from '@angular/material/datepicker';
import { TOTS_FORM_DEFAULT_CONFIG, TotsBaseFieldComponent, TotsFieldForm, TotsFormDefaultConfig } from '@tots/form';
import moment from 'moment';

export const MY_FORMATS = {
	parse: {
	  dateInput: 'MM/YYYY',
	},
	display: {
	  dateInput: 'MM/YYYY',
	  monthYearLabel: 'MMM YYYY',
	  dateA11yLabel: 'LL',
	  monthYearA11yLabel: 'MMMM YYYY',
	},
};

@Component({
	selector: 'tots-monthpicker-field',
	templateUrl: './monthpicker-field.component.html',
	styleUrls: ['./monthpicker-field.component.css'],
	providers: [
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	]
})
export class MonthpickerFieldComponent extends TotsBaseFieldComponent {

	constructor(
		@Inject(TOTS_FORM_DEFAULT_CONFIG) totsFormDefaultConfig: TotsFormDefaultConfig,
		private elementRef: ElementRef
	) {
		super(totsFormDefaultConfig);
	}
	
	protected get hint() : string | undefined {
		return this.field.extra?.caption;
	}
	
	getCaption() {
		if (this.field.extra && this.field.extra.caption) { ; }
		return '';
	}

	protected get minDate() {
		return this.field.extra?.minDate;
	}
	protected get maxDate() {
		return this.field.extra?.maxDate;
	}


	static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
		if (Array.isArray(field.key)) {
		} else {
			if (item[field.key] != undefined) {
				group.get(field.key)?.setValue(moment(item[field.key], field.extra?.format_input ?? 'YYYY-MM-DD HH:mm:ss'));
			}
		}
	}

	static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
		if (Array.isArray(field.key)) {
		} else {
			if (group.get(field.key)?.value != undefined) {
				item[field.key] = group.get(field.key)?.value.format(field.extra?.format_output ?? 'YYYY-MM-DD HH:mm:ss');
			}
		}
	}

	closeDatepicker(eventData:moment.Moment, datepicker:MatDatepicker<moment.Moment>) {
		this.input.setValue(eventData);
		this.input.updateValueAndValidity();

		datepicker.panelClass = "tots-mat-calendar-hidden";
		datepicker.close();
		
		setTimeout(() => {
			datepicker.panelClass = "";
		}, 100);
	}
}
