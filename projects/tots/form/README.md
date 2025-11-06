<div align="center">
  <img src="https://avatars.githubusercontent.com/u/117909365" alt="Tots Logo" width="150">
  
  <h1>
    @tots/form
  </h1>

</div>

<br><br>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

`@tots/form` is a library for creating forms through field definitions with a predefined logic and look. It includes

- A main form component
- A set of interchangeable field from basic to moderate complexity
- Configuration through dependency injection
- The posibility of creating custom fields
- A validation system

<br>
<hr>
<br>

## Installation

```bash
npm install @tots/form
```

Ensure your project uses Angular 20+ and compatible versions of TypeScript, zone.js, and rxjs.

<br>
<hr>
<br>

## Importing the module

```typescript
import { NgModule } from '@angular/core';
import { TotsFormModule } from 'projects/tots/form/src/public-api';

@NgModule({
	imports: [TotsFormModule]
})
export class AppModule { }
```

<br>

## Configuration through providers

```typescript
import { NgModule } from '@angular/core';
import { TotsFormModule, TOTS_FORM_DEFAULT_CONFIG, TotsFormDefaultConfig } from '@tots/form';

const formDefaultConfig : TotsFormDefaultConfig = {
	labelPosition: eTotsFormLabelPosition.INSIDE
}

@NgModule({
	imports: [TotsFormModule],
	providers: [
		{
			provide: TOTS_FORM_DEFAULT_CONFIG,
			useValue: formDefaultConfig
		}
	]
})
```

Other providers tokens:

- TOTS_STRING_ARRAY_CONFIG
- TOTS_FORM_BUTTONS_CONFIG

<br>

## Usage of Tots Form

```html
<tots-form
	[fields]="fields"
	[item]="item"
	(onAction)="onActionForm($event)"
	[loading]="loading"
></tots-form>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { TotsValidator, TotsFieldForm } from '@tots/form';

@Component({
	//...
})
export class AppComponent implements OnInit {
	
	protected fields! : TotsFieldForm[];
	private validatorRequired = new TotsValidator(Validators.required, "required", "This field is required");
	// Can contain data for starting values or be empty
	protected item = {
		name: "Name",
    		type: 2
	};

	ngOnInit() {
		this.fields = [
			new TotsStringField("name", "Name", [ValidatorRequired]),
			new TotsSelectField("type", [
				{ id: 1, type_name: 'Type 1'},
				{ id: 2, type_name: 'Type 2'},
				{ id: 3, type_name: 'Type 3'},
			], "id", "name", "Tipo"),
			new TotsSubmitButton("submit", "Enviar")
		];
	}

	onActionForm(action:TotsActionForm) {
		switch (action.key) {
			case "submit" : {
				// do something
			}
		}
	}
}
```