import { Observable } from "rxjs";
import { TotsFieldForm, TotsValidator } from "../entities/tots-field-form";
import { AutocompleteObsFieldComponent } from "../fields/autocomplete-obs-field/autocomplete-obs-field.component";
import { MatFormFieldAppearance } from "@angular/material/form-field";

export class TotsAutocompleteObsField extends TotsFieldForm {
    //Sin first_query

	constructor(key:string, obs:Observable<any>, keyToSelect:string, keyToDisplay:string, label?:string, validators?:TotsValidator[], placeholder?:string,  appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, AutocompleteObsFieldComponent, label, validators);
        this.extra = {
            obs: obs,
            selected_key: keyToSelect,
            display_key: keyToDisplay,
            placeholder: placeholder,
            appearance: appearance,
            caption: hint,
            classes: cssClass
        };
    }
}