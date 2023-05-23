import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Others libraries */
import { QuillModule } from 'ngx-quill'

/** Fields */
import { HtmlFieldComponent } from './fields/html-field/html-field.component';



@NgModule({
  declarations: [
    
    /** Fields */
    HtmlFieldComponent
  ],
  imports: [
    /** Angular */
    ReactiveFormsModule,
    /** Others libraries */
    QuillModule
  ],
  exports: [
    /** Fields */
    HtmlFieldComponent
  ]
})
export class TotsHtmlFieldFormModule { }
