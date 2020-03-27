import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
declare const tinymce;
@Component({
  selector: 'app-tinymce-editor',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.css']
})
export class TinymceEditorComponent implements OnInit {
  public description: any;
  @Input('content')content: any;
  @Output('emitDescription')emitDescription = new EventEmitter();
  @ViewChild('editor',{static: false})editor: any;
  public tinymceInit: any;
  constructor() { }

  ngOnInit() {
    const content = this.description;
    this.tinymceInit = {
      plugins : [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools'
      ],
      toolbar : 'fontsizeselect formatselect | bold italic strikethrough forecolor backcolor| link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat |image|table',
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      image_advtab : true,
      content_css: '../../assets/tinymce/content.css',
      // tslint:disable-next-line:only-arrow-functions
      init_instance_callback(editor) {
        if (content) {
          editor.setContent(content);
        }

      },
      // tslint:disable-next-line:only-arrow-functions
      file_picker_callback(cb, value, meta) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        // tslint:disable-next-line:only-arrow-functions
        input.onchange = function() {
          const file = input.files[0];
          const reader = new FileReader();
          // tslint:disable-next-line:only-arrow-functions
          reader.onload = function() {
            const id = 'blobid' + (new Date()).getTime();
            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
            const base64 = (reader.result as string).split(',')[1];
            const blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };

        input.click();
      }
    };
  }
  onInputChanged(){
    this.emitDescription.emit(this.description);
  }
}
