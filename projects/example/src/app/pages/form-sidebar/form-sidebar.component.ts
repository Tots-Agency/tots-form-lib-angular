import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { StringFieldComponent } from '@tots/form';
import { TotsFormSidebarPageConfig } from 'projects/tots/form-sidebar-page/src/lib/entities/tots-form-sidebar-page-config';

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
          { key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...' } },
        ]
      },
      { 
        icon: 'settings', 
        title: 'Security',
        subtitle: 'Manage your password and 2-step verification preferences.',
        item: {},
        fields: [
          { key: 'passowrd', component: StringFieldComponent, label: 'Password', validators: [Validators.required], extra: { } },
        ]
      }
    ]
  }
}
