import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm } from "../entities/tots-field-form";
import { SelectObsFieldComponent } from "../fields/select-obs-field/select-obs-field.component";
import { Observable } from "rxjs";
import { TotsValidator } from "../entities/tots-validator";

export class TotsSelectObsField extends TotsFieldForm {
	constructor(key:string, obs:()=>Observable<any>, keyToSelect:string, keyToDisplay:string, label?:string, multiple?:boolean, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, SelectObsFieldComponent, label, validators);
        this.extra = {
            obs: obs,
            selected_key: keyToSelect,
            display_key: keyToDisplay,
            multiple: multiple,
            appearance: appearance,
            placeholder: placeholder,
            caption: hint,
            classes: cssClass
        };
    }
}