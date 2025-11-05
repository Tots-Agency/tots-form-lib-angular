import { Component, EventEmitter, Input, OnInit, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { TotsActionForm } from '../../entities/tots-action-form';
import { TotsFieldForm } from '../../entities/tots-field-form';

@Component({
  selector: 'tots-base-print-field',
  templateUrl: './base-print-field.component.html',
  styleUrls: ['./base-print-field.component.scss'],
  standalone: false
})
export class BasePrintFieldComponent implements OnInit {

  @Input() field!: TotsFieldForm;
  @Input() group!: UntypedFormGroup;
  @Input() onAction!: Subject<TotsActionForm>;

  constructor(
    protected viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const view = this.viewContainerRef.createComponent(this.field.component);
    (<any>view.instance).group = this.group;
    (<any>view.instance).field = this.field;
    (<any>view.instance).onAction = this.onAction;
  }

}
