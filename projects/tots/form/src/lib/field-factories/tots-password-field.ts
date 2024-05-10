import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm } from "../entities/tots-field-form";
import { TotsValidator } from "../entities/tots-validator";
import { PasswordFieldComponent } from "../fields/password-field/password-field.component";

export class TotsPasswordField extends TotsFieldForm {
	constructor(key:string|string[], label?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, PasswordFieldComponent, label, validators);
        this.extra = {
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}