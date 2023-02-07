import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss']
})
export class AutocompleteFieldComponent extends TotsBaseFieldComponent implements OnInit {

  filteredOptions!: Observable<string[]>;
  inputQuery = new FormControl<string>('');

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadConfig();
  }

  loadConfig() {
    this.filteredOptions = this.inputQuery.valueChanges.pipe(
      startWith(''),
      map(value => this.filterProcessed(value))
    );
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    this.input.setValue(event.option.value[this.field.extra.selected_key]);
  }

  filterProcessed(query?: any): Array<any> {
    if(query == undefined||query == null){
      return [];
    }
    
    let filterValue: string;
    if(typeof query === "string"){
      filterValue = query.toLowerCase();
    } else {
      filterValue = query[this.field.extra.display_key];
    }
    
    let options: Array<string> = this.field.extra.options;
    return options.filter(option => option[this.field.extra.filter_key].toLowerCase().indexOf(filterValue) >= 0);
  }

  displayOption(item: any): string {
    if(item == undefined){
      return '';
    }
    return item[this.field.extra.display_key];
  }

  getCaption() {
    if(this.field.extra && this.field.extra.caption){ return this.field.extra.caption; }
    return '';
  }
}
