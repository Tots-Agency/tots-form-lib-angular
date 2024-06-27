import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TotsActionModalForm, TotsFormModalComponent } from '../../public-api';
import { TotsModalConfig } from '../entities/tots-modal-config';

@Injectable({
  providedIn: 'root'
})
export class TotsFormModalService {

  private defaultPanelClass = 'tots-form-modal-overlay-pane';

  constructor(
    protected dialog: MatDialog
  ) { }

  open(config: TotsModalConfig): Observable<TotsActionModalForm> {
    let panelClass : string|string[];
    if (config.panelClass) {
      panelClass = Array.isArray(config.panelClass) ? 
        [this.defaultPanelClass, ...config.panelClass] :
        [this.defaultPanelClass, config.panelClass];
    } else {
      panelClass = this.defaultPanelClass;
    }

    let dialogRef = this.dialog.open(TotsFormModalComponent, {
      width: '700px',
      panelClass: panelClass,
      backdropClass: "tots-modal-backdrop",
      data: config
    });
    return dialogRef.componentInstance.actions;
  }
}
