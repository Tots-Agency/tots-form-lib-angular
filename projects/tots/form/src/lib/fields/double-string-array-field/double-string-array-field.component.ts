import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, UntypedFormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { TOTS_FORM_DEFAULT_CONFIG, TOTS_STRING_ARRAY_CONFIG, TotsBaseFieldComponent, TotsFieldForm, TotsFormButtonMatDirective, TotsFormDefaultConfig, TotsFormHelper, TotsStringArrayConfig } from '@tots/form';

@Component({
	selector: 'tots-double-string-array-field',
	templateUrl: './double-string-array-field.component.html',
	styleUrls: ["./double-string-array-field.component.css"]
})
export class DoubleStringArrayFieldComponent extends TotsBaseFieldComponent {

	formArray1! : FormArray;
	formArray2! : FormArray;

	constructor(
		@Inject(TOTS_STRING_ARRAY_CONFIG) protected totsStringArrayConfig: TotsStringArrayConfig,
		@Inject(TOTS_FORM_DEFAULT_CONFIG) totsFormDefaultConfig: TotsFormDefaultConfig
	) {
		super(totsFormDefaultConfig);
	}

	override ngOnInit(): void {
		this.createFormArray();
		// No Utilizar this.input
	}

	createFormArray() {
		let fc1 = new FormControl();
		let fc2 = new FormControl();

		if (this.field.validators?.length) {
			fc1.setValidators(this.field.validators);
		}
		if (this.field.extra?.secondInputvalidators?.length) {
			fc2.setValidators(this.field.extra.secondInputvalidators);
		}

		// Create Control
		this.formArray1 = new FormArray([fc1]);
		this.formArray2 = new FormArray([fc2]);

		// Add in Group
		if (Array.isArray(this.field.key)) {
			this.group.addControl(this.field.key.join('_'), this.formArray1);
		} else {
			this.group.addControl(this.field.key, this.formArray1);
		}

		if (Array.isArray(this.field.extra.secondaryKey)) {
			this.group.addControl(this.field.extra.secondaryKey.join('_'), this.formArray2);
		} else {
			this.group.addControl(this.field.extra.secondaryKey, this.formArray2);
		}
	}

	protected get addButtonStyle(): TotsFormButtonMatDirective {
		return this.field.extra?.addButtonStyle || this.totsStringArrayConfig.addButtonStyle;
	}
	protected get addButtonMatIcon(): string {
		return this.field.extra?.addButtonMatIcon || this.totsStringArrayConfig.addButtonMatIcon;
	}
	protected get addButtonMatColor(): ThemePalette {
		return this.field.extra?.addButtonMatColor || this.totsStringArrayConfig.addButtonMatColor;
	}
	protected get addButtonCaption(): string {
		return this.field.extra?.addButtonCaption || this.totsStringArrayConfig.addButtonCaption;
	}
	protected get maxAmount(): number {
		return this.field.extra?.maxAmount || 10;
	}
	protected get matHint(): string | undefined {
		return this.field.extra?.caption;
	}

	protected get placeholder2() : string {
		return this.field.extra?.secondInputPlaceholder || "";
	}

	protected getControlByIndex1(index: number): FormControl<String> {
		return this.formArray1.controls[index] as FormControl<String>;
	}
	protected getControlByIndex2(index: number): FormControl<String> {
		return this.formArray2.controls[index] as FormControl<String>;
	}

	protected hasIndividualError1(index: number) {
		return this.formArray1.controls[index].invalid && (this.formArray1.controls[index].dirty || this.formArray1.controls[index].touched);
	}
	protected hasIndividualError2(index: number) {
		return this.formArray2.controls[index].invalid && (this.formArray2.controls[index].dirty || this.formArray2.controls[index].touched);
	}

	protected getIndividualMessageError1(index: number): string {
		if (this.field.errors == undefined) {
			return '';
		}

		for (const error of this.field.errors) {
			if (this.formArray1.controls[index].hasError(error.name)) {
				return error.message;
			}
		}

		return '';
	}
	protected getIndividualMessageError2(index: number): string {
		if (this.field.extra.secondInputErrors == undefined) {
			return '';
		}

		for (const error of this.field.extra.secondInputErrors) {
			if (this.formArray2.controls[index].hasError(error.name)) {
				return error.message;
			}
		}

		return '';
	}

	protected addOne() {
		let fc1 = new FormControl();
		let fc2 = new FormControl();
		
		if (this.field.validators?.length) {
			fc1.setValidators(this.field.validators);
		}
		if (this.field.extra?.secondInputValidators?.length) {
			fc2.setValidators(this.field.extra.secondInputValidators);
		}

		this.formArray1.push(fc1);
		this.formArray2.push(fc2);

		setTimeout(() => {
			this.formArray1.updateValueAndValidity();
			this.formArray2.updateValueAndValidity();
		});
	}

	protected removeOne(index: number) {
		this.formArray1.removeAt(index);
		this.formArray2.removeAt(index);
	}

	static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {

		if (Array.isArray(field.key)) {
			let dataArray = TotsFormHelper.getItemValueByKey(item, field.key);
			if (!dataArray) {
				return;
			}

			(group.get(field.key.join('_')) as FormArray).clear();

			// Create all controls
			for (let index = 0; index < dataArray.length; index++) {
				let input = new FormControl<String>(dataArray[index]);
				if (field.validators?.length) {
					input.setValidators(field.validators);
				}
				(group.get(field.key.join('_')) as FormArray).push(input);
			}

		} else {
			let dataArray = item[field.key];
			if (!dataArray) {
				return;
			}

			(group.get(field.key) as FormArray).clear();

			// Create all controls
			for (let index = 0; index < dataArray.length; index++) {
				let input = new FormControl<String>(dataArray[index]);
				if (field.validators?.length) {
					input.setValidators(field.validators);
				}
				(group.get(field.key) as FormArray).push(input);
			}
		}

		if (Array.isArray(field.extra.secondaryKey)) {
			let dataArray = TotsFormHelper.getItemValueByKey(item, field.key);
			if (!dataArray) {
				return;
			}

			(group.get(field.extra.secondaryKey.join('_')) as FormArray).clear();

			// Create all controls
			for (let index = 0; index < dataArray.length; index++) {
				let input = new FormControl<String>(dataArray[index]);
				if (field.validators?.length) {
					input.setValidators(field.validators);
				}
				(group.get(field.extra.secondaryKey.join('_')) as FormArray).push(input);
			}

		} else {
			let dataArray = item[field.extra.secondaryKey];
			if (!dataArray) {
				return;
			}

			(group.get(field.extra.secondaryKey) as FormArray).clear();

			// Create all controls
			for (let index = 0; index < dataArray.length; index++) {
				let input = new FormControl<String>(dataArray[index]);
				if (field.validators?.length) {
					input.setValidators(field.validators);
				}
				(group.get(field.extra.secondaryKey) as FormArray).push(input);
			}
		}
	}
}
