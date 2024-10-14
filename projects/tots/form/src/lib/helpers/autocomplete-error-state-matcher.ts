import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class AutoCompleteErorrStateMatcher implements ErrorStateMatcher {

	controlKey! : string;

	constructor(controlKey:string) {
		this.controlKey = controlKey
	}

	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return (control && (form?.form.get(this.controlKey)?.invalid) && control.touched ) as boolean;
	}
}