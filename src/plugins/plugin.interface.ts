export interface MediaProcessorPlugin {
    message: string;
    getDetection(fileName: string): Promise<boolean>;
}