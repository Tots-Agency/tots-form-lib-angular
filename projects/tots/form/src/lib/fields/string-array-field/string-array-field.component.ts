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
    let fc = new FormControl();
    if (this.field.validators?.length) {
      fc.setValidators(this.field.validators);
    }

    // Create Control
    this.formArray = new FormArray([fc]);

    // Add in Group
    if(Array.isArray(this.field.key)){
      this.group.addControl(this.field.key.join('_'), this.formArray);
    } else {
      this.group.addControl(this.field.key, this.formArray);
    }
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
    let fc = new FormControl();
    if (this.field.validators?.length) {
      fc.setValidators(this.field.validators);
    }
    this.formArray.push(fc);
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
        let input = new FormControl<String>(dataArray[index]);
        if (field.validators?.length) {
          input.setValidators(field.validators);
        }
        (group.get(field.key.join('_')) as FormArray).push(input);
      }

    } else {
      let dataArray = item[field.key];
      if(dataArray == undefined || dataArray == ''){
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
  }

}
