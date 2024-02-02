import { Component, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '@tots/form';

@Component({
  selector: 'tots-quill-field',
  templateUrl: './quill-field.component.html',
  styleUrls: ['./quill-field.component.scss']
})
export class QuillFieldComponent extends TotsBaseFieldComponent implements OnInit {

  heightEditor = 250;
  theme?: string;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image', 'video'],                         // link and image, video
    ],
    
  };

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadConfig();
  }

  editorCreated(quillInstance: any) {
    // Verify if exist file Service
    if(this.field.extra.fileService == undefined){
      return;
    }
    
    // Config Upload image
    this.loadConfigUploadImages(quillInstance);
  }

  loadConfigUploadImages(quillInstance: any) {
    var toolbar = quillInstance.getModule('toolbar');
    toolbar.addHandler('image', () => this.showOpenImageSelector(quillInstance));
  }

  showOpenImageSelector(quillInstance: any) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async () => {
      
      this.field.extra.fileService
      .upload(input.files![0])
      .subscribe((urlImage: any) => {

        quillInstance.insertEmbed(quillInstance.getSelection().index, 'image', urlImage);
        this.input.patchValue(quillInstance.root.innerHTML);
        this.input.updateValueAndValidity();
      });
    };
    input.click();
  }


  loadConfig() {
    if(this.field.extra.height != undefined){
      this.heightEditor = this.field.extra.height;
    }
    if(this.field.extra.theme != undefined){
      this.theme = this.field.extra.theme;
    }
  }
}
