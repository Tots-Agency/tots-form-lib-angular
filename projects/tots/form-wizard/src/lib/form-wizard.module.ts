import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Angular Material */
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

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

    MatStepperModule,
    MatButtonModule,

    TotsFormModule,
  ],
  exports: [
    /** Components */
    FormWizardComponent
  ]
})
export class TotsFormWizardModule { }
