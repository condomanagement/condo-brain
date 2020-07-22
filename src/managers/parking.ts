import { ParkingApi } from '../services/parking-api';
import { SuccessResponse } from '../services/common';

export class ParkingManager implements ParkingApi {
  private userId = '0';

  public saveParking(userId:string): SuccessResponse {
    if (this.userId === '0') {
      this.userId = userId;
    }
    return { success: true };
  }
}

export default ParkingManager;
