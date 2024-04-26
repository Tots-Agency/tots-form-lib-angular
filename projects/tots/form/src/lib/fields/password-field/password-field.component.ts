import { Component, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
	selector: 'tots-password-field',
	templateUrl: './password-field.component.html',
	styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent extends TotsBaseFieldComponent implements OnInit {

	protected showPassword = false;

	protected getCaption() : string|undefined {
		return this.field.extra?.caption;
	}

	protected togglePassword(event:MouseEvent) {
		event.stopPropagation();
		this.showPassword = !this.showPassword;
	}
}
