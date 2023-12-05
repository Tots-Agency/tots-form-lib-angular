import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm } from "../entities/tots-field-form";
import { StringFieldComponent } from "../fields/string-field/string-field.component";
import { TotsValidator } from "../entities/tots-validator";

export class TotsStringField extends TotsFieldForm {
	constructor(key:string|string[], label?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, StringFieldComponent, label, validators);
        this.extra = {
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}