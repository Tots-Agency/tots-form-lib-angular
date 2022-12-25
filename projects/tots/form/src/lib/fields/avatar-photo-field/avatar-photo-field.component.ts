import { Component } from '@angular/core';
import { TotsBaseFieldComponent } from '../tots-base-field.component';

@Component({
  selector: 'avatar-photo-field',
  templateUrl: './avatar-photo-field.component.html',
  styleUrls: ['./avatar-photo-field.component.scss']
})
export class AvatarPhotoFieldComponent extends TotsBaseFieldComponent {

  isUploading = false;

  onChange(target: any) {
    // Verify if selected one file
    if(target.files.length == 0){
      return;
    }
    // Call Start uploading
    this.isUploading = true;
    // For each all files selected
    for (let i = 0; i < target.files.length; i++) {
      this.uploadFile(target.files[i]);
    }
  }

  uploadFile(file: File) {
    this.field.extra.service.upload(file).subscribe((result: any) => {
      this.input.setValue(result.url);
      this.isUploading = false;
    });
  }

  getButtonText() {
    if(this.field.extra && this.field.extra.button_text){
      return this.field.extra.button_text;
    }

    return 'Upload photo here';
  }

  getRemoveText() {
    if(this.field.extra && this.field.extra.remove_text){
      return this.field.extra.remove_text;
    }

    return 'Delete image';
  }

  getErrorImage() {
    if(this.field.extra && this.field.extra.error_image){
      return this.field.extra.error_image;
    }

    return 'https://storage.googleapis.com/tots-send-public/user-avatar-empty.png';
  }
}
