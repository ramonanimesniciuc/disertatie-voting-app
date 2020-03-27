
import { NgModule } from '@angular/core';
import {TinymceEditorComponent} from './tinymce/tinymce.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        TinymceEditorComponent
    ],
    imports: [
        EditorModule,
        FormsModule
    ],
    providers: [],
    exports: [
        TinymceEditorComponent
    ],
    bootstrap: []
})
export class SharedModule { }
