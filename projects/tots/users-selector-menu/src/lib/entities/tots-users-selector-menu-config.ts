import { TotsBaseHttpService } from "@tots/core";

export class TotsUsersSelectorMenuConfig {
    service!: TotsBaseHttpService<any>;

    searchFields!: Array<string>;
    firstnameField!: string;
    lastnameField?: string;
    photoField?: string;

    prependIcon?: string;
    textButton: string = 'Select user';
    isShowArrow?: boolean = true;
}