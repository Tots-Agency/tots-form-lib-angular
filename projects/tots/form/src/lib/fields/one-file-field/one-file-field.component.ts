import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'tots-one-file-field',
  templateUrl: './one-file-field.component.html',
  styleUrls: ['./one-file-field.component.css']
})
export class OneFileFieldComponent extends TotsBaseFieldComponent {

  isUploading = false;

  onChange(target: any) {
    // Verify if selected one file
    if(target.files.length == 0){
      return;
    }
    // Upload file
    this.uploadFile(target.files[0]);
  }

  onClickRemove() {
    // Set new value
    this.input.setValue(undefined);
  }

  uploadFile(file: File) {
    // Show loading
    this.isUploading = true;

    this.field.extra.service.upload(file).subscribe((result: any) => {
      // Set new value
      this.input.setValue(result);
      // Hide loading
      this.isUploading = false;
    });
  }

  displayName(item: any): string {
    if(item == undefined){
      return '';
    }
    return item[this.field.extra.display_key];
  }
}
