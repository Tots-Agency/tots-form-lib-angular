import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/** Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

/** Components */
import { TotsUsersSelectorMenuComponent } from './components/users-selector-menu/users-selector-menu.component';

@NgModule({
  declarations: [
    
    /** Components */
    TotsUsersSelectorMenuComponent
  ],
  imports: [
    /** Angular */
    CommonModule,
    ReactiveFormsModule,

    /** Angular Material */
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    /** Components */
    TotsUsersSelectorMenuComponent
  ]
})
export class TotsUsersSelectorMenuModule { }
