import { Component, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  standalone: false
})
export class CheckboxFieldComponent extends TotsBaseFieldComponent implements OnInit {

}
