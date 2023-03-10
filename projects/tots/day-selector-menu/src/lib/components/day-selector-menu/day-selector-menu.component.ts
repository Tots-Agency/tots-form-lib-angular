import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'tots-day-selector-menu',
  templateUrl: './day-selector-menu.component.html',
  styleUrls: ['./day-selector-menu.component.css']
})
export class DaySelectorMenuComponent implements OnInit {

  @Input() initValue?: moment.Moment;
  @Output() changeDate = new EventEmitter<moment.Moment>();

  input = new UntypedFormControl();

  constructor() { }

  ngOnInit(): void {
    if(this.initValue){
      this.input.setValue(this.initValue);
    }
    this.loadConfig();
  }

  onClickLeft() {
    this.input.setValue((this.input.value ?? moment()).subtract(1, 'day'))
  }

  onClickRight() {
    this.input.setValue((this.input.value ?? moment()).add(1, 'day'))
  }

  loadConfig() {
    this.input.valueChanges.subscribe(value => {
      this.changeDate.emit(value);
    });
  }
}
