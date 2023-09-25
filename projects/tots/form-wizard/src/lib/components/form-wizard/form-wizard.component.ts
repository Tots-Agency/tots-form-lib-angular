import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TotsConfigWizardForm, TotsStepWizard } from '../../entities/tots-config-wizard-form';
import { TotsActionForm, TotsFormComponent } from '@tots/form';

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
    this.selectedItem = this.config.steps[0];
    this.selectedItem.isSelected = true;
    // Emit Action
    this.onAction.emit({ key: 'load-item', item: this.selectedItem });
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
    this.changeDetector.detectChanges();
    // Emit Action
    this.onAction.emit({ key: 'load-item', item: item });
  }

  onActionForm(action: TotsActionForm) {
    let newAction = new TotsActionForm();
    newAction.key = action.key;
    newAction.item = action.item;
    this.onAction.emit(newAction);
  }
}
