import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/** Angular Material */
import { MatIconModule } from '@angular/material/icon';

/** Tots Libraries */
import { TotsFormModule } from '@tots/form';

/** Pages */
import { TotsFormSidebarPageComponent } from './pages/form-sidebar-page/form-sidebar-page.component';



@NgModule({
  declarations: [
    TotsFormSidebarPageComponent
  ],
  imports: [
    CommonModule,

    TotsFormModule,
    
    MatIconModule
  ],
  exports: [
    TotsFormSidebarPageComponent
  ]
})
export class TotsFormSidebarPageModule { }
