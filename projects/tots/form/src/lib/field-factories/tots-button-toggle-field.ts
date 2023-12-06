import { TotsButtonToggleOption } from "../entities/tots-button-toggle-option";
import { TotsFieldForm } from "../entities/tots-field-form";
import { TotsValidator } from "../entities/tots-validator";
import { ButtonToggleFieldComponent } from "../fields/button-toggle-field/button-toggle-field.component";

export class TotsButtonToggleField extends TotsFieldForm {
	constructor(key:string, options:TotsButtonToggleOption[], label?:string, validators?:TotsValidator[]) {
        super(key, ButtonToggleFieldComponent, label, validators);
        this.extra = {
            options: options
        }
    }
}