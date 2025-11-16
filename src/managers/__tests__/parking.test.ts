import { ParkingManager } from "../parking";
import {
  mockParkingRegistration,
  mockParkingResponse,
} from "../../services/__mocks__/requests";

let parkingManager: ParkingManager;

beforeEach(() => {
  parkingManager = new ParkingManager();
});

describe("ParkingManager", () => {
  test("Create parking manager", () => {
    expect(parkingManager).toBeTruthy();
  });
});

describe("Save valid parking", () => {
  test("All data is correct", () => {
    const response = parkingManager.saveParking(mockParkingRegistration);
    expect(response).toEqual(mockParkingResponse);
  });
});
