import { Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { TOTS_FORM_DEFAULT_CONFIG, TotsBaseFieldComponent, TotsFormDefaultConfig } from '@tots/form';
import { ensureImageResizeRegistered } from './register-image-resize';

@Component({
  selector: 'tots-quill-field',
  templateUrl: './quill-field.component.html',
  styleUrls: ['./quill-field.component.scss']
})
export class QuillFieldComponent extends TotsBaseFieldComponent implements OnInit, OnDestroy {

  heightEditor = 250;
  theme?: string;
  isImageResizeReady = false;

  // quill-image-resize-module never repositions on scroll/resize, only on
  // click/drag. We attach on window's capture phase so it still catches
  // scroll events from any ancestor, even non-bubbling ones.
  protected imageResizeModule: any;

  // The overlay lives outside .ql-editor, so its own internal scroll
  // (fixed height, see heightEditor) never clips it — it must be hidden
  // manually once the image scrolls out of the editor's visible area.
  protected editorRoot: HTMLElement | null = null;

  protected repositionImageOverlay = () => {
    const module = this.imageResizeModule;
    module?.repositionElements?.();

    const overlay = module?.overlay;
    const img = module?.img;
    if (!overlay || !img || !this.editorRoot) {
      return;
    }

    // Small tolerance so the image can clip slightly before the overlay
    // disappears, instead of vanishing at the very first pixel.
    const tolerance = 24;
    const editorRect = this.editorRoot.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const isVisible = imgRect.top >= editorRect.top - tolerance
      && imgRect.bottom <= editorRect.bottom + tolerance
      && imgRect.left >= editorRect.left - tolerance
      && imgRect.right <= editorRect.right + tolerance;

    overlay.style.display = isVisible ? '' : 'none';
  };

  // The overlay has no pointer-events set, so it swallows clicks/scroll
  // meant for the editor underneath. Let it pass through; only the
  // resize handles/label (its children) need to stay interactive.
  private allowOverlayPointerEventsToPassThrough(module: any): void {
    const originalShow = module?.show?.bind(module);
    if (!originalShow) {
      return;
    }
    module.show = (img: any) => {
      originalShow(img);
      if (module.overlay) {
        module.overlay.style.pointerEvents = 'none';
        Array.from(module.overlay.children as HTMLCollection).forEach((child) => {
          (child as HTMLElement).style.pointerEvents = 'auto';
        });
      }
    };
  }

  constructor(
    @Inject(TOTS_FORM_DEFAULT_CONFIG) totsFormDefaultConfig: TotsFormDefaultConfig,
    protected ngZone: NgZone
  ) {
    super(totsFormDefaultConfig);
  }

  modules = {
    imageResize: {
      modules: ['Resize', 'DisplaySize'],
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
    ensureImageResizeRegistered().then(() => {
      this.isImageResizeReady = true;
    });
  }

  editorCreated(quillInstance: any) {
    this.imageResizeModule = quillInstance.getModule('imageResize');
    this.editorRoot = quillInstance.root;
    this.allowOverlayPointerEventsToPassThrough(this.imageResizeModule);
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.repositionImageOverlay, true);
      window.addEventListener('resize', this.repositionImageOverlay);

      // The module's click handler no-ops on a click that re-selects an
      // already-selected image, so a stale hidden overlay never gets a
      // chance to reappear. Force our own visibility check on every
      // image click, regardless of what the module's handler did.
      quillInstance.root.addEventListener('click', (evt: MouseEvent) => {
        if ((evt.target as HTMLElement)?.tagName === 'IMG') {
          this.repositionImageOverlay();
        }
      });
    });

    // Verify if exist file Service
    if(this.field.extra.fileService == undefined){
      return;
    }

    // Config Upload image
    this.loadConfigUploadImages(quillInstance);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.repositionImageOverlay, true);
    window.removeEventListener('resize', this.repositionImageOverlay);
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
