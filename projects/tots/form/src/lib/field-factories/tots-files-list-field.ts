import { Observable } from "rxjs";
import { TotsFieldForm, TotsValidator } from "../entities/tots-field-form";
import { FilesListFieldComponent } from "../fields/files-list-field/files-list-field.component";

export class TotsFilesListField extends TotsFieldForm {
	constructor(key:string, uploadingFunction:()=> Observable<any>, addButtonCaption:string, fileDisplayKey:string, label?:string, validators?:TotsValidator[]) {
        super(key, FilesListFieldComponent, label, validators);
        this.extra = {
            service: {
                upload: uploadingFunction
            },
            textAddButton: addButtonCaption,
            display_key: fileDisplayKey
        }
    }
}