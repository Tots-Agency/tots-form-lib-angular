import { MatFormFieldAppearance } from "@angular/material/form-field";
import { DatepickerFieldComponent } from "../fields/datepicker-field/datepicker-field.component";
import moment from "moment";
import { TotsFieldForm, TotsValidator } from "@tots/form";

export class TotsDatepickerField extends TotsFieldForm {
	constructor(key:string|string[], minDate?:moment.Moment, maxDate?:moment.Moment, label?:string, dateFormatIn?:string, dateFormatOut?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, DatepickerFieldComponent, label, validators);
        this.extra = {
            format_input: dateFormatIn,
            format_output: dateFormatOut,
            minDate: minDate,
            maxDate: maxDate,
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}