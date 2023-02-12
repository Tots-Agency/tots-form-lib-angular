import { MatDialogRef } from "@angular/material/dialog";
import { TotsFormModalComponent } from "../../lib/modals/tots-form-modal/tots-form-modal.component";

export class TotsActionModalForm {
    key: string = '';
    item: any;
    modal?: MatDialogRef<TotsFormModalComponent>;
}