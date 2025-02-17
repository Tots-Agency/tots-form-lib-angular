import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-files-list-field',
  templateUrl: './files-list-field.component.html',
  styleUrls: ['./files-list-field.component.css']
})
export class FilesListFieldComponent extends TotsBaseFieldComponent {

  uploadingCount = 0;

  onChange(target: any) {
    // Verify if selected one file
    if(target.files.length == 0){
      return;
    }

    // For each all files selected
    const files = Array.from(target.files);
    files.forEach((file: any) => this.uploadFile(file));

    target.value = '';
  }

  onClickRemove(item: any) {
    // Get current value
    let currentValue: Array<any> = this.input.value;
    // Remove item from current value
    currentValue = currentValue.filter(i => i != item);
    // Set new value
    this.input.setValue(currentValue);
  }

  uploadFile(file: File) {
    // Sum one to uploading count
    this.uploadingCount++;

    this.field.extra.service.upload(file).subscribe((result: any) => {
      // Get current value
      let currentValue: Array<any> = this.input.value;
      if(currentValue == undefined||currentValue == null){
        currentValue = new Array<any>();
      }
      // Add new file to current value
      currentValue.push(result);
      // Set new value
      this.input.setValue(currentValue);
      // Sub one to uploading count
      this.uploadingCount--;
    });
  }

  displayName(item: any): string {
    if(item == undefined){
      return '';
    }
    return item[this.field.extra.display_key];
  }

  isExtraText(): boolean {
    return this.field.extra.text_extra_when_empty != undefined;
  }
}
