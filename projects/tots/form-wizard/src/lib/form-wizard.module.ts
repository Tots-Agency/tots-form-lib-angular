import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Tots Libraries */
import { TotsFormModule } from '@tots/form';

/** Components */
import { FormWizardComponent } from './components/form-wizard/form-wizard.component';



@NgModule({
  declarations: [

    /** Components */
    FormWizardComponent
  ],
  imports: [
    CommonModule,

    TotsFormModule,
  ],
  exports: [
    /** Components */
    FormWizardComponent
  ]
})
export class TotsFormWizardModule { }
