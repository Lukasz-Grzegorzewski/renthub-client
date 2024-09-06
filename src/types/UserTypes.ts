import { Cart } from "./Cart";
import { IOrder } from "./IOrder";
import { IPicture } from "./IPicture";
import { Role } from "./RoleTypes";

export type UserFormData = {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

export type UserTypes = {
  id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  picture: {
    id: number;
    filename: string;
  };
  adress?: string;
  zipCode: string;
  city: string;
  coordinates: [number, number];
  phoneNumber?: string;
  registrationDate: string;
  role: string;
};

export type UserContextTypes = {
  firstName: string;
  lastName: string;
  role: string;
};

export type VerifyEmailMutationData = {
  code: string;
  userId: number;
};

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
  dateOfBirth: string;
  phoneNumber: string;
  avatar: IPicture;
  role: Role;
  cart: Cart;
  orders: IOrder[];
  lastConnectionDate: string;
  createdBy: UserInterface | null;
  createdAt: string;
  updatedAt: string;
  updatedBy: UpdatedBy | null;
}

export interface CreatedBy {
  id: string;
  firstName: string;
  lastName: string;
}

interface UpdatedBy {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
