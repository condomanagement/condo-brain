import { GenericResponse } from "./common";

export interface ParkingRegistration {
  id?: number;
  code: string;
  unit: number;
  color: string;
  make: string;
  license: string;
  contact: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  userId?: string;
}

export interface ParkingApi {
  saveParking(registration: ParkingRegistration): GenericResponse;
}
