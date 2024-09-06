export interface IPicture {
  id: number;
  name: string;
  mimetype: string;
  uri: string;
  urlMiniature: string;
  urlHD: string;
}

export type typePictureRelation = "category" | "productReference" | "user";
