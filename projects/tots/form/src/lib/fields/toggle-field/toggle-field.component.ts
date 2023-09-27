import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-toggle-field',
  templateUrl: './toggle-field.component.html',
  styleUrls: ['./toggle-field.component.scss']
})
export class ToggleFieldComponent extends TotsBaseFieldComponent implements OnInit {

  matColor : ThemePalette

  override ngOnInit(): void {
    super.ngOnInit();
    this.matColor = this.field.extra?.matColor || "primary";
  }
}
