/** Angular */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Angular Material */
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



/** Components */
import { TotsFormComponent } from './components/tots-form/tots-form.component';

/** Fields */
import { BasePrintFieldComponent } from './fields/base-print-field/base-print-field.component';
import { StringFieldComponent } from './fields/string-field/string-field.component';
import { SubmitButtonFieldComponent } from './fields/submit-button-field/submit-button-field.component';
import { SelectFieldComponent } from './fields/select-field/select-field.component';
import { TotsFormModalComponent } from './modals/tots-form-modal/tots-form-modal.component';
import { LabelHtmlFieldComponent } from './fields/label-html-field/label-html-field.component';
import { RowFieldComponent } from './fields/row-field/row-field.component';
import { AvatarPhotoFieldComponent } from './fields/avatar-photo-field/avatar-photo-field.component';
import { AutocompleteFieldComponent } from './fields/autocomplete-field/autocomplete-field.component';
import { AutocompleteObsFieldComponent } from './fields/autocomplete-obs-field/autocomplete-obs-field.component';
import { FilesListFieldComponent } from './fields/files-list-field/files-list-field.component';
import { ButtonToggleFieldComponent } from './fields/button-toggle-field/button-toggle-field.component';
import { OneFileFieldComponent } from './fields/one-file-field/one-file-field.component';
import { TextareaFieldComponent } from './fields/textarea-field/textarea-field.component';
import { AutocompleteListFieldComponent } from './fields/autocomplete-list-field/autocomplete-list-field.component';




@NgModule({
  declarations: [
    // Components
    TotsFormComponent,
    // Fields
    BasePrintFieldComponent,
    StringFieldComponent,
    SubmitButtonFieldComponent,
    SelectFieldComponent,
    TotsFormModalComponent,
    LabelHtmlFieldComponent,
    RowFieldComponent,
    AvatarPhotoFieldComponent,
    AutocompleteFieldComponent,
    AutocompleteObsFieldComponent,
    FilesListFieldComponent,
    ButtonToggleFieldComponent,
    OneFileFieldComponent,
    TextareaFieldComponent,
    AutocompleteListFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatButtonToggleModule
  ],
  exports: [
    TotsFormComponent,

    /** Fields */
    AutocompleteObsFieldComponent,
    FilesListFieldComponent,
    OneFileFieldComponent,
    AutocompleteListFieldComponent
  ]
})
export class TotsFormModule { }
