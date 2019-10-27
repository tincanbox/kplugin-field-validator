export default class GoogleAPI {
    ins: any;
    config: {
        [key: string]: any;
    };
    constructor(conf?: {});
    init(): any;
    oauth(success: any, fail: any): any;
    signin(): any;
    is_signedin(): boolean;
}
