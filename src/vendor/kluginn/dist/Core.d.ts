import API from './lib/API';
import UI from './lib/UI';
import Debug from './lib/Debug';
import _file from './lib/file';
import _csv from './lib/csv';
export default class Kluginn {
    $: object;
    $k: {
        [key: string]: any;
    };
    plugin_id: number;
    option: object;
    config: object;
    api: API;
    ui: UI;
    debug: Debug;
    file: _file;
    csv: _csv;
    vendor: object;
    service: object;
    external: object;
    constructor(option: any);
    init(opt?: {}): Promise<unknown>;
    load(url: any): Promise<unknown>;
    dialog(a: any): any;
}
