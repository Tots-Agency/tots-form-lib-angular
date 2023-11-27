import { Injectable, InjectionToken } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { TotsFormButtonMatDirective } from "@tots/form";

export const TOTS_WIZARD_FORM_DEFAULT_CONFIG = new InjectionToken<TotsWizardFormDefaultConfig>('wizard_form_default_config');

@Injectable()
export class TotsWizardFormDefaultConfig {
  backButtonCaption? : string = "BACK";
  /**
   * Material button style for the next step and submit buttons
   */
  backButtonMaterialDirective? : TotsFormButtonMatDirective = "mat-button";
  /**
   * Material button color for the next step and submit buttons
   */
  backButtonColor? : ThemePalette = undefined;


  skipButtonCaption? : string = "SKIP";
  /**
   * Material button style for the next step and submit buttons
   */
  skipButtonMaterialDirective? : TotsFormButtonMatDirective = "mat-button";
  /**
   * Material button color for the next step and submit buttons
   */
  skipButtonColor? : ThemePalette = undefined;


  /**
   * The caption that will be displayed in every button that proceeds to the next step
   */
  nextStepButtonCaption? : string = "CONTINUE";
  /**
   * The caption that will be displayed in the last step.
   */
  submitButtonCaption? : string = "SAVE";
  /**
   * Material button style for the next step and submit buttons
   */
  nextSubmitButtonMaterialDirective? : TotsFormButtonMatDirective = "mat-flat-button";
  /**
   * Material button color for the next step and submit buttons
   */
  nextSubmitButtonColor? : ThemePalette = "primary";

  /**
   * Text that will appearwhen switching steps
   */
  loadingCaption? : string = "Loading...";

  stepperPosition? : "top"|"side" = "top";
}