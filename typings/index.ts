
export interface VehicleData {
  data: OffersData;
}

export interface OffersData {
  getOffersV3Beta: GetOffersV3Beta;
}

export interface GetOffersV3Beta {
  metadata:   Metadata;
  records:    Record[];
  __typename: string;
}

export interface Metadata {
  page:             number;
  limit:            number;
  pageCount:        number;
  totalCount:       number;
  sortedFilter:     string;
  sortedFilterHash: string;
  __typename:       string;
}

export interface Record {
  vehicleId:           string;
  offerID:             string;
  make:                string;
  model:               string;
  mileage:             number;
  power:               number;
  firstRegistration:   null | string;
  fuel:                Fuel;
  consumptionUnit:     ConsumptionUnit;
  consumptionCombined: number | null;
  co2:                 number | null;
  emissionClass:       EmissionClass;
  price:               number;
  image:               string;
  monthlyInstallment:  number;
  gearbox:             Gearbox;
  condition:           Condition;
  variant:             string;
  category:            Category;
  exteriorColor:       string;
  cubicCapacity:       null;
  fourWheelDrive:      boolean;
  datePublished:       string;
  supplier:            string;
  images:              string[];
  vin:                 string;
  __typename:          Typename;
}

export enum Typename {
  Offer = "Offer",
}

export enum Category {
  Estatecar = "ESTATECAR",
  Limousine = "LIMOUSINE",
  Smallcar = "SMALLCAR",
  Transporter = "TRANSPORTER",
}

export enum Condition {
  New = "NEW",
  Used = "USED",
}

export enum ConsumptionUnit {
  Kwh = "KWH",
  Liter = "LITER",
}

export enum EmissionClass {
  Empty = "",
  Euro6 = "EURO6",
}

export enum Fuel {
  Diesel = "DIESEL",
  Electricity = "ELECTRICITY",
  Petrol = "PETROL",
}

export enum Gearbox {
  AutomaticGear = "AUTOMATIC_GEAR",
  ManualGear = "MANUAL_GEAR",
}
