import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { StringFieldComponent, TotsActionForm } from '@tots/form';
import { TotsConfigWizardForm } from 'projects/tots/form-wizard/src/lib/entities/tots-config-wizard-form';
import { TotsFormWizardComponent } from 'projects/tots/form-wizard/src/public-api';

@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export class FormWizardComponent implements OnInit {

  config!: TotsConfigWizardForm;
  @ViewChild("wizardForm") wizardForm! : TotsFormWizardComponent;

  constructor() { }

  ngOnInit(): void {
    this.loadConfig();
  }

  onActionForm(action: TotsActionForm) {
    if(action.key == 'next-step'){
      action.item.isLoading = true;
      setTimeout(() => {
        action.item.isLoading = false;
        this.wizardForm.nextStep();
      }, 2000);
    }
  }

  loadConfig() {
    this.config = new TotsConfigWizardForm();
    this.config.title = 'Form Wizard Title';
    this.config.item = { subtitle: 'Testing' };
    this.config.stepperPosition = "side";
    this.config.backButtonCaption = "ATRÁS (por config)";
    this.config.steps = [
      {
        key: 'step-one',
        title: 'Step One',
        fields: [
          { key: 'title', component: StringFieldComponent, label: 'Titulo' },
          //{ key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...', icon: 'home' }, errors: [{ name: 'required', message: 'You must enter a value' }] },
        ]
      },
      {
        key: 'step-two',
        title: 'Step Two',
        fields: [
          { key: 'subtitle', component: StringFieldComponent, label: 'Subtitle', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...', icon: 'home' }, errors: [{ name: 'required', message: 'You must enter a value' }] },
        ]
      }

    ];
  }
}
