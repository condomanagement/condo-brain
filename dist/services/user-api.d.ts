import { Amenity, Question, UserType } from './admin-api';
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
export interface UserApi {
    authKey: string | undefined;
    loggedIn: boolean;
    isAdmin: boolean;
    isParkingAdmin: boolean;
    md5Email: string | undefined;
    fullname: string | undefined;
    userType: UserType;
    login(email: string): Promise<boolean>;
    logout(authKey: string): Promise<boolean>;
    processLogin(emailKey: string): Promise<boolean | string>;
    validateToken(token: string): Promise<boolean>;
    createReservation(formData: FormData): Promise<GenericResponse>;
    getQuestions(): Promise<Question[]>;
    getAmenities(): Promise<Amenity[]>;
    visitorParking(formData: FormData): Promise<GenericResponse>;
    findReservations(date: Date, amenity: number): Promise<ReservationTime[]>;
    getMyReservations(): Promise<MyReservation[]>;
    deleteMyReservation(id: number): Promise<boolean>;
    createElevatorBooking(formData: FormData): Promise<GenericResponse>;
    deleteMyElevatorBooking(id: number): Promise<boolean>;
}
//# sourceMappingURL=user-api.d.ts.map