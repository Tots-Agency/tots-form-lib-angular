import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { TotsConfigWizardForm, TotsStepWizard } from '../../entities/tots-config-wizard-form';
import { TotsActionForm, TotsFormButtonMatDirective, TotsFormComponent } from '@tots/form';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';
import { TOTS_WIZARD_FORM_DEFAULT_CONFIG, TotsWizardFormDefaultConfig } from '../../entities/tots-wizard-form-default-config';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'tots-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export class TotsFormWizardComponent {

  @ViewChild('form') form!: TotsFormComponent;

  @Input() config!: TotsConfigWizardForm;

  @Output() onAction = new EventEmitter<TotsActionForm>();

  selectedIndex: number = 0;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    @Inject(TOTS_WIZARD_FORM_DEFAULT_CONFIG) private defaultConfig:TotsWizardFormDefaultConfig
  ) {
  }

  ngOnInit(): void {
    console.log(this.defaultConfig);
    // Emit Action
    this.onAction.emit({ key: 'load-item', item: this.currentStep });
  }

  //#region Getters
  protected get currentStep() : TotsStepWizard {
    return this.config.steps[this.selectedIndex];
  }

  protected get backButtonCaption() : string {
    return this.config.backButtonCaption || this.defaultConfig.backButtonCaption;
  }
  protected get backButtonColor() : ThemePalette {
    return this.defaultConfig.backButtonColor;
  }
  protected get backButtonDirectiveClass() : string {
    return this.getMaterialButtonClasses(this.defaultConfig.backButtonMaterialDirective);
  }

  protected get nextStepButtonCaption() : string {
    if (this.currentStep.isLoading)
      return this.defaultConfig.loadingCaption;
    return this.config.nextStepButtonCaption || this.defaultConfig.nextStepButtonCaption!;
  }
  protected get submitButtonCaption() : string {
    if (this.currentStep.isLoading)
      return this.defaultConfig.loadingCaption;
    return this.config.submitButtonCaption || this.defaultConfig.submitButtonCaption;
  }
  protected get nextSubmitStepButtonColor() : ThemePalette {
    return this.defaultConfig.nextSubmitButtonColor;
  }
  protected get nextSubmitButtonDirectiveClass() : string {
    return this.getMaterialButtonClasses(this.defaultConfig.nextSubmitButtonMaterialDirective);
  }

  protected get skipButtonCaption() : string {
    return this.config.skipButtonCaption || this.defaultConfig.skipButtonCaption;
  }
  protected get skipButtonColor() : ThemePalette {
    return this.defaultConfig.skipButtonColor;
  }
  protected get skipButtonDirectiveClass() : string {
    return this.getMaterialButtonClasses(this.defaultConfig.skipButtonMaterialDirective);
  }

  protected get loadingCaption() : string {
    return this.defaultConfig.loadingCaption;
  }

  protected get stepperPosition() : "top"|"side" {
    return this.config.stepperPosition || this.defaultConfig.stepperPosition;
  }

  protected get stepperOrientation() : StepperOrientation {
    return this.stepperPosition == "top" ? "horizontal" : "vertical";
  }
  //#endregion

  private getMaterialButtonClasses(directive:TotsFormButtonMatDirective) {
    switch (directive) {
      case "mat-button" : return "mat-mdc-button";
      case "mat-flat-button" : return "mat-mdc-unelevated-button mdc-button--unelevated";
      case "mat-raised-button" : return "mat-mdc-raised-button mdc-button--raised";
      case "mat-stroked-button" : return "mat-mdc-outlined-button mdc-button--outlined";
    }
  }

  protected onClickBack() {
    this.onClickItem(this.config.steps[this.selectedIndex-1]);
  }

  protected onClickContinue() {
    this.onAction.emit({ key: 'next-step', item: this.currentStep });
  }

  protected onClickSave() {
    this.onAction.emit({ key: 'submit', item: this.config.item });
  }

  protected onStepChange(stepEvent: StepperSelectionEvent) {
    this.onClickItem(this.config.steps[stepEvent.selectedIndex]);
  }

  private onClickItem(step: TotsStepWizard) {
    // Set active step
    this.config.steps.forEach(i => i.isSelected = false);
    step.isSelected = true;

    // Reset form
    this.changeDetector.detectChanges();

    // Load Forms
    this.selectedIndex = this.config.steps.indexOf(step);
    this.changeDetector.detectChanges();

    // Emit Action
    this.onAction.emit({ key: 'load-item', item: step });
  }

  protected isNextSubmitDisabled(): boolean {
    if(this.form == undefined){
      return true;
    }

    return this.form.group.invalid || !!this.currentStep.isLoading;
  }

  protected onActionForm(action: TotsActionForm) {
    let newAction = new TotsActionForm();
    newAction.key = action.key;
    newAction.item = action.item;
    this.onAction.emit(newAction);
  }


  //#region Public
  getActiveGroup(): FormGroup {
    if(this.form == undefined){
      return new FormGroup({});
    }

    return this.form.group;
  }
  nextStep() {
    this.onClickItem(this.config.steps[this.selectedIndex+1]);
  }
  //#endregion
}
