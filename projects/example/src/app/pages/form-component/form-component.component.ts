import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DatepickerFieldComponent } from 'projects/tots/date-field-form/src/lib/fields/datepicker-field/datepicker-field.component';
import { TotsActionForm } from 'projects/tots/form/src/lib/entities/tots-action-form';
import { TotsModalConfig } from 'projects/tots/form/src/lib/entities/tots-modal-config';
import { SubmitButtonFieldComponent } from 'projects/tots/form/src/lib/fields/submit-button-field/submit-button-field.component';
import { AutocompleteFieldComponent, AutocompleteListFieldComponent, AutocompleteObsFieldComponent, AvatarPhotoFieldComponent, ButtonToggleFieldComponent, FilesListFieldComponent, IntegerFieldComponent, OneFileFieldComponent, PhotosFieldComponent, RowFieldComponent, SelectFieldComponent, SelectObsFieldComponent, StringFieldComponent, TextareaFieldComponent, ToggleFieldComponent, TotsAutocompleteStaticField, TotsFieldForm, TotsFormComponent, TotsFormModalService, TotsRadioButtonOption, TotsStringArrayField, TotsSubmitAndCancelButtons } from 'projects/tots/form/src/public-api';
import { TotsUsersSelectorMenuConfig } from 'projects/tots/users-selector-menu/src/lib/entities/tots-users-selector-menu-config';
import { delay, map, Observable, of, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { DatepickerAndTimeEndFieldComponent, TotsMonthpickerField, TotsRangeDatepickerField } from 'projects/tots/date-field-form/src/public-api';
import { TotsFormApiService, TotsFormModalApiConfig } from 'projects/tots/form-api/src/public-api';
import { QuillFieldComponent } from 'projects/tots/html-field-form/src/public-api';
import { MentionHtmlFieldComponent } from 'projects/tots/quill-mention-field-form/src/public-api';

/** Mention Style */
import Quill from 'quill';
import { MonacoEditorFieldComponent, TotsMonacoEditorField } from 'projects/tots/monaco-editor-field-form/src/public-api';
import { StringArrayFieldComponent } from 'projects/tots/form/src/lib/fields/string-array-field/string-array-field.component';
import { TotsStringField } from 'projects/tots/form/src/lib/field-factories/tots-string-field';
import { ValidatorMax, ValidatorMin, ValidatorRequired } from '../../helpers/tots-validators';
import { TotsSelectField } from 'projects/tots/form/src/lib/field-factories/tots-select-field';
import { TotsAvatarPhotoField } from 'projects/tots/form/src/lib/field-factories/tots-avatar-photo-field';
import { TotsFilesListField } from 'projects/tots/form/src/lib/field-factories/tots-files-list-field';
import { TotsButtonToggleField } from 'projects/tots/form/src/lib/field-factories/tots-button-toggle-field';
import { TotsOneFileField } from 'projects/tots/form/src/lib/field-factories/tots-one-file-field';
import { TotsTextareaField } from 'projects/tots/form/src/lib/field-factories/tots-textarea-field';
import { TotsIntegerField } from 'projects/tots/form/src/lib/field-factories/tots-integer-field';
import { TotsAutocompleteObsField } from 'projects/tots/form/src/lib/field-factories/tots-autocomplete-obs-field';
import { TotsAutocompleteListField } from 'projects/tots/form/src/lib/field-factories/tots-autocomplete-list-field';
import { TotsPhotosField } from 'projects/tots/form/src/lib/field-factories/tots-photos-field';
import { TotsHtmlField } from 'projects/tots/form/src/lib/field-factories/tots-html-field';
import { TotsSelectObsField } from 'projects/tots/form/src/lib/field-factories/tots-select-obs-field';
import { TotsToggleField } from 'projects/tots/form/src/lib/field-factories/tots-toggle-field';
import { TotsSubmitButton } from 'projects/tots/form/src/lib/field-factories/tots-submit-button';
import { TotsDatepickerField, TotsDatepickerTimeRangeField } from '@tots/date-field-form';
import { TotsQuillField } from '@tots/html-field-form';
import { TotsRadioGroupField } from 'projects/tots/form/src/lib/field-factories/tots-radio-group-field';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  fields = new Array<TotsFieldForm>();
  item = { type: 2, customer_id: 3, start_date: undefined, type_toggle: 2, datepicker_time: '1989-08-25 14:00:00', datepicker_time_end: '1989-08-25 18:00:00', extra: { param_test: '123' }, list_names: ['Matias', 'Pedro', 'Jorge'] };
  loading = false;
  configUserSelector = new TotsUsersSelectorMenuConfig();

  dateNow = moment();

  constructor(
    protected modalService: TotsFormModalService,
    protected userService: UserService,
    protected apiService: TotsFormApiService
  ) { }

  ngOnInit(): void {
    this.configForm2();
    this.loadConfigUserSelector();
  }

  onActionForm(action: TotsActionForm) {
    console.log(action);
    switch (action.key) {
      case "submit" : {
        this.loading = true;
        break;
      }
    }
  }

  configForm() {
    this.fields = [
      new TotsStringField("title", "Título", [ValidatorRequired], "Placeholder", "fill", "Este se mostrara publicamente..."),
      new TotsSelectField("type", [
        { id: 1, name: 'Tipo 1'},
        { id: 2, name: 'Tipo 2'},
        { id: 3, name: 'Tipo 3'},
      ], "id", "name", "Tipo"),
      new TotsAvatarPhotoField("avatar", () => { return of({ url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' })}, "Subir imagen", "Eliminar imagen", undefined, "Avatar" ),
      new TotsDatepickerField("start_date", moment(), undefined, "Start date"),
      new TotsFilesListField("attachments", ()=> { return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) }, "+ Add new file", "filename", "Attachments" ),
      new TotsButtonToggleField("type_toggle", [
        { id: 1, title: 'Tipo 1'},
        { id: 2, title: 'Tipo 2'},
        { id: 3, title: 'Tipo 3'},
      ], "Tipo", [ValidatorRequired]),
      new TotsOneFileField("file_one", ()=> { return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) }, "filename", "Upload File", ),
      new TotsTextareaField("caption", "Caption"),
      new TotsIntegerField("integer", "Integer number", [ValidatorMin, ValidatorMax]),
      new TotsAutocompleteObsField("customer_id", this.customerAutocompleteObsProcessed.bind(this), "id", "title", "Customer"),
      new TotsAutocompleteListField("customers", this.customerAutocompleteObsProcessed.bind(this), "id", "title", "Select customer", "photo", "https://storage.googleapis.com/tots-send-public/Frame%2028.png"),
      new TotsPhotosField("photos", ()=> { return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }) }, "url", "Upload photo"),
      new TotsDatepickerTimeRangeField("datepicker_time_range", "datepicker_time_start", "datepicker_time_end", "Start time", "End time"),
      new TotsHtmlField("html", "<hr><hr><hr>"),
      new TotsQuillField("quill_editor", ()=> {
        return of({ filename: 'test_file.png', url: 'https://storage.googleapis.com/tots-send-public/Frame%2028.png' }).pipe(map(res => res.url))
      }, 80, "Html Editor"),
      new TotsMonacoEditorField("monaco_editor", "mysql", ()=> {
        return [
          {
            label: 'Ejemplo1',
            kind: (<any>window).monaco.languages.CompletionItemKind.Method,
            insertText: '{{Ejemplo1}}',
            documentation: 'Descripción de Ejemplo1',
          },
          {
            label: 'Test2',
            kind: (<any>window).monaco.languages.CompletionItemKind.Variable,
            insertText: '{{Test2}}',
            preselect: true,
            documentation: 'Descripción de Ejemplo2',
          },
          {
            label: 'Snipper',
            kind: (<any>window).monaco.languages.CompletionItemKind.Snippet,
            insertText: '${sinpper}',
            //command: { id: 'editor.action.insertLineAfter' }
          }
        ];
      }, "Editor Monaco"),
      new TotsStringField(["extra", "param_test"], "Extra param"),
      new TotsSelectObsField("select_obs", this.customerForSelectObs.bind(this), "id", "title", "Customers select"),
      new TotsToggleField("toggle", "Toggle"),
      new TotsSubmitButton("submit", "Enviar")
    ];
  }
  configForm2() {
    this.fields = [
      new TotsMonthpickerField("month", undefined, undefined, "Month Picker", undefined, undefined, [ValidatorRequired]),
      new TotsSubmitButton("submit", "Enviar"),
    ];
  }

  onClickOpenModal() {
    let config = new TotsModalConfig();
    config.title = 'Modal de ejemplo';
    config.autoSave = true;
    config.item = this.item;
    config.fields = [
      new TotsStringField("title", "Título", [ValidatorRequired], undefined, undefined, "Esto se mostrará publicamente..."),
      new TotsSelectField("type", [
        { id: 1, title: 'Tipo 1'},
        { id: 2, title: 'Tipo 2'},
        { id: 3, title: 'Tipo 3'},
      ], "id", "title", "Tipo"),
      new TotsAutocompleteStaticField("customer_id", [
        { id: 1, title: 'Customer 1' },
        { id: 2, title: 'Customer 2' },
        { id: 3, title: 'Customer 3' },
        { id: 4, title: 'Customer 4' },
      ], "id", "title", "title", "Customer"),
      new TotsSubmitButton("submit", "Enviar")
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
      new TotsStringField("title", "Title", [ValidatorRequired]),
      new TotsSubmitButton("submit", "CREATE", "check", "accent", "mat-stroked-button")
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

  mentionOnSelect(editor: any, item: any, insertItem: any) {
    insertItem(item)
    // necessary because quill-mention triggers changes as 'api' instead of 'user'
    editor.quillEditor.insertText(editor.quillEditor.getLength() - 1, '', 'user');
  }

  mentionSource(editor: any, searchTerm: any, renderList: any, mentionChar: any) {
    let values = [
      { id: 1, value: "Fredrik Sundqvist" },
      { id: 2, value: "Patrik Sjölin" }
    ];

    if (searchTerm.length === 0) {
      renderList(values, searchTerm);
    } else {
      const matches = [];
      for (let i = 0; i < values.length; i++)
        if (
          ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
        )
          matches.push(values[i]);
      renderList(matches, searchTerm);
    }
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

  customerForSelectObs(): Observable<Array<any>> {
    let customers = [
      { id: 1, title: 'Customer 1' },
      { id: 2, title: 'Customer 2' },
      { id: 3, title: 'Customer 3' },
      { id: 4, title: 'Customer 4' },
    ];

    return of(customers);
  }

  onChangeDate(value: any) {
    console.log(value);
  }
}
