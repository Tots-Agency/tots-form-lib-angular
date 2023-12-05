import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TotsFormModule } from '@tots/form';

/** Others libraries */
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

/** Fields */
import { MonacoEditorFieldComponent } from './fields/monaco-editor-field/monaco-editor-field.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MonacoEditorFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    TotsFormModule
  ],
  exports: [
    MonacoEditorFieldComponent
  ]
})
export class TotsMonacoEditorFieldFormModule { }
