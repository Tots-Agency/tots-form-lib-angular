import { TotsFieldForm } from "@tots/form";
import { Observable } from "rxjs";

export class TotsStepWizard {
    key?: string;
    title: string = '';
    fields?: Array<TotsFieldForm> = [];
    isSelected?: boolean = false;
    isLoading?: boolean = false;
    hasSkip?: boolean = false;
}

export class TotsConfigWizardForm {
    title: string = '';
    item: any;
    steps: Array<TotsStepWizard> = [];
}

export class TotsConfigDynamicWizardForm extends TotsConfigWizardForm {
  // OnChange function to receive a observable
  onChange?: (stepIndex: number) => Observable<Array<TotsFieldForm>>;
}
