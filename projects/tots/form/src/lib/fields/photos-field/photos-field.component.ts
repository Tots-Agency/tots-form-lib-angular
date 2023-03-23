import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-photos-field',
  templateUrl: './photos-field.component.html',
  styleUrls: ['./photos-field.component.css']
})
export class PhotosFieldComponent extends TotsBaseFieldComponent {

  uploadingCount = 0;

  onChange(target: any) {
    // Verify if selected one file
    if(target.files.length == 0){
      return;
    }
    // For each all files selected
    for (let i = 0; i < target.files.length; i++) {
      this.uploadFile(target.files[i]);
    }
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

  displayUrl(item: any): string {
    if(item == undefined){
      return '';
    }
    return item[this.field.extra.display_key];
  }
}
