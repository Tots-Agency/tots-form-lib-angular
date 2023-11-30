import { Injectable, InjectionToken } from "@angular/core";
import { TotsFormButtonMatDirective } from "./tots-buttons-config";
import { ThemePalette } from "@angular/material/core";

export const TOTS_STRING_ARRAY_CONFIG = new InjectionToken<TotsStringArrayConfig>("tots_string_array_config");

@Injectable()
export class TotsStringArrayConfig {
  addButtonStyle? : TotsFormButtonMatDirective;
  addButtonMatIcon? : string = "add";
  addButtonMatColor? : ThemePalette = "primary";
  addButtonCaption? : string = "Add";
}