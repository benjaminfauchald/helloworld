// TextDocument: indicates a text document, such as a source file, you can view the API yourself
import { window, StatusBarItem, StatusBarAlignment, TextDocument } from 'vscode';

export class WordCount {
  private statusBar !: StatusBarItem ;

  public updateWordCount() {
    if(!this.statusBar) {
      this.statusBar  = window.createStatusBarItem(StatusBarAlignment.Left);
    }

    // Get the current active editor
    let editor = window.activeTextEditor;

    // The code for this judgment condition is very important. If you delete the following code, an error will be reported. Please be sure to do this judgment.
    if(!editor) {
      this.statusBar.hide();
      return;
    }

    // Get all the information of the current document
    let doc = editor.document;

    // Used to read the language ID of the current file and determine whether it is an md document
    if(doc.languageId === 'markdown') {
      let textNum = doc.getText().replace(/[\r\n\s]+/g, '').length;
      this.statusBar.text = textNum === 0 ? `No text yet~` : `$(octoface) has been output ${textNum}  Words! ! ! `;
      this.statusBar.show();
    } else {
      this.statusBar.hide();
    }
  }

  // Destroy objects and free resources
  dispose() {
		this.statusBar.dispose();
	}
}

export default WordCount