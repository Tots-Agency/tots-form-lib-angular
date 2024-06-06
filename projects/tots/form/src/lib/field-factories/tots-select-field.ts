import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm } from "../entities/tots-field-form";
import { SelectFieldComponent } from "../fields/select-field/select-field.component";
import { TotsValidator } from "../entities/tots-validator";

export class TotsSelectField extends TotsFieldForm {
	constructor(key:string|string[], options:any[], keyToSelect:string|string[], keyToDisplay:string|string[], label?:string, multiple?:boolean, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, SelectFieldComponent, label, validators);
        this.extra = {
            options: options,
            multiple: multiple,
            selected_key: keyToSelect,
            display_key: keyToDisplay,
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}