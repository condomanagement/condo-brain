import { ParkingRegistration } from '../parking-api';
import { GenericResponse } from '../common';

export const mockParkingRegistration: ParkingRegistration = {
  code: 'Funnn',
  unit: 100,
  color: 'Blue',
  make: 'NOCAR',
  license: '123 ABC',
  contact: 'test@example.com',
  startDate: '2020-01-01',
  endDate: '2020-01-02',
  userId: '123',
};

export const mockParkingResponse: GenericResponse = {
  success: true,
};
