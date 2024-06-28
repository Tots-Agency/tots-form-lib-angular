import { TotsFieldForm } from "./tots-field-form";

export class TotsModalConfig {
    title: string = '';
    fields: Array<TotsFieldForm> = [];
    item: any;
    autoSave?: boolean = false;
    panelClass? : string|string[];
}