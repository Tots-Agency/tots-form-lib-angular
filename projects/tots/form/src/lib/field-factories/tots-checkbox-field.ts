import { TotsFieldForm } from "../entities/tots-field-form";
import { TotsValidator } from "../entities/tots-validator";
import { CheckboxFieldComponent } from "../fields/checkbox-field/checkbox-field.component";

export class TotsCheckboxField extends TotsFieldForm {
	constructor(key:string|string[], label?:string, validators?:TotsValidator[]) {
        super(key, CheckboxFieldComponent, label, validators);
    }
}