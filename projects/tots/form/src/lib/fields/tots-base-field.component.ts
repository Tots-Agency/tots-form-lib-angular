import { Component, Inject, Input, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { TotsActionForm } from "../entities/tots-action-form";
import { TotsFieldForm } from "../entities/tots-field-form";
import { TotsFormHelper } from "../helpers/tots-form-helper";
import { TOTS_FORM_DEFAULT_CONFIG, TotsFormDefaultConfig, eTotsFormLabelPosition } from "../entities/tots-form-default-config";
import { MatFormFieldAppearance } from "@angular/material/form-field";

@Component({
    selector: 'tots-base-field',
    template: ''
})
export class TotsBaseFieldComponent implements OnInit {

    @Input() field!: TotsFieldForm;
    @Input() group!: UntypedFormGroup;
    @Input() onAction!: Subject<TotsActionForm>;

    input!: UntypedFormControl;

    protected eTotsFormLabelPosition = eTotsFormLabelPosition;
    
    constructor(@Inject(TOTS_FORM_DEFAULT_CONFIG) protected totsFormDefaultConfig: TotsFormDefaultConfig) { }

    ngOnInit(): void {
        this.input = TotsFormHelper.createFormControl(this.field, this.group);
    }

    getAppearance() : MatFormFieldAppearance {
        return this.field.extra?.appearance;
    }

    getClases() {
        if(this.field.extra && this.field.extra.classes){ return this.field.extra.classes; }
        return '';
    }

    getPlaceholder() {
        if(this.field.extra && this.field.extra.placeholder){ return this.field.extra.placeholder; }
        return '';
    }

    isDisabled(): boolean {
        if(this.field.extra && this.field.extra.disabled){ return this.field.extra.disabled; }
        return false;
    }
    isRequired() : boolean {
      return !!this.field.validators?.includes(Validators.required)
    }

    hasError(): boolean {
        return this.input.invalid && (this.input.dirty || this.input.touched);
    }

    getMessageError(): string {
        if(this.field.errors == undefined){
            return '';
        }

        for (const error of this.field.errors) {
            if(this.input.hasError(error.name)){
                return error.message;
            }
        }

        return '';
    }

    static updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
      if(Array.isArray(field.key)){
        group.get(field.key.join('_'))?.setValue(TotsFormHelper.getItemValueByKey(item, field.key));
      } else {
        group.get(field.key)?.setValue(item[field.key]);
      }
    }

    static updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
      if(Array.isArray(field.key)){
        TotsFormHelper.setValueInItemByKey(item, field.key, group.get(field.key.join('_'))?.value);
      } else {
        item[field.key] = group.get(field.key)?.value;
      }
    }
}
