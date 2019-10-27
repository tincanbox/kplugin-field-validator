import Submodule from '../interface/Submodule';
export default class __UI extends Submodule {
    action: {
        [s: string]: Function;
    };
    constructor(c: any, opt?: {});
    bind_action(evm: any): void;
    render(template_id: any, attr: any): any;
}
