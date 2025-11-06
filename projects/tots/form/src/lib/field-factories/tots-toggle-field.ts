import { TotsFieldForm } from "../entities/tots-field-form";
import { TotsValidator } from "../entities/tots-validator";
import { ToggleFieldComponent } from "../fields/toggle-field/toggle-field.component";

export class TotsToggleField extends TotsFieldForm {
	constructor(key:string, label:string, validators?:TotsValidator[], color?:string) {
        super(key, ToggleFieldComponent, label, validators);
        this.extra = {
            matColor: color,
        };
    }
}