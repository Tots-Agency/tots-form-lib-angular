import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { TotsActionForm, TotsFormComponent } from '@tots/form';
import { TotsFormSidebarItem, TotsFormSidebarPageConfig } from '../../entities/tots-form-sidebar-page-config';

@Component({
  selector: 'tots-form-sidebar-page',
  templateUrl: './form-sidebar-page.component.html',
  styleUrls: ['./form-sidebar-page.component.scss']
})
export class TotsFormSidebarPageComponent implements OnInit {

  @ViewChild('form') form!: TotsFormComponent;

  @Input() config!: TotsFormSidebarPageConfig;

  selectedItem?: TotsFormSidebarItem;

  constructor(
    protected changeDetector: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.selectedItem = this.config.items[0];
  }

  onClickItem(item: TotsFormSidebarItem) {
    // Reset all items
    this.config.items.forEach(i => i.isSelected = false);
    // Active item
    item.isSelected = true;
    // Reset form
    this.selectedItem = undefined;
    this.changeDetector.detectChanges();
    // Load Forms
    this.selectedItem = item;
    this.changeDetector.detectChanges();
  }

  onActionForm(action: TotsActionForm) {
    console.log(action);
  }
}
