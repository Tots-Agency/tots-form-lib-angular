import { MonacoEditorFieldComponent } from "../fields/monaco-editor-field/monaco-editor-field.component";
import { TotsFieldForm, TotsValidator } from "@tots/form";

export class TotsMonacoEditorField extends TotsFieldForm {
	constructor(key:string|string[], language:string, suggestions:()=>any, label?:string, validators?:TotsValidator[]) {
        super(key, MonacoEditorFieldComponent, label, validators);
        this.extra = {
            language: language,
            suggestions: suggestions,
        };
    }
}