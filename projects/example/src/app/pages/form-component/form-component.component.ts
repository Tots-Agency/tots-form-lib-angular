import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DatepickerFieldComponent } from 'projects/tots/date-field-form/src/lib/fields/datepicker-field/datepicker-field.component';
import { TotsActionForm } from 'projects/tots/form/src/lib/entities/tots-action-form';
import { TotsModalConfig } from 'projects/tots/form/src/lib/entities/tots-modal-config';
import { SubmitButtonFieldComponent } from 'projects/tots/form/src/lib/fields/submit-button-field/submit-button-field.component';
import { AutocompleteFieldComponent, AvatarPhotoFieldComponent, ButtonToggleFieldComponent, FilesListFieldComponent, SelectFieldComponent, StringFieldComponent, TotsFieldForm, TotsFormComponent, TotsFormModalService } from 'projects/tots/form/src/public-api';
import { TotsUsersSelectorMenuConfig } from 'projects/tots/users-selector-menu/src/lib/entities/tots-users-selector-menu-config';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  fields = new Array<TotsFieldForm>();
  item = { type: 2, customer_id: 3, start_date: '2023-08-25' };

  configUserSelector = new TotsUsersSelectorMenuConfig();

  constructor(
    protected modalService: TotsFormModalService,
    protected userService: UserService
  ) { }

  ngOnInit(): void {
    this.configForm();
    this.loadConfigUserSelector();
  }

  onActionForm(action: TotsActionForm) {
    console.log(action);
  }

  configForm() {
    this.fields = [
      // Campo string
      { key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...' } },
      // Campo de selector normal
      { key: 'type', component: SelectFieldComponent, label: 'Tipo', validators: [Validators.required], extra: { options: [
        { id: 1, title: 'Tipo 1'},
        { id: 2, title: 'Tipo 2'},
        { id: 3, title: 'Tipo 3'},
      ] } },
      // Campo Avatar
      { key: 'avatar', component: AvatarPhotoFieldComponent, label: 'Avatar', extra: { button_text: 'Subir imagen', remove_text: 'Eliminar imagen', service: { upload: () => { return of({ url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) } } } },
      // Campo Date
      { key: 'start_date', component: DatepickerFieldComponent, label: 'Start date' },
      // Campo Files List
      { key: 'attachments', component: FilesListFieldComponent, label: 'Attachments', extra: { textAddButton: '+ Add new file', display_key: 'filename', service: { upload: () => { return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) } } } },
      // Campo Button Toggle
      { key: 'type_toggle', component: ButtonToggleFieldComponent, label: 'Tipo', validators: [Validators.required], extra: { options: [
        { id: 1, title: 'Tipo 1'},
        { id: 2, title: 'Tipo 2'},
        { id: 3, title: 'Tipo 3'},
      ] } },

      { key: 'submit', component: SubmitButtonFieldComponent, label: 'Enviar' }
    ];
  }

  onClickOpenModal() {
    let config = new TotsModalConfig();
    config.title = 'Modal de ejemplo';
    config.autoSave = true;
    config.item = this.item;
    config.fields = [
      // Campo string
      { key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...' } },
      // Campo de selector normal
      { key: 'type', component: SelectFieldComponent, label: 'Tipo', validators: [Validators.required], extra: { options: [
        { id: 1, title: 'Tipo 1'},
        { id: 2, title: 'Tipo 2'},
        { id: 3, title: 'Tipo 3'},
      ] } },

      { key: 'customer_id', component: AutocompleteFieldComponent, label: 'Customer', extra: {
        selected_key: 'id',
        filter_key: 'title',
        display_key: 'title',
        options: [
          { id: 1, title: 'Customer 1' },
          { id: 2, title: 'Customer 2' },
          { id: 3, title: 'Customer 3' },
          { id: 4, title: 'Customer 4' },
        ]
      } },

      { key: 'submit', component: SubmitButtonFieldComponent, label: 'Enviar' }
    ];
    this.modalService.open(config).subscribe(action => {
      console.log(action)
    });
  }

  loadConfigUserSelector() {
    this.configUserSelector.service = this.userService;
    this.configUserSelector.searchFields = ['firstname', 'lastname'];
    this.configUserSelector.identifierField = 'id';
    this.configUserSelector.firstnameField = 'firstname';
    this.configUserSelector.lastnameField = 'lastname';
    this.configUserSelector.photoField = 'photo';

    this.configUserSelector.textButton = 'Select user';
    this.configUserSelector.prependIcon = 'person';
  }
}
