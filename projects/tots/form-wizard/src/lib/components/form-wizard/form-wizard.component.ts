import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TotsConfigWizardForm, TotsStepWizard } from '../../entities/tots-config-wizard-form';
import { TotsActionForm, TotsFormButtonMatDirective, TotsFormComponent } from '@tots/form';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';
import { TOTS_WIZARD_FORM_DEFAULT_CONFIG, TotsWizardFormDefaultConfig } from '../../entities/tots-wizard-form-default-config';
import { ThemePalette } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'tots-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export class TotsFormWizardComponent implements OnInit, AfterViewInit {

  @ViewChildren('form') protected forms!: QueryList<TotsFormComponent>;
  @ViewChild(MatStepper) protected stepper! : MatStepper;

  @Input() config!: TotsConfigWizardForm;

  @Output() private onAction = new EventEmitter<TotsActionForm>();

  selectedIndex: number = 0;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    @Inject(TOTS_WIZARD_FORM_DEFAULT_CONFIG) protected defaultConfig:TotsWizardFormDefaultConfig
  ) {
  }

  //#region Init
  ngOnInit(): void {
    // Emit Action
    this.onAction.emit({ key: 'load-item', item: this.currentStep });
  }
  ngAfterViewInit() {
    this.stepper._getIndicatorType = ()=> 'number';
    this.changeDetector.detectChanges();
  }
  //#endregion

  //#region Getters
  protected get currentStep() : TotsStepWizard {
    return this.config.steps[this.selectedIndex];
  }

  protected get backButtonCaption() : string | undefined {
    return this.config.backButtonCaption || this.defaultConfig.backButtonCaption;
  }
  protected get backButtonColor() : ThemePalette {
    return this.defaultConfig.backButtonColor;
  }
  protected get backButtonDirectiveClass() : string | undefined {
    return this.getMaterialButtonClasses(this.defaultConfig.backButtonMaterialDirective);
  }

  protected get nextStepButtonCaption() : string | undefined {
    if (this.currentStep.isLoading)
      return this.defaultConfig.loadingCaption;
    return this.config.nextStepButtonCaption || this.defaultConfig.nextStepButtonCaption!;
  }
  protected get submitButtonCaption() : string | undefined {
    if (this.currentStep.isLoading)
      return this.defaultConfig.loadingCaption;
    return this.config.submitButtonCaption || this.defaultConfig.submitButtonCaption;
  }
  protected get nextSubmitStepButtonColor() : ThemePalette {
    return this.defaultConfig.nextSubmitButtonColor;
  }
  protected get nextSubmitButtonDirectiveClass() : string | undefined {
    return this.getMaterialButtonClasses(this.defaultConfig.nextSubmitButtonMaterialDirective);
  }

  protected get skipButtonCaption() : string | undefined {
    return this.config.skipButtonCaption || this.defaultConfig.skipButtonCaption;
  }
  protected get skipButtonColor() : ThemePalette {
    return this.defaultConfig.skipButtonColor;
  }
  protected get skipButtonDirectiveClass() : string | undefined {
    return this.getMaterialButtonClasses(this.defaultConfig.skipButtonMaterialDirective);
  }

  protected get loadingCaption() : string | undefined {
    return this.defaultConfig.loadingCaption;
  }

  protected get stepperPosition() : "top"|"side" {
    return this.config.stepperPosition || this.defaultConfig.stepperPosition;
  }

  protected get stepperOrientation() : StepperOrientation {
    return this.stepperPosition == "top" ? "horizontal" : "vertical";
  }
  //#endregion

  private getMaterialButtonClasses(directive:TotsFormButtonMatDirective|undefined) {
    switch (directive) {
      case "mat-button" : return "mat-mdc-button";
      case "mat-flat-button" : return "mat-mdc-unelevated-button mdc-button--unelevated";
      case "mat-raised-button" : return "mat-mdc-raised-button mdc-button--raised";
      case "mat-stroked-button" : return "mat-mdc-outlined-button mdc-button--outlined";
      default : return undefined;
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

    // Load Forms
    this.selectedIndex = this.config.steps.indexOf(step);
    this.changeDetector.detectChanges();

    // Emit Action
    this.onAction.emit({ key: 'load-item', item: step });
  }

  protected isNextSubmitDisabled(): boolean {
    return this.forms?.toArray()[this.selectedIndex].group.invalid || !!this.currentStep.isLoading;
  }

  protected onActionForm(action: TotsActionForm) {
    let newAction = new TotsActionForm();
    newAction.key = action.key;
    newAction.item = action.item;
    this.onAction.emit(newAction);
  }


  //#region Public
  getActiveGroup(): FormGroup | undefined {
    if (this.forms == undefined){
      return undefined;
    }

    let fg = new FormGroup({});
    this.forms.toArray().map(f=> f.group).forEach((g:FormGroup)=> {
      for (const controlName in g.controls) {
        fg.addControl(controlName, g.controls[controlName]);
      }
    });
    
    return fg;
  }
  nextStep() {
    this.onClickItem(this.config.steps[this.selectedIndex+1]);
  }
  //#endregion
}
