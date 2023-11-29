import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TotsFieldForm } from '../../entities/tots-field-form';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { ThemePalette } from '@angular/material/core';
import { TOTS_FORM_BUTTONS_CONFIG, TotsFormButtonMatDirective, TotsFormButtonsConfig } from '../../entities/tots-buttons-config';
import { TOTS_FORM_DEFAULT_CONFIG, TotsFormDefaultConfig } from '../../entities/tots-form-default-config';

@Component({
  selector: 'tots-submit-and-cancel-buttons-field',
  templateUrl: './submit-and-cancel-buttons-field.component.html',
  styleUrls: ['./submit-and-cancel-buttons-field.component.css']
})
export class SubmitAndCancelButtonsFieldComponent extends TotsBaseFieldComponent implements OnInit {

  submitMatColor! : ThemePalette;
  submitMatButtonDirective! : TotsFormButtonMatDirective;

  cancelLabel! : string;
  cancelMatColor! : ThemePalette;
  cancelMatButtonDirective! : TotsFormButtonMatDirective;

  constructor(
    @Inject(TOTS_FORM_BUTTONS_CONFIG) protected totsButtonConfig: TotsFormButtonsConfig,
    @Inject(TOTS_FORM_DEFAULT_CONFIG) totsFormDefaultConfig: TotsFormDefaultConfig
  ) {
    super(totsFormDefaultConfig);
  }

  override ngOnInit(): void {
    this.submitMatColor = this.field.extra?.matColor || this.totsButtonConfig.positiveButtonColor;
    this.submitMatButtonDirective = this.field.extra?.matButtonDirective || this.totsButtonConfig.positiveButtonMaterialDirective;

    this.cancelLabel = this.field.extra?.cancelLabel || this.totsButtonConfig.negativeButtonCaption;
    this.cancelMatColor = this.totsButtonConfig.negativeButtonColor;
    this.cancelMatButtonDirective = this.field.extra?.matCancelButtonDirective || this.totsButtonConfig.negativeButtonMaterialDirective;
  }

  onClick() {
    if(Array.isArray(this.field.key)){
      this.onAction.next({ key: this.field.key.join('_'), item: {} });
    } else {
      this.onAction.next({ key: this.field.key, item: {} });
    }
  }
  onCancel() {
    this.onAction.next({ key: "cancel", item: {} });
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }
}
