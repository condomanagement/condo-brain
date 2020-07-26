import { ParkingApi, ParkingRegistration } from '../services/parking-api';
import { GenericResponse } from '../services/common';

export class ParkingManager implements ParkingApi {
  private userId = '0';

  public saveParking(registration: ParkingRegistration): GenericResponse {
    if (registration.userId && registration.userId !== this.userId) {
      this.userId = registration.userId;
    }
    return { success: true };
  }
}

export default ParkingManager;
