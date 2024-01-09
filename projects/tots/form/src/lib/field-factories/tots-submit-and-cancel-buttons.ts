import { ThemePalette } from "@angular/material/core";
import { TotsFieldForm } from "../entities/tots-field-form";
import { SubmitAndCancelButtonsFieldComponent } from "../fields/submit-and-cancel-buttons-field/submit-and-cancel-buttons-field.component";
import { TotsFormButtonMatDirective } from "../entities/tots-buttons-config";

export class TotsSubmitAndCancelButtons extends TotsFieldForm {
	constructor(key:string, submitCaption:string, cancelCaption?:string, matIcon?:string, submitMatColor?:ThemePalette, submitMatDirective?:TotsFormButtonMatDirective, cancelMatDirective?:TotsFormButtonMatDirective) {
        super(key, SubmitAndCancelButtonsFieldComponent, submitCaption);
        this.extra = {
            matColor: submitMatColor,
            matIcon: matIcon,
            matButtonDirective: submitMatDirective,
            cancelLabel: cancelCaption,
            matCancelButtonDirective: cancelMatDirective,
        };
    }
}