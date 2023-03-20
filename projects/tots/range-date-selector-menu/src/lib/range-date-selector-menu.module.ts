/** Angular */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDividerModule } from '@angular/material/divider';

/** Components */
import { RangeDateSelectorMenuComponent } from './components/range-date-selector-menu/range-date-selector-menu.component';



@NgModule({
  declarations: [
    /** Components */
    RangeDateSelectorMenuComponent
  ],
  imports: [
    /** Angular */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /** Angular Material */
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  exports: [
    /** Components */
    RangeDateSelectorMenuComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_LOCALE, useValue: 'en-Us' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } },
  ]
})
export class TotsRangeDateSelectorMenuModule { }
