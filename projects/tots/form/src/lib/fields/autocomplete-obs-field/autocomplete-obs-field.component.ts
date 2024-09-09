import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-autocomplete-obs-field',
  templateUrl: './autocomplete-obs-field.component.html',
  styleUrls: ['./autocomplete-obs-field.component.css'],
})
export class AutocompleteObsFieldComponent
  extends TotsBaseFieldComponent
  implements OnInit, OnDestroy
{
  filteredOptions!: any[];
  inputQuery = new FormControl<string>('');
  isLoading: boolean = false;
  isFirstLoad = true;
  notFoundMessage = 'No results found';

  // Create a Subject to manage the subscription lifecycle
  private destroy$ = new Subject<void>();

  override ngOnInit(): void {
    super.ngOnInit();
    this.setupAutocomplete();
    this.loadInputConfig();
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
  }

  private setupAutocomplete() {

    if(this.field.extra?.not_found_message){
      this.notFoundMessage = this.field.extra?.not_found_message;
    }

    let obs: (query?: string) => Observable<any[]> = this.field.extra?.obs;
    this.inputQuery.valueChanges
      .pipe(
        tap((value) => {
          this.hideLoader();
          this.clearFilteredOptions();
          if (value === '') {
            this.input.setValue(null);
          }
        }),
        debounceTime(300),
        distinctUntilChanged(), // Only proceed if the current value is different from the last
        takeUntil(this.destroy$),
        switchMap((value) => {
          if (typeof value === 'string' && value.trim() !== '') {
            // Check if value is a non-empty string
            this.showLoader();
            this.handleInputStart(value); // Perform any additional logic when input starts

            // Call the data service with the query and handle results
            return obs(value).pipe(
              catchError((error) => {
                console.error('Search error:', error); // Log the error for debugging
                return of([]); // Return an empty array on error
              }),
              finalize(() => {
                this.hideLoader(); // Hide loader when the search completes
              })
            );
          } else {
            // If input is not a string or is empty, return an empty observable
            this.hideLoader(); // Ensure loader is hidden if no search is initiated
            return of([]); // Return an empty array if input is empty
          }
        })
      )
      .subscribe((result) => {
        const queryValue = this.inputQuery.value;

        if (typeof queryValue === 'string' && queryValue.trim()) {
            // Update the filtered options based on the result
            this.filteredOptions = this.field.extra?.show_not_found_message === true && result.length === 0
                ? [this.notFoundMessage]
                : result;
            return;
        }

        // Clear filtered options if the input is empty
        this.filteredOptions = [];
      });
  }

  // Helper methods to manage loader visibility
  private showLoader() {
    this.isLoading = true;
  }

  private hideLoader() {
    this.isLoading = false;
  }

  private handleInputStart(value: string) {
    if (value === '') {
      this.resetInputIfEmpty(value);
    }
    this.isLoading = true; // Show loading indicator
  }

  private resetInputIfEmpty(value: string) {
    if (value === '') {
      this.inputQuery.setValue(null);
    }
  }

  private clearFilteredOptions() {
    this.filteredOptions = [];
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if (this.field.extra.need_full_object === true) {
      this.input.setValue(event.option.value);
      return;
    }

    this.input.setValue(event.option.value[this.field.extra?.selected_key]);
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
    if (item === this.notFoundMessage) {
      return item;
    }
    if (item == undefined) {
      return '';
    }
    return item[this.field.extra.display_key];
  }

  getCaption() {
    if (this.field.extra && this.field.extra.caption) {
      return this.field.extra.caption;
    }
    return '';
  }

  cleanInputQuery() {
    this.inputQuery.setValue('');
  }

  ngOnDestroy(): void {
    // Emit a value to indicate the component is being destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }
}
