import { ValidatorFn } from "@angular/forms";
import { TotsValidator } from "./tots-validator";

export class TotsFieldForm {
	key : string|string[];
	component : any;

	label?: string;
	validators? : ValidatorFn[];
	errors?: { name: string, message: string}[];
	
	extra? : any;

	constructor(key:string|string[], component:any, label?:string, validators?:TotsValidator[]) {
		this.key = key;
		this.component = component;
		this.label = label;
		this.validators = validators?.map(v=> v.validator);
		this.errors = validators?.map(v=> {
			return {name: v.key, message: v.errorMessage}
		});
	}
}