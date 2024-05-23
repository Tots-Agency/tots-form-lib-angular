import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { TotsActionForm } from '../../entities/tots-action-form';
import { TotsFieldForm } from '../../entities/tots-field-form';

@Component({
  selector: 'tots-form',
  templateUrl: './tots-form.component.html',
  styleUrls: ['./tots-form.component.scss']
})
export class TotsFormComponent implements OnInit, AfterViewInit {

  @Input() fields: Array<TotsFieldForm> = new Array<TotsFieldForm>();
  @Input() item: any;
  @Input() autoSave: boolean = false;
  @Input() set loading(value:boolean) {
    if (value) {
      this.group.disable();
    } else {
      this.group.enable();
    }
  }

  @Output() onAction = new EventEmitter<TotsActionForm>();
  privateActions = new Subject<TotsActionForm>();

  group: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    protected changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngAfterViewInit(): void {
    this.updateFormByItem();
    this.activateAutoSave();
    this.emitInit();
  }

  updateFormByItem() {
    if(this.item == undefined){
      return;
    }
    // Each all fields
    for (const field of this.fields) {
      field.component.updateFormByItem(this.group, this.item, field);
    }
    // Refresh view
    this.changeDetector.detectChanges();
  }

  updateItemByForm() {
    if(this.item == undefined){
      return;
    }
    for (const field of this.fields) {
      field.component.updateItemByForm(this.group, this.item, field);
    }
    return this.item;
  }

  getItemByForm() {
    let newItem = Object.assign({}, this.item);;
    for (const field of this.fields) {
      field.component.updateItemByForm(this.group, newItem, field);
    }
    return newItem;
  }

  loadConfig() {
    this.privateActions.subscribe(action => {
      action.item = this.getItemByForm();
      this.onAction.emit(action);
    });
  }

  activateAutoSave() {
    if(!this.autoSave){
      return
    }
    this.group.valueChanges.subscribe(values => {
      this.updateItemByForm();
    });
  }

  emitInit() {
    this.onAction.emit({ key: 'tots-form-init', item: undefined });
  }

  isHasIcon(field: TotsFieldForm) {
    if(field.extra && field.extra.icon){ return true; }
    return false;
  }

  getIconField(field: TotsFieldForm) {
    if(field.extra && field.extra.icon){ return field.extra.icon; }
    return '';
  }

  hasError(field: TotsFieldForm): boolean {
    let control = this.group.get(field.key);
    if(control == undefined){
      return false;
    }
    return !control.valid;
  }

  getErrors(field: TotsFieldForm):Array<string> {
    let control = this.group.get(field.key);
    if(control == undefined){
      return [];
    }
    return control.errors ? Object.keys(control.errors) : [];
  }

  public getFormGroup(): UntypedFormGroup {
    return this.group;
  }

  setItem(item: any) {
    this.item = item;
    this.updateFormByItem();
  }
}
