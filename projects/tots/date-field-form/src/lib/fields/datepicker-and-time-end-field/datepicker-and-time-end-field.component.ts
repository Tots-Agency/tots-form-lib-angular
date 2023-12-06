import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TotsBaseFieldComponent, TotsFieldForm, TotsFormHelper } from '@tots/form';
import moment from 'moment';

@Component({
  selector: 'tots-datepicker-and-time-end-field',
  templateUrl: './datepicker-and-time-end-field.component.html',
  styleUrls: ['./datepicker-and-time-end-field.component.css']
})
export class DatepickerAndTimeEndFieldComponent extends TotsBaseFieldComponent implements OnInit {

  hours = new Array<any>();

  inputStartTime!: UntypedFormControl;
  inputEndTime!: UntypedFormControl;

  override ngOnInit(): void {
    this.loadHours();
    super.ngOnInit();
    this.initInputEnd();
  }

  initInputEnd() {
    this.inputStartTime = new UntypedFormControl();
    this.group.addControl(this.field.extra.field_key_start, this.inputStartTime);

    this.inputEndTime = new UntypedFormControl();
    this.group.addControl(this.field.extra.field_key_end, this.inputEndTime);
  }

  loadHours() {
    let item = moment('00:00', 'hh:mm');
    for (let i = 0; i < 96; i++) {
      this.hours.push({ value: item.format('HH:mm:ss'), title: item.format('hh:mm a') });
      item.add(15, 'minutes');
    }
  }

  getCaption() {
    if(this.field.extra && this.field.extra.caption){ return this.field.extra.caption; }
    return '';
  }

  getMinDate() {
    if(this.field.extra && this.field.extra.minDate){ return this.field.extra.minDate; }
    return null;
  }

  static getFormatOutput(field: TotsFieldForm) {
    if(field.extra.format_output != undefined){
      return field.extra.format_output;
    }

    return 'YYYY-MM-DD HH:mm:ss';
  }

  static override updateFormByItem(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
    if(Array.isArray(field.key)){
    } else {
      if(item[field.key] != undefined){
        group.get(field.key)?.setValue(moment(item[field.key], 'YYYY-MM-DD HH:mm:ss'));
        group.get(field.extra.field_key_start)?.setValue(moment(item[field.key], 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss'));
        group.get(field.extra.field_key_end)?.setValue(moment(item[field.extra.field_key_end], 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss'));
      }
    }
  }

  static override updateItemByForm(group: UntypedFormGroup, item: any, field: TotsFieldForm) {
    if(Array.isArray(field.key)){
    } else {
      if(group.get(field.key)?.value != undefined){
        let newMomentVar = moment(group.get(field.key)?.value.format('YYYY-MM-DD') + ' ' + group.get(field.extra.field_key_start)?.value, 'YYYY-MM-DD HH:mm:ss');
        let newEndMomentVar = moment(group.get(field.key)?.value.format('YYYY-MM-DD') + ' ' + group.get(field.extra.field_key_end)?.value, 'YYYY-MM-DD HH:mm:ss');

        item[field.key] = newMomentVar.format(DatepickerAndTimeEndFieldComponent.getFormatOutput(field));
        item[field.extra.field_key_end] = newEndMomentVar.format(DatepickerAndTimeEndFieldComponent.getFormatOutput(field));
      }
    }
  }
}
