import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm, TotsValidator } from "../entities/tots-field-form";
import { IntegerFieldComponent } from "../fields/integer-field/integer-field.component";

export class TotsIntegerField extends TotsFieldForm {
	constructor(key:string, label?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, IntegerFieldComponent, label, validators);
        this.extra = {
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}