import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith, switchMap, takeWhile } from 'rxjs';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-autocomplete-obs-field',
  templateUrl: './autocomplete-obs-field.component.html',
  styleUrls: ['./autocomplete-obs-field.component.css']
})
export class AutocompleteObsFieldComponent extends TotsBaseFieldComponent implements OnInit {

  filteredOptions!: Observable<string[]>;
  inputQuery = new FormControl<string>('');

  isFirstLoad = true;

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadQueryConfig();
    this.loadInputConfig();
  }

  loadInputConfig() {
    this.input.valueChanges.subscribe(value => {
      if(this.inputQuery.value != ''&&this.inputQuery.value != undefined){
        return;
      }
      if(this.isFirstLoad == false){
        return;
      }

      this.inputQuery.setValue(this.getItem(value));

      this.isFirstLoad = false;
    });
  }

  loadQueryConfig() {
    let obs: (query?: string) => Observable<Array<any>> = this.field.extra.obs;
    this.filteredOptions = this.inputQuery.valueChanges.pipe(
      startWith(''),
      takeWhile(value => typeof value === "string"),
      switchMap(value => obs(value!)),
    );
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    this.input.setValue(event.option.value[this.field.extra.selected_key]);
  }

  getItem(itemIdentifier: any): any {
    if(this.field.extra.options == undefined){
      return;
    }

    let options: Array<any> = this.field.extra.options;
    return options.find(i => i[this.field.extra.selected_key] == itemIdentifier);
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
