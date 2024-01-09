import { Injectable, InjectionToken } from "@angular/core";
import { ThemePalette } from "@angular/material/core";

export const TOTS_FORM_BUTTONS_CONFIG = new InjectionToken<TotsFormButtonsConfig>('confirm_button_config');
export type TotsFormButtonMatDirective = "mat-button"|"mat-flat-button"|"mat-raised-button"|"mat-stroked-button";

@Injectable()
export class TotsFormButtonsConfig {
  positiveButtonMaterialDirective : TotsFormButtonMatDirective = "mat-button";
  positiveButtonColor : ThemePalette = "primary";
  positiveButtonIcon : string|undefined = undefined;
  negativeButtonCaption : string = "Cancel";
  negativeButtonMaterialDirective : TotsFormButtonMatDirective = "mat-button";
  negativeButtonColor : ThemePalette = undefined;   // Unthemed
}