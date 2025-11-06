import { Injectable, InjectionToken } from "@angular/core";

export const TOTS_FORM_BUTTONS_CONFIG = new InjectionToken<TotsFormButtonsConfig>('confirm_button_config');
export type TotsFormButtonMatDirective = "mat-button"|"mat-flat-button"|"mat-raised-button"|"mat-stroked-button";

@Injectable()
export class TotsFormButtonsConfig {
  positiveButtonMaterialDirective : TotsFormButtonMatDirective = "mat-button";

  /** Ex color directive, now passed as class */
  positiveButtonColor : string = "primary";
  positiveButtonIcon : string|undefined = undefined;
  negativeButtonCaption : string = "Cancel";
  negativeButtonMaterialDirective : TotsFormButtonMatDirective = "mat-button";

  /** Ex color directive, now passed as class */
  negativeButtonColor : string|undefined = undefined;   // Unthemed
}