export interface IMessageImage {
    id: number;
    messageId: number;
    fileName: string;
    fileType: string;
    docByte: Int32Array;
    size: number;
}