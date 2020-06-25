export interface Conf {
    apiKey: string;
    apiSecret: string;
    audioDetectMessage: string;
    certificate: {
        certPath: string;
        keyPath: string;
    }
}