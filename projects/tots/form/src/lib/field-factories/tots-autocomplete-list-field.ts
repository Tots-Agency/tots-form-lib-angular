import { Observable } from "rxjs";
import { TotsFieldForm } from "../entities/tots-field-form";
import { AutocompleteListFieldComponent } from "../fields/autocomplete-list-field/autocomplete-list-field.component";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsValidator } from "../entities/tots-validator";

export class TotsAutocompleteListField extends TotsFieldForm {
	constructor(key:string, obs:()=>Observable<any>, keyToSelect:string, keyToDisplay:string, label?:string, imageKey?:string, imageOnError?:string, validators?:TotsValidator[], placeholderText?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, AutocompleteListFieldComponent, label, validators);
        this.extra = {
            obs: obs,
            selected_key: keyToSelect,
            display_key: keyToDisplay,
            photo_key: imageKey,
            placeholder_photo: imageOnError,
            is_show_photo: !!imageKey,
            placeholder: placeholderText,
            appearance: appearance,
            caption: hint,
            classes: cssClass
        };
    }
}