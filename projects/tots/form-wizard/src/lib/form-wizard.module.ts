import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Angular Material */
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** Tots Libraries */
import { TotsFormModule } from '@tots/form';

/** Components */
import { TotsFormWizardComponent } from './components/form-wizard/form-wizard.component';
import { TOTS_WIZARD_FORM_DEFAULT_CONFIG, TotsWizardFormDefaultConfig } from './entities/tots-wizard-form-default-config';



@NgModule({
  declarations: [

    /** Components */
    TotsFormWizardComponent
  ],
  imports: [
    CommonModule,

    MatStepperModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,

    TotsFormModule,
  ],
  exports: [
    /** Components */
    TotsFormWizardComponent
  ],
  providers: [
    {
      provide: TOTS_WIZARD_FORM_DEFAULT_CONFIG,
      useClass: TotsWizardFormDefaultConfig
    }
  ]
})
export class TotsFormWizardModule { }
