import { TotsFieldForm } from "../entities/tots-field-form";
import { RadioGroupFieldComponent } from "../fields/radio-group-field/radio-group-field.component";
import { TotsValidator } from "../entities/tots-validator";
import { TotsRadioButtonOption } from "../entities/tots-radio-button-option";

export class TotsRadioGroupField extends TotsFieldForm {
	constructor(key:string|string[], options: TotsRadioButtonOption[], label?:string, validators?:TotsValidator[], alignment?:"horizontal"|"vertical") {
        super(key, RadioGroupFieldComponent, label, validators);
        this.extra = {
            options: options,
            alignment: alignment || "horizontal"
        };
    }
}