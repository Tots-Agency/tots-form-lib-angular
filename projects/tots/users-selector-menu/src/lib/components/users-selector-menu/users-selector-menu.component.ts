import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { TotsQuery } from '@tots/core';
import { takeWhile, tap } from 'rxjs';
import { TotsUsersSelectorMenuConfig } from '../../entities/tots-users-selector-menu-config';

@Component({
  selector: 'tots-users-selector-menu',
  templateUrl: './users-selector-menu.component.html',
  styleUrls: ['./users-selector-menu.component.scss']
})
export class TotsUsersSelectorMenuComponent implements OnInit {

  @ViewChild('selectorButton') selectorButton!: MatMenuTrigger;

  @Input() config!: TotsUsersSelectorMenuConfig;

  inputQuery = new UntypedFormControl('');

  isLoading = false;
  selecteds = new Array<any>();
  results = new Array<any>();

  ngOnInit(): void {
    this.loadInputSearch();
    this.loadItems('');
  }

  onClosed() {
    // TODO: Informar que se cerro el menu de usuarios
  }

  loadItems(text: string) {
    let query = new TotsQuery();

    if(text.length > 2){
      query.addWhereLikes(this.config.searchFields, text);
    }

    this.isLoading = true;
    this.config.service.list(query)
    .pipe(tap(res => this.results = res.data))
    .subscribe(res => this.isLoading = false);
  }
  
  loadInputSearch() {
    this.inputQuery.valueChanges
    .subscribe(val => this.loadItems(val));
  }

  getFirstname(item: any): string {
    return item[this.config.firstnameField];
  }

  getLastname(item: any): string {
    if(this.config.lastnameField === undefined){
      return '';
    }
    return item[this.config.lastnameField];
  }

  getPhoto(item: any): string|undefined {
    if(this.config.photoField === undefined){
      return;
    }
    return item[this.config.photoField];
  }

  getNoPhoto(item: any): string {
    let name = this.getFirstname(item).charAt(0);

    if(this.getLastname(item).length > 0){
      name += this.getLastname(item).charAt(0);
    }

    return name.toUpperCase();
  }
}
