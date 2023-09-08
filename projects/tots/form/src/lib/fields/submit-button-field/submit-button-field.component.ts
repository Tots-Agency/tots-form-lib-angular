import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TotsFieldForm } from '../../entities/tots-field-form';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { ThemePalette } from '@angular/material/core';
import { TotsFormButtonMatDirective, TOTS_FORM_BUTTONS_CONFIG, TotsFormButtonsConfig } from '../../entities/tots-buttons-config';

@Component({
  selector: 'tots-submit-button-field',
  templateUrl: './submit-button-field.component.html',
  styleUrls: ['./submit-button-field.component.css']
})
export class SubmitButtonFieldComponent extends TotsBaseFieldComponent implements OnInit {

  matColor : ThemePalette;
  matButtonDirective! : TotsFormButtonMatDirective;

  constructor(@Inject(TOTS_FORM_BUTTONS_CONFIG) protected totsButtonConfig: TotsFormButtonsConfig) {
    super();
  }

  override ngOnInit(): void {
    this.matColor = this.field.extra.matColor || this.totsButtonConfig.positiveButtonColor;
    this.matButtonDirective = this.field.extra.matButtonDirective || this.totsButtonConfig.positiveButtonMaterialDirective;
  }

  onClick() {
    this.onAction.next({ key: this.field.key, item: {} });
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) { }
}
