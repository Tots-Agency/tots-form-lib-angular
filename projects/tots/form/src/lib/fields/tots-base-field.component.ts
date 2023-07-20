import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { TotsActionForm } from "../entities/tots-action-form";
import { TotsFieldForm } from "../entities/tots-field-form";
import { TotsFormHelper } from "../helpers/tots-form-helper";

@Component({
    selector: 'tots-base-field',
    template: ''
})
export class TotsBaseFieldComponent implements OnInit {

    @Input() field!: TotsFieldForm;
    @Input() group!: UntypedFormGroup;
    @Input() onAction!: Subject<TotsActionForm>;

    input!: UntypedFormControl;

    constructor() { }

    ngOnInit(): void {
        this.input = TotsFormHelper.createFormControl(this.field, this.group);
    }

    getAppearance() {
        if(this.field.extra && this.field.extra.appearance){ return this.field.extra.appearance; }
        return 'fill';
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
        group.get(field.key)?.setValue(item[field.key]);
    }

    static updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
        item[field.key] = group.get(field.key)?.value;
    }
}
