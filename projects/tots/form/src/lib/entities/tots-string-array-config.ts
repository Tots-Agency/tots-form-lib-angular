import { Injectable, InjectionToken } from "@angular/core";
import { TotsFormButtonMatDirective } from "./tots-buttons-config";

export const TOTS_STRING_ARRAY_CONFIG = new InjectionToken<TotsStringArrayConfig>("tots_string_array_config");

@Injectable()
export class TotsStringArrayConfig {
  addButtonStyle? : TotsFormButtonMatDirective;
  addButtonMatIcon? : string = "add";

  /**
   * Material button color class for the add field button. Ex color directive
   */
  addButtonMatColor? : string = "primary";
  addButtonCaption? : string = "Add";
}