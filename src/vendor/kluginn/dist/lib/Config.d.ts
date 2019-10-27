import Submodule from '../interface/Submodule';
export default class __Config extends Submodule {
    $form: any;
    selector: {
        [key: string]: string;
    };
    constructor(c: any, opt?: {});
    init(): void;
    save(p: any): any;
    fetch(): any;
    update_form(): void;
    update_input(o: any): void;
    retrieve_form_data(): {};
}
