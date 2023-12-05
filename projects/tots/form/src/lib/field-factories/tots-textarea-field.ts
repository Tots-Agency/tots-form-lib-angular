import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm } from "../entities/tots-field-form";
import { TextareaFieldComponent } from "../fields/textarea-field/textarea-field.component";
import { TotsValidator } from "../entities/tots-validator";

export class TotsTextareaField extends TotsFieldForm {
	constructor(key:string, label?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, TextareaFieldComponent, label, validators);
        this.extra = {
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}