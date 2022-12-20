import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { StringFieldComponent, SubmitButtonFieldComponent } from '@tots/form';
import { TotsFormSidebarPageConfig } from 'projects/tots/form-sidebar-page/src/lib/entities/tots-form-sidebar-page-config';
import { LabelHtmlFieldComponent, RowFieldComponent } from 'projects/tots/form/src/public-api';

@Component({
  selector: 'app-form-sidebar',
  templateUrl: './form-sidebar.component.html',
  styleUrls: ['./form-sidebar.component.scss']
})
export class FormSidebarComponent implements OnInit {
  config!: TotsFormSidebarPageConfig;

  item1 = { title: 'Prueba' };

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig() {
    this.config = new TotsFormSidebarPageConfig();
    this.config.title = 'Settings';
    this.config.items = [
      { 
        icon: 'settings', 
        title: 'Account',
        subtitle: 'Manage your public profile and private information.',
        item: this.item1,
        fields: [
          { key: '', component: LabelHtmlFieldComponent, extra: { html: '<h2>Account</h2>' } },
          { key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...' } },
          { key: '', component: RowFieldComponent, extra: { fields: [
            { key: 'firstname', component: StringFieldComponent, label: 'Nombre', validators: [Validators.required], extra: {  } },
            { key: 'lastname', component: StringFieldComponent, label: 'Apellido', validators: [Validators.required], extra: {  } },
          ] } },
          { key: 'submit-account', component: SubmitButtonFieldComponent, label: 'Guardar account' }
        ]
      },
      { 
        icon: 'settings', 
        title: 'Security',
        subtitle: 'Manage your password and 2-step verification preferences.',
        item: {},
        fields: [
          { key: 'passowrd', component: StringFieldComponent, label: 'Password', validators: [Validators.required], extra: { } },
          { key: 'submit-pass', component: SubmitButtonFieldComponent, label: 'Cambiar password' }
        ]
      }
    ]
  }
}
