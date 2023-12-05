import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TotsFormModule } from '@tots/form';

/** Others libraries */
import { QuillModule } from 'ngx-quill'

/** Fields */
import { QuillFieldComponent } from './fields/quill-field/quill-field.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    QuillFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TotsFormModule,
    QuillModule,
  ],
  exports: [
    QuillFieldComponent
  ]
})
export class TotsHtmlFieldFormModule { }
