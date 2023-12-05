import { Observable } from "rxjs";
import { TotsFieldForm } from "../entities/tots-field-form";
import { FilesListFieldComponent } from "../fields/files-list-field/files-list-field.component";
import { TotsValidator } from "../entities/tots-validator";

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