import { MatFormFieldAppearance } from "@angular/material/form-field";
import { RangeDatepickerFieldComponent } from "../fields/range-datepicker-field/range-datepicker-field.component";
import moment from "moment";
import { TotsFieldForm, TotsValidator } from "@tots/form";

export class TotsRangeDatepickerField extends TotsFieldForm {
	constructor(startKey:string, endKey:string, minDate?:moment.Moment, maxDays?:number, maxDate?:moment.Moment, label?:string, dateFormatIn?:string, dateFormatOut?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(startKey, RangeDatepickerFieldComponent, label, validators);
        this.extra = {
            end_date_field_key: endKey,
            minDate: minDate,
            maxDays: maxDays,
            maxDate: maxDate,

            format_input: dateFormatIn,
            format_output: dateFormatOut,
            
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}