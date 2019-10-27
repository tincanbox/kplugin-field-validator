import Submodule from '../interface/Submodule';
export default class __API extends Submodule {
    constructor(c: any, opt?: {});
    request(method: string, url: string, param: object): any;
    error_handler(r: {
        [key: string]: any;
    }): Promise<unknown>;
    fetch(path: any, opt?: {}): any;
}
