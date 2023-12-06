import { Validators } from "@angular/forms";
import { TotsValidator } from "projects/tots/form/src/public-api";

export const ValidatorRequired = new TotsValidator(Validators.required, "required", "Este campo es requerido");
export const ValidatorMin = new TotsValidator(Validators.min(1), "min", "Mínimo 1");
export const ValidatorMax = new TotsValidator(Validators.max(10), "max", "Máximo 10");