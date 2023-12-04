import { ValidatorFn } from "@angular/forms";

export class TotsFieldForm {
	key : string|string[];
	component : any;

	label?: string;
	validators? : ValidatorFn[];
	errors?: { name: string, message: string}[];
	
	extra? : any;

	constructor(key:string, component:any, label?:string, validators?:TotsValidator[]) {
		this.key = key;
		this.component = component;
		this.label = label;
		this.validators = validators?.map(v=> v.validator);
		this.errors = validators?.map(v=> {
			return {name: v.key, message: v.errorMessage}
		});
	}
}

export class TotsValidator {
	validator : ValidatorFn;
	key : string;
	errorMessage : string;

	constructor(validator:ValidatorFn, key:string, errorMessage:string) {
		this.validator = validator,
		this.key = key;
		this.errorMessage = errorMessage;

		console.warn(this.validator.name);
	}
}