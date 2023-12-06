import { Observable } from "rxjs";
import { TotsFieldForm } from "../entities/tots-field-form";
import { AvatarPhotoFieldComponent } from "../fields/avatar-photo-field/avatar-photo-field.component";

export class TotsAvatarPhotoField extends TotsFieldForm {
	constructor(key:string, uploadingFunction:()=> Observable<{url: string;}>, buttonCaption?:string, removeButtonCaption?:string, imageOnError?:string, label?:string) {
        super(key, AvatarPhotoFieldComponent, label);
        this.extra = {
            service: {
                upload: uploadingFunction
            },
            button_text: buttonCaption,
            remove_text: removeButtonCaption,
            error_image: imageOnError
        };
    }
}