import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { TotsActionForm } from '../../entities/tots-action-form';
import { TotsFieldForm } from '../../entities/tots-field-form';

@Component({
  selector: 'tots-form',
  templateUrl: './tots-form.component.html',
  styleUrls: ['./tots-form.component.scss']
})
export class TotsFormComponent implements OnInit {

  @Input() fields: Array<TotsFieldForm> = new Array<TotsFieldForm>();
  @Input() item: any;
  @Input() autoSave: boolean = false;

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

  loadConfig() {
    this.privateActions.subscribe(action => {
      action.item = this.updateItemByForm();
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

  isHasIcon(field: TotsFieldForm) {
    if(field.extra && field.extra.icon){ return true; }
    return false;
  }

  getIconField(field: TotsFieldForm) {
    if(field.extra && field.extra.icon){ return field.extra.icon; }
    return '';
  }
}
