import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm } from "../entities/tots-field-form";
import { DoubleStringArrayFieldComponent } from "../fields/double-string-array-field/double-string-array-field.component";
import { TotsValidator } from "../entities/tots-validator";

export class TotsDoubleStringArrayField extends TotsFieldForm {
	constructor(key1:string|string[], key2:string|string[], maxAmount:number, label?:string, firstInputValidators?:TotsValidator[], secondInputValidators?:TotsValidator[], firstInputPlaceholder?:string, secondInputPlaceholder?:string, appearance?:MatFormFieldAppearance, hint?:string, addButtonCaption?:string, addButtonMatIcon?:string, addButtonStyle?:string, addButtonMatColor?:string, cssClass?:string) {
        super(key1, DoubleStringArrayFieldComponent, label, firstInputValidators);
        this.extra = {
            secondaryKey: key2,
            secondInputValidators: secondInputValidators?.map(v=> v.validator),
            secondInputErrors: secondInputValidators?.map(v=> {
                return {name: v.key, message: v.errorMessage}
            }),
            secondInputPlaceholder: secondInputPlaceholder,
            maxAmount: maxAmount,
            appearance: appearance,
            placeholder: firstInputPlaceholder,
            caption: hint,
            addButtonCaption: addButtonCaption,
            addButtonMatIcon: addButtonMatIcon,
            addButtonStyle: addButtonStyle,
            addButtonMatColor: addButtonMatColor,
            classes: cssClass
        };
    }
}