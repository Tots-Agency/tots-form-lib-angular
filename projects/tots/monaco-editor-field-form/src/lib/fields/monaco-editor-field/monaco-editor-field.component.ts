import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TotsBaseFieldComponent } from '@tots/form';

@Component({
  selector: 'tots-monaco-editor-field',
  templateUrl: './monaco-editor-field.component.html',
  styleUrls: ['./monaco-editor-field.component.scss']
})
export class MonacoEditorFieldComponent extends TotsBaseFieldComponent implements OnInit {
  editorOptions = { theme: 'vs-dark', language: '' };

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadConfig();
  }

  onInit(editor: any) {
    // Load Suggestions
    if(this.field.extra.suggestions){
      this.loadSuggestions();
    }
  }

  provideCompletionItems(model: any, position: any) {
    return {
      suggestions: this.field.extra.suggestions()
    };
  }

  loadSuggestions() {
    (<any>window).monaco.languages.registerCompletionItemProvider(this.field.extra.language, {
      provideCompletionItems: this.provideCompletionItems.bind(this),
    });
  }

  loadConfig() {
    this.editorOptions.language = this.field.extra.language || 'javascript';
  }
}
