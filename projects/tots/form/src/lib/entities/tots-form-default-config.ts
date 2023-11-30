import { Injectable, InjectionToken } from "@angular/core";

export const TOTS_FORM_DEFAULT_CONFIG = new InjectionToken<TotsFormDefaultConfig>("tots_form_default_config");
export enum eTotsFormLabelPosition {
  INSIDE,
  ABOVE
};

@Injectable()
export class TotsFormDefaultConfig {
  labelPosition? : eTotsFormLabelPosition = eTotsFormLabelPosition.INSIDE;
}