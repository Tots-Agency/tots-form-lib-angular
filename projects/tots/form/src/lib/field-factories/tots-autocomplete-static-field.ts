import { MatFormFieldAppearance } from "@angular/material/form-field";
import { TotsFieldForm } from "../entities/tots-field-form";
import { AutocompleteFieldComponent } from "../fields/autocomplete-field/autocomplete-field.component";
import { TotsValidator } from "../entities/tots-validator";

export class TotsAutocompleteStaticField extends TotsFieldForm {
    //Sin first_query

	constructor(key:string, options:any[], keyToSelect:string, keyToFilterBy:string, keyToDisplay:string, label?:string, validators?:TotsValidator[], placeholder?:string, appearance?:MatFormFieldAppearance, hint?:string, cssClass?:string) {
        super(key, AutocompleteFieldComponent, label, validators);
        this.extra = {
            options: options,
            filter_key: keyToFilterBy,
            selected_key: keyToSelect,
            display_key: keyToDisplay,
            placeholder: placeholder,
            appearance: appearance,
            caption: hint,
            classes: cssClass
        };
    }
}