import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponentComponent } from './pages/form-component/form-component.component';
import { FormSidebarComponent } from './pages/form-sidebar/form-sidebar.component';
import { FormWizardComponent } from './pages/form-wizard/form-wizard.component';

const routes: Routes = [
  { path: '', component: FormComponentComponent },
  { path: 'sidebar', component: FormSidebarComponent },
  { path: 'wizard', component: FormWizardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
