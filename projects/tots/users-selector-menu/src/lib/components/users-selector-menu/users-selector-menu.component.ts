import { Component, Input, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { TotsUsersSelectorMenuConfig } from '../../entities/tots-users-selector-menu-config';

@Component({
  selector: 'tots-users-selector-menu',
  templateUrl: './users-selector-menu.component.html',
  styleUrls: ['./users-selector-menu.component.scss']
})
export class TotsUsersSelectorMenuComponent {

  @ViewChild('selectorButton') selectorButton!: MatMenuTrigger;

  @Input() config!: TotsUsersSelectorMenuConfig;

  inputQuery = new UntypedFormControl('');

  onClosed() {
    // TODO: Informar que se cerro el menu de usuarios
  }
}
