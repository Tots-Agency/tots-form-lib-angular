import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/** Others libraries */
import { QuillModule } from 'ngx-quill';
import { MentionHtmlFieldComponent } from './fields/mention-html-field/mention-html-field.component'

@NgModule({
  declarations: [

    /** Fields */
    MentionHtmlFieldComponent
  ],
  imports: [
    /** Angular */
    ReactiveFormsModule,
    /** Others libraries */
    QuillModule
  ],
  exports: [
    /** Fields */
    MentionHtmlFieldComponent
  ]
})
export class TotsQuillMentionFieldFormModule { }
