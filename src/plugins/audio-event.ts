import { MediaProcessorPlugin } from "./plugin.interface";
import child_process from 'child_process';

export class AudioEventPlugin implements MediaProcessorPlugin {

    constructor(public message: string) {

    }

    getDetection(fileName: string): Promise<boolean> {
        return Promise.resolve(false);
        return new Promise((resolve, reject) => {
            let result: string;
            child_process.exec(`python3 ./process.py ./config.py ../${fileName};`, { cwd: 'audio-detect', encoding: 'ascii' }, (error, stdout, stderr) => {
                resolve(stdout.includes('true'));
            });
        });
    }
}