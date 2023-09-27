import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/** Others libraries */
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

/** Fields */
import { MonacoEditorFieldComponent } from './fields/monaco-editor-field/monaco-editor-field.component';

@NgModule({
  declarations: [
    /** Fields */
    MonacoEditorFieldComponent
  ],
  imports: [
    /** Angular */
    ReactiveFormsModule,
    /** Others libraries */
    MonacoEditorModule.forRoot()
  ],
  exports: [
    /** Fields */
    MonacoEditorFieldComponent
  ]
})
export class TotsMonacoEditorFieldFormModule { }
