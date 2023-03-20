import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'tots-range-date-selector-menu',
  templateUrl: './range-date-selector-menu.component.html',
  styleUrls: ['./range-date-selector-menu.component.scss']
})
export class RangeDateSelectorMenuComponent {

  @Output() changeRange = new EventEmitter<{ start: string, end: string }>();

  filterType = 1;

  rangeString = '';
  range = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl()
  });

  constructor() { }

  ngOnInit(): void {
    this.loadConfig();
  }

  filterByDay() {
    this.filterType = 1;
    this.onFilterRange(moment(), moment());
    this.range.get('start')?.setValue(undefined);
    this.range.get('end')?.setValue(undefined);
  }

  filterByWeek() {
    this.filterType = 2;
    this.onFilterRange(moment().startOf('week'), moment().endOf('week'));
    this.range.get('start')?.setValue(undefined);
    this.range.get('end')?.setValue(undefined);
  }

  filterByMonth() {
    this.filterType = 3;
    this.onFilterRange(moment().startOf('month'), moment().endOf('month'));
    this.range.get('start')?.setValue(undefined);
    this.range.get('end')?.setValue(undefined);
  }

  filterByYear() {
    this.filterType = 4;
    this.onFilterRange(moment().startOf('year'), moment().endOf('year'));
    this.range.get('start')?.setValue(undefined);
    this.range.get('end')?.setValue(undefined);
  }

  onFilterRange(start: any, end: any) {
    this.rangeString = start.format('DD MMM, YYYY') + ' - ' + end.format('DD MMM, YYYY');
    this.changeRange.emit({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD')});
  }

  loadConfig() {
    this.range.valueChanges.subscribe(result => {
      if(result.start != null && result.end != null){
        this.filterType = 5;
        this.onFilterRange(result.start, result.end);
      }
    });
  }
}
