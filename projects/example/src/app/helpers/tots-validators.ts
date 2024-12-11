import { Validators } from "@angular/forms";
import { TotsValidator } from "projects/tots/form/src/public-api";

export const ValidatorRequiredTrue = new TotsValidator(Validators.requiredTrue, "required", "Required true");
export const ValidatorRequired = new TotsValidator(Validators.required, "required", "Este campo es requerido");
export const ValidatorMin = new TotsValidator(Validators.min(1), "min", "Mínimo 1");
export const ValidatorMax = new TotsValidator(Validators.max(10), "max", "Máximo 10");
export const ValidatorPattern = new TotsValidator(Validators.pattern("^(-[1-9][0-9]*|0|[1-9][0-9]*)$"), "pattern", "Inválido");