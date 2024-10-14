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
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { AutoCompleteErorrStateMatcher } from '../../helpers/autocomplete-error-state-matcher';

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

  // Create a Subject to manage the subscription lifecycle
  private destroy$ = new Subject<void>();

	protected autocompleteErrorStateMatcher! : AutoCompleteErorrStateMatcher;

  override ngOnInit(): void {
    super.ngOnInit();
    this.setupErrorStateMatcher();
    this.setupAutocomplete();
    this.loadInputConfig();
  }

  private setupErrorStateMatcher() {
    if (Array.isArray(this.field.key)) {
      this.autocompleteErrorStateMatcher = new AutoCompleteErorrStateMatcher(this.field.key.join('_'))
    } else {
      this.autocompleteErrorStateMatcher = new AutoCompleteErorrStateMatcher(this.field.key)
    }
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
    let obs: (query?: string) => Observable<any[]> = this.field.extra?.obs;
    this.inputQuery.valueChanges
      .pipe(
        startWith(''),
        tap((value) => {
          this.isLoading = false;
          this.filteredOptions = [];

          if (typeof value === "string") {
            this.input.reset();
          }
        }),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap((value) => {
          if (typeof value === 'string' || !value) {
            this.isLoading = true;

            return obs(value!).pipe(
              catchError(() => {
                return of([]);
              }),
              finalize(() => {
                this.isLoading = false;
              })
            );

          } else {
            return of([]);
          }
        })
      )
      .subscribe((result) => {
        this.filteredOptions = result;
      });
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
    if (!this.field.extra || this.field.extra.show_loader === undefined || this.field.extra.show_loader === null) {
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

  hasError_custom(): boolean {
    return this.input.invalid && (this.inputQuery.dirty || this.inputQuery.touched);
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
