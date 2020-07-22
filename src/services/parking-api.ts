import { SuccessResponse } from './common';

export interface ParkingApi {
  saveParking(userId: string): SuccessResponse;
}
