import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm } from "../entities/tots-field-form";
import { StringArrayFieldComponent } from "../fields/string-array-field/string-array-field.component";
import { TotsValidator } from "../entities/tots-validator";

export class TotsStringArrayField extends TotsFieldForm {
	constructor(key:string, maxAmount:number, label?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, addButtonCaption?:string, addButtonMatIcon?:string, addButtonStyle?:string, addButtonMatColor?:string, cssClass?:string) {
        super(key, StringArrayFieldComponent, label, validators);
        this.extra = {
            maxAmount: maxAmount,
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            addButtonCaption: addButtonCaption,
            addButtonMatIcon: addButtonMatIcon,
            addButtonStyle: addButtonStyle,
            addButtonMatColor: addButtonMatColor,
            classes: cssClass
        };
    }
}