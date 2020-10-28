import { CollectionImage } from './collection-image';
import { Image } from './image';

export interface User {
    id?: number;
    username?: string;
    avatar?: Image;
    collectionImageList?: CollectionImage[];
}
