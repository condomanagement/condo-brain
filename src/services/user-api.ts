import { Amenity, Question } from './admin-api';

export interface UserApi {
  authKey: string | undefined;
  loggedIn: boolean;
  isAdmin: boolean;
  login(email: string): Promise<void>;
  logout(authKey: string): Promise<boolean>;
  processLogin(emailKey: string): Promise<boolean | string>;
  validateToken(token: string): Promise<boolean>;
  createReservation(formData: FormData): Promise<GenericResponse>;
  getQuestions(): Promise<Question[]>
  getAmenities(): Promise<Amenity[]>
  visitorParking(formData: FormData): Promise<GenericResponse>;
  findReservations(date: Date, amenity: number): Promise<ReservationTime[]>
  getMyReservations(): Promise<MyReservation[]>
}

export interface GenericResponse {
  success: boolean;
  error?: string;
}

export interface ReservationTime {
  id: number;
  startTime: Date;
  endTime: Date;
}

export interface MyReservation {
  id: number;
  amenity: string;
  startTime: Date;
  endTime: Date;
}
