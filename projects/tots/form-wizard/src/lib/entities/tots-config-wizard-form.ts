import { StepperOrientation } from "@angular/cdk/stepper";
import { TotsFieldForm } from "@tots/form";

export class TotsStepWizard {
    key?: string;
    title: string = '';
    fields: Array<TotsFieldForm> = [];
    isSelected?: boolean = false;
    isLoading?: boolean = false;
    hasSkip?: boolean = false;
}

export class TotsConfigWizardForm {
    title: string = '';
    stepperPosition: "top"|"side" = "top";
    item: any;
    steps: Array<TotsStepWizard> = [];

    backButtonCaption! : string;
    skipButtonCaption! : string;
    /**
     * The caption that will be displayed in every button that proceeds to the next step
     */
    nextStepButtonCaption! : string;
    /**
     * The caption that will be displayed in the last step.
     */
    submitButtonCaption! : string;
}
