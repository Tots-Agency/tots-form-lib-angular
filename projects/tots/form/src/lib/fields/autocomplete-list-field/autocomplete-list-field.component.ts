import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  filter,
  map,
  merge,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'lib-autocomplete-list-field',
  templateUrl: './autocomplete-list-field.component.html',
  styleUrls: ['./autocomplete-list-field.component.css'],
})
export class AutocompleteListFieldComponent
  extends TotsBaseFieldComponent
  implements OnInit, OnDestroy
{
  filteredOptions!: any[];
  inputQuery = new FormControl<string>('');
  isLoading: boolean = false;
  isFirstLoad = true;

  // Create a Subject to manage the subscription lifecycle
  private destroy$ = new Subject<void>();
  // Subject to cancel previous searches
  private searchSubject$ = new Subject<string>();
  // Counter to track active searches
  private activeSearchCount = 0;

  override ngOnInit(): void {
    super.ngOnInit();
    this.setupAutocomplete();
    this.loadInputConfig();
    // Default array value
    this.input.setValue([]);
  }

  loadInputConfig() {
    if (this.field.validators?.includes(Validators.required)) {
      this.inputQuery.addValidators(Validators.required);
    }

    this.input.valueChanges.subscribe((value: any) => {
      if (this.inputQuery.value != '' && this.inputQuery.value != undefined) {
        return;
      }
      if (this.isFirstLoad == false) {
        return;
      }

      this.inputQuery.setValue(this.getItem(value));

      this.isFirstLoad = false;
    });

    // Update inputQuery validation when selected items change
    this.input.valueChanges.subscribe((value: any) => {
      if (this.field.validators?.includes(Validators.required)) {
        if (value && Array.isArray(value) && value.length > 0) {
          // Clear required validation when items are selected
          this.inputQuery.setValidators([]);
        } else {
          // Restore required validation when no items are selected
          this.inputQuery.setValidators([Validators.required]);
        }
        this.inputQuery.updateValueAndValidity();
      }
    });
  }

  private setupAutocomplete() {
    let obs: (query?: string) => Observable<any[]> = this.field.extra?.obs;

    // Setup search subject to handle search requests with cancellation
    this.searchSubject$
      .pipe(
        tap(() => {
          this.activeSearchCount++;
          this.isLoading = true;
          this.filteredOptions = [];
        }),
        switchMap((query) => {
          return obs(query).pipe(
            map((value) => {
              if (
                this.checkType(this.input.value) == 'array' &&
                this.input.value.length
              ) {
                return this.removeSelectedOptionInOptions(value);
              } else if (this.checkType(this.input.value) == 'object') {
                value = this.filterByValue(value, this.inputQuery.value);
              }
              return value;
            }),
            catchError(() => {
              return of([]);
            }),
            finalize(() => {
              this.activeSearchCount--;
              // Only hide loading if no active searches
              if (this.activeSearchCount === 0) {
                this.isLoading = false;
              }
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.filteredOptions = result;
      });

    // Setup input value changes to trigger searches
    this.inputQuery.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        if (typeof value === 'string' || !value) {
          this.searchSubject$.next(value || '');
        }
      });
  }

  checkType(item: any) {
    if (item instanceof Array) return 'array';
    else {
      if (item instanceof Object) return 'object';
      else return null; // Not Array nor Object
    }
  }

  removeSelectedOptionInOptions(items: any[]): any[] {
    this.input.value.forEach((selectedItem: any) => {
      items = this.filterByValue(items, selectedItem);
    });
    return items;
  }

  filterByValue(items: any[], selectedItem: any) {
    return items.filter((x: any) => {
      if (
        selectedItem != undefined &&
        selectedItem[this.field.extra.selected_key] != undefined
      )
        return (
          x[this.field.extra.selected_key] !=
          selectedItem[this.field.extra.selected_key]
        );
      return false;
    });
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    let data: Array<any> = this.input.value;
    if (this.input.value == undefined) {
      data = [];
    }

    // Verify if has exist in array
    if (
      data.find(
        (i) =>
          i[this.field.extra.selected_key] ==
          event.option.value[this.field.extra.selected_key]
      ) == undefined
    ) {
      data.push(event.option.value);
      this.input.setValue(data);
    }

    this.inputQuery.setValue('');
  }

  getItem(itemIdentifier: any): any {
    if (this.field.extra.first_query != undefined) {
      return this.field.extra.first_query;
    }

    if (this.field.extra.options == undefined) {
      return;
    }

    let options: Array<any> = this.field.extra.options;
    return options.find(
      (i) => i[this.field.extra.selected_key] == itemIdentifier
    );
  }

  get isWithLoader(): boolean {
    if (
      !this.field.extra ||
      this.field.extra.show_loader === undefined ||
      this.field.extra.show_loader === null
    ) {
      return true;
    }

    return this.field.extra.show_loader;
  }

  displayOption(item: any): string {
    if (item == undefined) {
      return '';
    }
    return item[this.field.extra.display_key];
  }

  displayPhoto(item: any): string {
    if (item == undefined) {
      return '';
    }
    return item[this.field.extra.display_photo];
  }

  getCaption() {
    if (this.field.extra && this.field.extra.caption) {
      return this.field.extra.caption;
    }
    return '';
  }

  getPlaceholderPhoto() {
    if (this.field.extra && this.field.extra.placeholder_photo) {
      return this.field.extra.placeholder_photo;
    }
    return '';
  }

  isShowPhoto(): boolean {
    if (this.field.extra && this.field.extra.is_show_photo != undefined) {
      return this.field.extra.is_show_photo;
    }
    return true;
  }

  onClickRemove(item: any) {
    let data: Array<any> = this.input.value;
    let index = data.findIndex(
      (i) =>
        i[this.field.extra.selected_key] == item[this.field.extra.selected_key]
    );
    if (index != -1) {
      data.splice(index, 1);
      this.input.setValue(data);
    }
  }

  onImgError(event: any) {
    let placeholderPhoto = this.getPlaceholderPhoto();
    if (placeholderPhoto == '') {
      return;
    }

    event.target.src = placeholderPhoto;
  }

  customHasError(): boolean {
    // Don't show errors if there are selected items
    if (this.input.value && Array.isArray(this.input.value) && this.input.value.length > 0) {
      return false;
    }
    
    return (
      this.input.invalid && (this.inputQuery.dirty || this.inputQuery.touched)
    );
  }

  cleanInputQuery() {
    this.inputQuery.setValue('');
  }

  onInputFocus() {
    // If the input is empty, execute the initial search
    if (!this.inputQuery.value || this.inputQuery.value === '') {
      this.searchSubject$.next('');
    }
  }

  ngOnDestroy(): void {
    // Emit a value to indicate the component is being destroyed
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject$.complete();
    // Reset search count
    this.activeSearchCount = 0;
    this.isLoading = false;
  }
}
