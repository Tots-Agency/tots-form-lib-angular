import { Observable } from "rxjs";
import { QuillFieldComponent } from "../fields/quill-field/quill-field.component";
import { TotsFieldForm, TotsValidator } from "@tots/form";

export class TotsQuillField extends TotsFieldForm {
	constructor(key:string|string[], fileUploadFunction?:()=> Observable<any>, fieldHeight?:number, label?:string, validators?:TotsValidator[], placeholder?:string, theme?:string) {
        super(key, QuillFieldComponent, label);
        this.extra = {
            height: fieldHeight,
            validators: validators,
            placeholder: placeholder,
            theme: theme
        };
    }
}