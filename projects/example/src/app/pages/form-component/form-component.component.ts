import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DatepickerFieldComponent } from 'projects/tots/date-field-form/src/lib/fields/datepicker-field/datepicker-field.component';
import { TotsActionForm } from 'projects/tots/form/src/lib/entities/tots-action-form';
import { TotsModalConfig } from 'projects/tots/form/src/lib/entities/tots-modal-config';
import { SubmitButtonFieldComponent } from 'projects/tots/form/src/lib/fields/submit-button-field/submit-button-field.component';
import { AutocompleteFieldComponent, AutocompleteListFieldComponent, AutocompleteObsFieldComponent, AvatarPhotoFieldComponent, ButtonToggleFieldComponent, FilesListFieldComponent, IntegerFieldComponent, OneFileFieldComponent, PhotosFieldComponent, RowFieldComponent, SelectFieldComponent, StringFieldComponent, TextareaFieldComponent, TotsFieldForm, TotsFormComponent, TotsFormModalService } from 'projects/tots/form/src/public-api';
import { TotsUsersSelectorMenuConfig } from 'projects/tots/users-selector-menu/src/lib/entities/tots-users-selector-menu-config';
import { delay, map, Observable, of, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { DatepickerAndTimeEndFieldComponent } from 'projects/tots/date-field-form/src/public-api';
import { TotsFormApiService, TotsFormModalApiConfig } from 'projects/tots/form-api/src/public-api';
import { HtmlFieldComponent } from 'projects/tots/html-field-form/src/public-api';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  fields = new Array<TotsFieldForm>();
  item = { type: 2, customer_id: 3, start_date: '2023-08-25', type_toggle: 2, datepicker_time: '1989-08-25 14:00:00', datepicker_time_end: '1989-08-25 18:00:00' };

  configUserSelector = new TotsUsersSelectorMenuConfig();

  dateNow = moment();

  constructor(
    protected modalService: TotsFormModalService,
    protected userService: UserService,
    protected apiService: TotsFormApiService
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
      { key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...', icon: 'home' }, errors: [{ name: 'required', message: 'You must enter a value' }] },
      // Campo Row
      /*{ key: '', component: RowFieldComponent, extra: { fields: [
        { key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...', icon: 'home' } },
        { key: 'title', component: StringFieldComponent, label: 'Titulo', validators: [Validators.required], extra: { caption: 'Este se mostrara publicamente...', icon: 'home' } },
      ] } },*/
      // Campo de selector normal
      { key: 'type', component: SelectFieldComponent, label: 'Tipo', validators: [Validators.required], extra: { options: [
        { id: 1, title: 'Tipo 1'},
        { id: 2, title: 'Tipo 2'},
        { id: 3, title: 'Tipo 3'},
      ] } },
      // Campo Avatar
      { key: 'avatar', component: AvatarPhotoFieldComponent, label: 'Avatar', extra: { button_text: 'Subir imagen', remove_text: 'Eliminar imagen', service: { upload: () => { return of({ url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) } } } },
      // Campo Date
      { key: 'start_date', component: DatepickerFieldComponent, label: 'Start date', extra: { minDate: new Date() } },
      // Campo Files List
      { key: 'attachments', component: FilesListFieldComponent, label: 'Attachments', extra: { textAddButton: '+ Add new file', display_key: 'filename', service: { upload: () => { return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) } } } },
      // Campo Button Toggle
      { key: 'type_toggle', component: ButtonToggleFieldComponent, label: 'Tipo', validators: [Validators.required], extra: { options: [
        { id: 1, title: 'Tipo 1'},
        { id: 2, title: 'Tipo 2'},
        { id: 3, title: 'Tipo 3'},
      ] } },
      // Campo One File
      { key: 'file_one', component: OneFileFieldComponent, label: 'Upload SIF File', extra: { display_key: 'filename', service: { upload: () => { return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) } } } },
      // Campo textarea
      { key: 'caption', component: TextareaFieldComponent, label: 'Caption' },
      // Campo Integer
      { key: 'integer', component: IntegerFieldComponent, label: 'Integer Number', validators: [Validators.min(1), Validators.max(5)] },
      // campo Autocomplete OBS
      { key: 'customer_id', component: AutocompleteObsFieldComponent, label: 'Customer', extra: {
        selected_key: 'id',
        filter_key: 'title',
        display_key: 'title',
        display_photo: 'photo',
        obs: this.customerAutocompleteObsProcessed.bind(this)
      } },
      // Campo Autocompleete List
      { key: 'customers', component: AutocompleteListFieldComponent, label: 'Select Customer', extra: {
          selected_key: 'id',
          filter_key: 'title',
          display_key: 'title',
          is_show_photo: false,
          placeholder_photo: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png',
          obs: this.customerAutocompleteObsProcessed.bind(this)
      } },
      // Campo Files List
      { key: 'photos', component: PhotosFieldComponent, label: 'Upload photo', extra: { display_key: 'url', service: { upload: () => { return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) } } } },
      //{ key: 'datepicker_time', component: DatepickerAndTimeEndFieldComponent, label: 'Date picker and time', extra: { field_key_end: 'datepicker_time_end', label_start: 'Start time', label_end: 'End time', format_output: 'YYYY-MM-DDTHH:mm:ss' } },
      { key: 'datepicker_time', component: DatepickerAndTimeEndFieldComponent, label: 'Date picker and time', extra: { field_key_end: 'datepicker_time_end', label_start: 'Start time', label_end: 'End time' } },
      // HTMl Editor
      { key: 'html_editor', component: HtmlFieldComponent, label: 'HTML Editor', extra: { fileService: { upload: () => { return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }).pipe(map(res => res.url)) } } } },

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
        display_photo: 'photo',
        //first_query: { id: 4, title: 'Customer 4' },
        options: [
          { id: 1, title: 'Customer 1' },
          { id: 2, title: 'Customer 2' },
          { id: 3, title: 'Customer 3' },
          { id: 4, title: 'Customer 4' },
        ]
      } },

      { key: 'submit', component: SubmitButtonFieldComponent, label: 'Enviar' }
    ];
    this.modalService.open(config)
    .pipe(tap(action => {
      if(action.key == 'submit'){
        action.modal?.componentInstance.showLoading();
      }
    }))
    .pipe(delay(2000))
    .pipe(tap(action => action.modal?.componentInstance.hideLoading()))
    .subscribe(action => {
      console.log(action)
    });
  }

  onClickOpenModalApi() {
    let config = new TotsFormModalApiConfig();
    config.title = 'General Event';
    config.autoSave = false;
    config.service = this.userService;
    config.item = {};
    config.fields = [
        { key: 'title', component: StringFieldComponent, label: 'Title', validators: [Validators.required] },
        { key: 'submit', component: SubmitButtonFieldComponent, label: 'CREATE' }
    ];

    this.apiService.open(config)
    .pipe(tap(action => {
      console.log(action);
    }))
    .subscribe(res => console.log('Res'));
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

  customerAutocompleteObsProcessed(query?: string): Observable<Array<any>> {
    if(typeof query !== "string"){
      return of();
    }

    let customers = [
      { id: 1, title: 'Customer 1' },
      { id: 2, title: 'Customer 2' },
      { id: 3, title: 'Customer 3' },
      { id: 4, title: 'Customer 4' },
    ];

    if(query == undefined||query == ''){
      return of(customers);
    }

    return of(customers.filter(c => c.title.toLowerCase().includes(query.toLowerCase())));
  }

  onChangeDate(value: any) {
    console.log(value);
  }
}
