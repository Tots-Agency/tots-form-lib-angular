import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TotsConfigDynamicWizardForm, TotsConfigWizardForm, TotsStepWizard } from '../../entities/tots-config-wizard-form';
import { TotsActionForm, TotsFormComponent } from '@tots/form';
import { CdkStep, StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tots-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export class FormWizardComponent {

  @ViewChild('form') form!: TotsFormComponent;

  @Input() config!: TotsConfigWizardForm;

  @Output() onAction = new EventEmitter<TotsActionForm>();

  selectedIndex: number = 0;
  selectedItem?: TotsStepWizard;

  constructor(
    protected changeDetector: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    if(this.config instanceof TotsConfigDynamicWizardForm){
      this.config.onChange!(0).subscribe(fields => {
        this.config.steps[0].fields = fields;
      });
    }

    this.selectedItem = this.config.steps[0];
    this.selectedItem.isSelected = true;
    // Emit Action
    this.onAction.emit({ key: 'load-item', item: this.selectedItem });
  }

  onClickBack() {
    this.onClickItem(this.config.steps[this.selectedIndex-1]);
  }

  onClickContinue() {
    this.onClickItem(this.config.steps[this.selectedIndex+1]);
  }

  onClickSave() {
    this.onAction.emit({ key: 'submit', item: this.config.item });
  }

  onStepChange(cdkStep: StepperSelectionEvent) {
    this.onClickItem(this.config.steps[cdkStep.selectedIndex]);
  }

  onClickItem(item: TotsStepWizard) {
    // Reset all items
    this.config.steps.forEach(i => i.isSelected = false);
    // Active item
    item.isSelected = true;
    // Reset form
    this.selectedItem = undefined;
    this.changeDetector.detectChanges();
    // Load Forms
    this.selectedIndex = this.config.steps.indexOf(item);

    this.selectedItem = item;

    // Verify if dynamic
    if(this.config instanceof TotsConfigDynamicWizardForm){

      this.config.onChange!(this.selectedIndex).subscribe(fields => {
        this.config.steps[this.selectedIndex].fields = fields;
        this.changeDetector.detectChanges();
      });
    } else {
      this.changeDetector.detectChanges();
    }

    // Emit Action
    this.onAction.emit({ key: 'load-item', item: item });
  }

  onActionForm(action: TotsActionForm) {
    let newAction = new TotsActionForm();
    newAction.key = action.key;
    newAction.item = action.item;
    this.onAction.emit(newAction);
  }

  getActiveGroup(): FormGroup {
    if(this.form == undefined){
      return new FormGroup({});
    }

    return this.form.group;
  }

  isDisabled(): boolean {
    if(this.form == undefined){
      return true;
    }

    return !this.form.group.valid;
  }
}
