import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { StringFieldComponent, TotsActionForm } from '@tots/form';
import { TotsConfigWizardForm } from 'projects/tots/form-wizard/src/lib/entities/tots-config-wizard-form';

@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export class FormWizardComponent implements OnInit {
  config!: TotsConfigWizardForm;

  constructor() { }

  ngOnInit(): void {
    this.loadConfig();
  }

  onActionForm(action: TotsActionForm) {
    if(action.key == 'load-item'){
      action.item.isLoading = true;
      setTimeout(() => { action.item.isLoading = false }, 2000);
    }
  }

  loadConfig() {
    this.config = new TotsConfigWizardForm();
    this.config.title = 'Form Wizard Title';
    this.config.item = { subtitle: 'Testing' };
    this.config.steps = [

      {
        key: 'step-one',
        title: 'Step One',
        fields: [
          { key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...', icon: 'home' }, errors: [{ name: 'required', message: 'You must enter a value' }] },
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
