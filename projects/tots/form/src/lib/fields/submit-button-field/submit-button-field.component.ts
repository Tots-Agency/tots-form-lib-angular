import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TotsFieldForm } from '../../entities/tots-field-form';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { ThemePalette } from '@angular/material/core';
import { TotsFormButtonMatDirective, TOTS_FORM_BUTTONS_CONFIG, TotsFormButtonsConfig } from '../../entities/tots-buttons-config';
import { TOTS_FORM_DEFAULT_CONFIG, TotsFormDefaultConfig } from '../../entities/tots-form-default-config';

@Component({
  selector: 'tots-submit-button-field',
  templateUrl: './submit-button-field.component.html',
  styleUrls: ['./submit-button-field.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubmitButtonFieldComponent extends TotsBaseFieldComponent implements OnInit {

  matColor : ThemePalette;
  matButtonDirective! : TotsFormButtonMatDirective;

  public get matIcon() : string {
    return this.field.extra?.matIcon || this.totsButtonConfig.positiveButtonIcon;
  }

  constructor(
    @Inject(TOTS_FORM_BUTTONS_CONFIG) protected totsButtonConfig: TotsFormButtonsConfig,
    @Inject(TOTS_FORM_DEFAULT_CONFIG) totsFormDefaultConfig: TotsFormDefaultConfig
  ) {
    super(totsFormDefaultConfig);
  }

  override ngOnInit(): void {
    this.matColor = this.field.extra?.matColor || this.totsButtonConfig.positiveButtonColor;
    this.matButtonDirective = this.field.extra?.matButtonDirective || this.totsButtonConfig.positiveButtonMaterialDirective;
  }

  onClick() {
    if(Array.isArray(this.field.key)){
      this.onAction.next({ key: this.field.key.join('_'), item: {} });
    } else {
      this.onAction.next({ key: this.field.key, item: {} });
    }
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }
}
