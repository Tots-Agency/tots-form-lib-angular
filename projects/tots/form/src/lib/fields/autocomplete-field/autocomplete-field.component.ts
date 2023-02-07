import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TotsFieldForm } from '@tots/form';
import { map, Observable, of, startWith } from 'rxjs';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss']
})
export class AutocompleteFieldComponent extends TotsBaseFieldComponent implements OnInit {

  override ngOnInit(): void {
    this.loadConfigField();
  }

  loadConfigField() {
    this.field.extra.obs = this.obsProcessed.bind(this);
  }

  obsProcessed(query?: string): Observable<Array<any>> {
    return of(this.filterProcessed(query));
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
    
    let options: Array<any> = this.field.extra.options;
    return options.filter(option => option[this.field.extra.filter_key].toLowerCase().indexOf(filterValue) >= 0);
  }

}
