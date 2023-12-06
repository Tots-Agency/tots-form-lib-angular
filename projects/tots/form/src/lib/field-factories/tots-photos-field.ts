import { TotsFieldForm } from "../entities/tots-field-form";
import { TotsValidator } from "../entities/tots-validator";
import { PhotosFieldComponent } from "../fields/photos-field/photos-field.component";
import { Observable } from "rxjs";

export class TotsPhotosField extends TotsFieldForm {
	constructor(key:string, uploadingFunction:()=> Observable<any>, keyToDisplay:string, label?:string, validators?:TotsValidator[]) {
        super(key, PhotosFieldComponent, label, validators);
        this.extra = {
            service: {
                upload: uploadingFunction
            },
            display_key: keyToDisplay,
        };
    }
}