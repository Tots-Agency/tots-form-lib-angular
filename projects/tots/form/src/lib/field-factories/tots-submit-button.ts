import { ThemePalette } from "@angular/material/core";
import { TotsFieldForm } from "../entities/tots-field-form";
import { SubmitButtonFieldComponent } from "../fields/submit-button-field/submit-button-field.component";
import { TotsFormButtonMatDirective } from "../entities/tots-buttons-config";

export class TotsSubmitButton extends TotsFieldForm {
	constructor(key:string, submitCaption:string, matIcon?:string, submitMatColor?:ThemePalette, submitMatDirective?:TotsFormButtonMatDirective) {
        super(key, SubmitButtonFieldComponent, submitCaption);
        this.extra = {
            matIcon: matIcon,
            matColor: submitMatColor,
            matButtonDirective: submitMatDirective,
        };
    }
}