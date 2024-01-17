import { MatFormFieldAppearance } from "@angular/material/form-field";
import { MonthpickerFieldComponent } from "../fields/monthpicker-field/monthpicker-field.component";
import moment from "moment";
import { TotsFieldForm, TotsValidator } from "@tots/form";

export class TotsMonthpickerField extends TotsFieldForm {
	constructor(key:string|string[], minDate?:moment.Moment, maxDate?:moment.Moment, label?:string, dateFormatIn?:string, dateFormatOut?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, MonthpickerFieldComponent, label, validators);
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