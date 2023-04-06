import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TotsActionForm, TotsActionModalForm, TotsFormModalComponent, TotsFormModalService } from '@tots/form';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { TotsFormModalApiConfig } from '../entities/tots-form-modal-api-config';

@Injectable({
  providedIn: 'root'
})
export class TotsFormApiService {

  constructor(
    protected modalService: TotsFormModalService,
    protected dialog: MatDialog
  ) { }

  open(config: TotsFormModalApiConfig): Observable<any> {
    let dialogRef = this.dialog.open(TotsFormModalComponent, {
      width: '700px',
      data: config
    });
    return dialogRef.componentInstance.actions.
    pipe(switchMap(action => this.verifyActionIfSubmit(config, action)))
    .pipe(catchError((err, obs) => {
      return obs;
    }))
    .pipe(tap(item => (item !== false&&item !== undefined) ? dialogRef.close() : undefined));
  }

  verifyActionIfSubmit(config: TotsFormModalApiConfig, action: TotsActionModalForm): Observable<any> {
    if(action.key != 'submit'){
      return of(action);
    }
    // Show Loading
    action.modal?.componentInstance.showLoading();

    if(action.item && action.item.id && action.item.id > 0){
      return config.service!.update(action.item)
      .pipe(catchError((err, obs) => {
        // Hide Loading
        action.modal?.componentInstance.hideLoading();
        throw err;
      }));
    }

    return config.service!.create(action.item)
    .pipe(catchError((err, obs) => {
      // Hide Loading
      action.modal?.componentInstance.hideLoading();
      throw err;
    }));
  }
}
