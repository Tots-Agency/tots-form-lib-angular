import { Component, Input } from "@angular/core";

@Component({
  selector: 'tots-outer-label',
  templateUrl: './outer-label.component.html',
  styleUrls: ['./outer-label.component.scss']
})
export class TotsOuterLabelComponent {

  @Input() isRequired? : boolean;
  @Input() label? : string;
}
