import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, switchMap, takeWhile } from 'rxjs';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'lib-autocomplete-list-field',
  templateUrl: './autocomplete-list-field.component.html',
  styleUrls: ['./autocomplete-list-field.component.css']
})
export class AutocompleteListFieldComponent extends TotsBaseFieldComponent implements OnInit {

  filteredOptions!: Observable<string[]>;
  inputQuery = new FormControl<string>('');

  isFirstLoad = true;

  override ngOnInit(): void {
    super.ngOnInit();
    // Default array value
    this.input.setValue([]);
    this.loadQueryConfig();
  }

  loadQueryConfig() {
    let obs: (query?: string) => Observable<Array<any>> = this.field.extra.obs;
    this.filteredOptions = this.inputQuery.valueChanges.pipe(
      map(value => {
        if(typeof value === "object"){
          return this.displayOption(value);
        }
        return value;
      }),
      switchMap(
        value => obs(value!).pipe(
          map(value => {
            if (this.input.value.length)
              return this.removeSelectedOptionInOptions(value);
            return value;
          })
        ),
      ),
    );
  }

  removeSelectedOptionInOptions(items: any[]): any[] {
    this.input.value.forEach((selectedItem:any) => {
      items = items.filter((x: any) => {
        return x[this.field.extra.selected_key] != selectedItem[this.field.extra.selected_key]
      })
    });
    return items;
  }


  selectedOption(event: MatAutocompleteSelectedEvent) {
    let data: Array<any> = this.input.value;
    if(this.input.value == undefined){
      data = [];
    }

    // Verify if has exist in array
    if(data.find(i => i[this.field.extra.selected_key] == event.option.value[this.field.extra.selected_key]) == undefined){
      data.push(event.option.value);
      this.input.setValue(data);
    }
    
    this.inputQuery.setValue('');
  }

  displayOption(item: any): string {
    if(item == undefined){
      return '';
    }
    return item[this.field.extra.display_key];
  }

  displayPhoto(item: any): string {
    if(item == undefined){
      return '';
    }
    return item[this.field.extra.display_photo];
  }

  getCaption() {
    if(this.field.extra && this.field.extra.caption){ return this.field.extra.caption; }
    return '';
  }

  getPlaceholderPhoto() {
    if(this.field.extra && this.field.extra.placeholder_photo){ return this.field.extra.placeholder_photo; }
    return '';
  }

  isShowPhoto(): boolean {
    if(this.field.extra && this.field.extra.is_show_photo != undefined){ return this.field.extra.is_show_photo; }
    return true;
  }

  onClickRemove(item: any) {
    let data: Array<any> = this.input.value;
    let index = data.findIndex(i => i[this.field.extra.selected_key] == item[this.field.extra.selected_key]);
    if(index != -1){
      data.splice(index, 1);
      this.input.setValue(data);
    }
  }

  onImgError(event: any){
    let placeholderPhoto = this.getPlaceholderPhoto();
    if(placeholderPhoto == ''){
      return;
    }

    event.target.src = placeholderPhoto;
   }
}
