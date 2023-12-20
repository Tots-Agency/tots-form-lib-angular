import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Angular Material */
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** Tots Libraries */
import { TotsFormModule } from '@tots/form';

/** Fields */
import { DatepickerFieldComponent } from './fields/datepicker-field/datepicker-field.component';
import { DatepickerAndTimeEndFieldComponent } from './fields/datepicker-and-time-end-field/datepicker-and-time-end-field.component';
import { RangeDatepickerFieldComponent } from './fields/range-datepicker-field/range-datepicker-field.component';




@NgModule({
  declarations: [
    /** Fields */
    DatepickerFieldComponent,
    DatepickerAndTimeEndFieldComponent,
    RangeDatepickerFieldComponent
  ],
  imports: [
    /** Angular */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    /** Angular Material */
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,

    /** Tots Libraries */
    TotsFormModule
  ],
  exports: [
    /** Fields */
    DatepickerFieldComponent,
    DatepickerAndTimeEndFieldComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_LOCALE, useValue: 'en-Us' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } },
  ]
})
export class TotsDateFieldFormModule { }
