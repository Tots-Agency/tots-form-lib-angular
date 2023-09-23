import { Component, OnInit, ViewChild } from '@angular/core';
import { TotsBaseFieldComponent } from '@tots/form';
import { QuillEditorComponent } from 'ngx-quill';
import 'quill-mention';

@Component({
  selector: 'tots-mention-html-field',
  templateUrl: './mention-html-field.component.html',
  styleUrls: ['./mention-html-field.component.scss']
})
export class MentionHtmlFieldComponent extends TotsBaseFieldComponent implements OnInit {

  @ViewChild(QuillEditorComponent, { static: true }) editor?: QuillEditorComponent;

  heightEditor = 250;
  theme?: string;

  modules = {
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      onSelect: (item: any, insertItem: any) => {},
      source: (searchTerm: any, renderList: any, mentionChar: any) => {},
      blotName: undefined
    },
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

    if(this.field.extra.denotationChars == undefined){
      throw new Error('denotationChars is required');
    }

    this.modules.mention.mentionDenotationChars = this.field.extra.denotationChars;

    if(this.field.extra.blotName != undefined){
      this.modules.mention.blotName = this.field.extra.blotName;
    }

    this.modules.mention.onSelect = (item: any, insertItem: any) => {
      this.field.extra.onSelect(this.editor, item, insertItem);
    }

    this.modules.mention.source = (searchTerm: any, renderList: any, mentionChar: any) => {
      this.field.extra.source(this.editor, searchTerm, renderList, mentionChar);
    }
  }
}
