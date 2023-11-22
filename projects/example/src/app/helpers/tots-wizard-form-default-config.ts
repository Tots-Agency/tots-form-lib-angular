import { TotsWizardFormDefaultConfig } from "@tots/form-wizard";

export const wizardDefaultConfig : TotsWizardFormDefaultConfig = {
	backButtonCaption: "Atrás",
    backButtonMaterialDirective: "mat-stroked-button",
    backButtonColor: "warn",

    skipButtonCaption: "SALTEAR PASO",
    skipButtonMaterialDirective: "mat-flat-button",
    skipButtonColor: "accent",

	nextStepButtonCaption: "SIGUIENTE",
    submitButtonCaption: "GUARDAR",
    nextSubmitButtonMaterialDirective: "mat-raised-button",
    nextSubmitButtonColor: "primary",

	loadingCaption: "CARGANDO...",

	stepperPosition: "side",
}