import { FormArray, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { TOTS_STRING_ARRAY_CONFIG, TotsStringArrayConfig } from '../../entities/tots-string-array-config';
import { ThemePalette } from '@angular/material/core';
import { TOTS_FORM_DEFAULT_CONFIG, TotsFormDefaultConfig } from '../../entities/tots-form-default-config';
import { TotsFormHelper } from '../../helpers/tots-form-helper';
import { TotsFormButtonMatDirective } from '../../entities/tots-buttons-config';

@Component({
  selector: 'tots-string-array-field',
  templateUrl: './string-array-field.component.html',
  styleUrls: ['./string-array-field.component.scss']
})
export class StringArrayFieldComponent extends TotsBaseFieldComponent implements OnInit {

  protected fg! : FormGroup;
  private validators? : ValidatorFn[];

  constructor(
    @Inject(TOTS_STRING_ARRAY_CONFIG) protected totsStringArrayConfig: TotsStringArrayConfig,
    @Inject(TOTS_FORM_DEFAULT_CONFIG) totsFormDefaultConfig: TotsFormDefaultConfig
  ) {
    super(totsFormDefaultConfig);
  }

  override ngOnInit(): void {
      this.input = TotsFormHelper.createFormControl(this.field, this.group);

      let formArray = new FormArray([TotsFormHelper.createFormControl(this.field, this.group)]);
      this.fg = new FormGroup({
        formArray: formArray
      });

      this.formArray.valueChanges.subscribe(value=> {
        this.updateInput();
      });
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



  protected get formArray() : FormArray {
    return this.fg.get("formArray") as FormArray;
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
}
