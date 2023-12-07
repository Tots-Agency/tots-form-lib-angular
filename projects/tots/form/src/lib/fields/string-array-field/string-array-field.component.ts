import { FormArray, FormControl, FormGroup, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { TOTS_STRING_ARRAY_CONFIG, TotsStringArrayConfig } from '../../entities/tots-string-array-config';
import { ThemePalette } from '@angular/material/core';
import { TOTS_FORM_DEFAULT_CONFIG, TotsFormDefaultConfig } from '../../entities/tots-form-default-config';
import { TotsFormHelper } from '../../helpers/tots-form-helper';
import { TotsFormButtonMatDirective } from '../../entities/tots-buttons-config';
import { TotsFieldForm } from '@tots/form';

@Component({
  selector: 'tots-string-array-field',
  templateUrl: './string-array-field.component.html',
  styleUrls: ['./string-array-field.component.scss']
})
export class StringArrayFieldComponent extends TotsBaseFieldComponent implements OnInit {

  formArray!: FormArray;

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
    // Create Control
    this.formArray = new FormArray([new FormControl<String>('')]);
    // Config validators
    if(this.field.validators != undefined && this.field.validators.length > 0){
      this.formArray.setValidators(this.field.validators);
    }
    // If include default value
    if(this.field.extra && this.field.extra.default_value){
      this.formArray.setValue(this.field.extra.default_value);
    }
    // if disable
    if(this.field.extra && this.field.extra.disabled){
        this.formArray.disable();
    }
    // Add in Group
    if(Array.isArray(this.field.key)){
      this.group.addControl(this.field.key.join('_'), this.formArray);
    } else {
      this.group.addControl(this.field.key, this.formArray);
    }
}

  private updateInput() {
    // If form array is valid, set the validators values on the parent input
    if (this.formArray.valid) {
      this.input.setValue(this.formArray.value);
      this.input.clearValidators();

    // If not, set it to null and add a validator that will render it invalid
    } else {
      this.input.setValue(null);
      this.input.addValidators(Validators.requiredTrue);
    }

    this.input.updateValueAndValidity();
  }

  protected get addButtonStyle() : TotsFormButtonMatDirective {
    return this.field.extra?.addButtonStyle || this.totsStringArrayConfig.addButtonStyle;
  }
  protected get addButtonMatIcon() : string {
    return this.field.extra?.addButtonMatIcon || this.totsStringArrayConfig.addButtonMatIcon;
  }
  protected get addButtonMatColor() : ThemePalette {
    return this.field.extra?.addButtonMatColor || this.totsStringArrayConfig.addButtonMatColor;
  }
  protected get addButtonCaption() : string {
    return this.field.extra?.addButtonCaption || this.totsStringArrayConfig.addButtonCaption;
  }
  protected get maxAmount() : number {
    return this.field.extra?.maxAmount || 10;
  }
  protected get matHint() : string | undefined {
    return this.field.extra?.caption;
  }

  protected getControlByIndex(index: number): FormControl<String> {
    return this.formArray.controls[index] as FormControl<String>;
  }

  protected hasIndividualError(index:number) {
    return this.formArray.controls[index].invalid && (this.formArray.controls[index].dirty || this.formArray.controls[index].touched);
  }
  protected getIndividualMessageError(index:number): string {
    if(this.field.errors == undefined){
        return '';
    }

    for (const error of this.field.errors) {
        if(this.formArray.controls[index].hasError(error.name)){
            return error.message;
        }
    }

    return '';
  }

  protected addOne() {
    this.formArray.push(TotsFormHelper.createFormControl(this.field, this.group));
    setTimeout(() => {
      this.formArray.updateValueAndValidity();
    });
  }
  protected removeOne(index:number) {
    this.formArray.removeAt(index);
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {


    if(Array.isArray(field.key)){
      let dataArray = TotsFormHelper.getItemValueByKey(item, field.key);
      if(dataArray == undefined || dataArray == ''){
        return;
      }

      (group.get(field.key.join('_')) as FormArray).clear();

      // Create all controls
      for (let index = 0; index < dataArray.length; index++) {
        let inpt = new FormControl<String>(dataArray[index]);
        (group.get(field.key.join('_')) as FormArray).push(inpt);
      }
    } else {
      let dataArray = item[field.key];
      if(dataArray == undefined || dataArray == ''){
        return;
      }

      (group.get(field.key) as FormArray).clear();

      // Create all controls
      for (let index = 0; index < dataArray.length; index++) {
        let inpt = new FormControl<String>(dataArray[index]);
        (group.get(field.key) as FormArray).push(inpt);
      }
    }
  }

}
