export interface IAlbum {
    id: string,
    title: string,
    productUrl: string,
    coverPhotoBaseUrl: string,
    coverPhotoMediaItemId: string,
    isWriteable: boolean,
    mediaItemsCount: number
}
export interface IPhoto {
    id: string,
    filename: string,
    baseUrl: string,
    description: string,
    creationDate: string,
    productUrl: string,
    width?: number,
    height?: number,
    
}

export interface IImgObject {
    name: string,
    description: string,
    file: File
}

export interface IPhotoSize {
    x: number,
    y: number
}

export interface IContentOptions {
    x: number;
    y: number;
    width: number;
    pointerX: number;
    class: boolean
}

export interface ITheme {
    colorTheme: number;
    colorClass: number;
}