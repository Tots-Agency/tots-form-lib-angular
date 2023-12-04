import { TotsFieldForm, TotsValidator } from "../entities/tots-field-form";
import { OneFileFieldComponent } from "../fields/one-file-field/one-file-field.component";
import { Observable } from "rxjs";

export class TotsOneFileField extends TotsFieldForm {
	constructor(key:string, uploadingFunction:()=> Observable<any>, fileDisplayKey:string, label?:string, validators?:TotsValidator[]) {
        super(key, OneFileFieldComponent, label, validators);
        this.extra = {
            service: {
                upload: uploadingFunction
            },
            display_key: fileDisplayKey
        };
    }
}