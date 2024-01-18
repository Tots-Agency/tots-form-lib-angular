import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TotsActionModalForm, TotsFormModalComponent } from '../../public-api';
import { TotsModalConfig } from '../entities/tots-modal-config';

@Injectable({
  providedIn: 'root'
})
export class TotsFormModalService {

  constructor(
    protected dialog: MatDialog
  ) { }

  open(config: TotsModalConfig): Observable<TotsActionModalForm> {
    let dialogRef = this.dialog.open(TotsFormModalComponent, {
      width: '700px',
      panelClass: 'tots-form-modal-overlay-pane',
      backdropClass: "tots-modal-backdrop",
      data: config
    });
    return dialogRef.componentInstance.actions;
  }
}
