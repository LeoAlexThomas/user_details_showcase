export enum GenderEnum {
  male = "male",
  female = "female",
}

export enum RoleEnum {
  admin = "admin",
  moderator = "moderator",
  user = "user",
}

export interface PaginationInterface<T> {
  users: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserHairInterface {
  color: string;
  type: string;
}

export interface AddressInterface {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

export interface BankInterface {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface CompanyInterface {
  department: string;
  name: string;
  title: string;
  address: AddressInterface;
}

export interface CryptoInterface {
  coin: string;
  wallet: string;
  network: string;
}

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: GenderEnum;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: UserHairInterface;
  ip: string;
  address: AddressInterface;
  macAddress: string;
  university: string;
  bank: BankInterface;
  company: CompanyInterface;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: CryptoInterface;
  role: RoleEnum;
}
