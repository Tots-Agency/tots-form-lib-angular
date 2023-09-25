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
    item: any;
    steps: Array<TotsStepWizard> = [];
}
