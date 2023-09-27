import { Component, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'tots-toggle-field',
  templateUrl: './toggle-field.component.html',
  styleUrls: ['./toggle-field.component.scss']
})
export class ToggleFieldComponent extends TotsBaseFieldComponent implements OnInit {

  matColor : ThemePalette

  override ngOnInit(): void {
    this.matColor = this.field.extra?.matColor || "primary";
  }
}
