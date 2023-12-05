import { ValidatorFn } from "@angular/forms";

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