import { ParkingApi, ParkingRegistration } from "../services/parking-api";
import { GenericResponse } from "../services/common";
export declare class ParkingManager implements ParkingApi {
    private userId;
    saveParking(registration: ParkingRegistration): GenericResponse;
}
export default ParkingManager;
//# sourceMappingURL=parking.d.ts.map