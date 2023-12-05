import { TotsFieldForm } from "../entities/tots-field-form";
import { LabelHtmlFieldComponent } from "../fields/label-html-field/label-html-field.component";

export class TotsHtmlField extends TotsFieldForm {
	constructor(key:string, html:string) {
        super(key, LabelHtmlFieldComponent);
        this.extra = {
            html: html
        };
    }
}