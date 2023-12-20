import { MatFormFieldAppearance } from "@angular/material/form-field";
import { DatepickerAndTimeEndFieldComponent } from "../fields/datepicker-and-time-end-field/datepicker-and-time-end-field.component";
import moment from "moment";
import { TotsFieldForm, TotsValidator } from "@tots/form";

export class TotsDatepickerTimeRangeField extends TotsFieldForm {
	constructor(key:string|string[], startTimeKey:string, endTimeKey:string, startTimeLabel:string, endTimeLabel:string, minDate?:moment.Moment, label?:string, dateFormatIn?:string, dateFormatOut?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, DatepickerAndTimeEndFieldComponent, label, validators);
        this.extra = {
            field_key_start: startTimeKey,
            field_key_end: endTimeKey,
            label_start: startTimeLabel,
            label_end: endTimeLabel,
            format_input: dateFormatIn,
            format_output: dateFormatOut,
            minDate: minDate,
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}