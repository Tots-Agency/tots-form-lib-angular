import { TotsFieldForm, TotsValidator } from "../entities/tots-field-form";
import { PhotosFieldComponent } from "../fields/photos-field/photos-field.component";
import { Observable } from "rxjs";

export class TotsPhotosField extends TotsFieldForm {
    // Que venga siempre url de la api

	constructor(key:string, uploadingFunction:()=> Observable<{url: string;}>, label?:string, validators?:TotsValidator[]) {
        super(key, PhotosFieldComponent, label, validators);
        this.extra = {
            service: {
                upload: uploadingFunction
            },
            display_key: "url",
        };
    }
}