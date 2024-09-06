import { IPicture } from "./IPicture";
import { IProductReference } from "./IProductReference";
import { UserInterface } from "./UserTypes";

export interface ICategory {
  id: string | number;
  name: string;
  index: string | number;
  display: boolean;
  createdBy: UserInterface | null;
  updatedBy: UserInterface | null;
  createdAt: string | null;
  updatedAt: string | null;
  parentCategory: ICategory | null;
  childCategories: ICategory[] | null;
  picture: IPicture | null;
  productReferences: IProductReference[] | null;
}

export interface ICategoryCreateInput {
  name: string;
  index: string | number;
  display: boolean;
  parentCategoryId: number;
}
