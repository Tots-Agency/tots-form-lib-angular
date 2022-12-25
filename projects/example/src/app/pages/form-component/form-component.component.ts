import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { TotsActionForm } from 'projects/tots/form/src/lib/entities/tots-action-form';
import { TotsModalConfig } from 'projects/tots/form/src/lib/entities/tots-modal-config';
import { SubmitButtonFieldComponent } from 'projects/tots/form/src/lib/fields/submit-button-field/submit-button-field.component';
import { AvatarPhotoFieldComponent, SelectFieldComponent, StringFieldComponent, TotsFieldForm, TotsFormComponent, TotsFormModalService } from 'projects/tots/form/src/public-api';
import { of } from 'rxjs';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  fields = new Array<TotsFieldForm>();
  item = { type: 2 };

  constructor(
    protected modalService: TotsFormModalService
  ) { }

  ngOnInit(): void {
    this.configForm();
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

      { key: 'submit', component: SubmitButtonFieldComponent, label: 'Enviar' }
    ];
    this.modalService.open(config).subscribe(action => {
      console.log(action)
    });
  }
}
