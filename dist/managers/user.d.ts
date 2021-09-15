import { GenericResponse, MyReservation, ReservationTime, UserApi } from '../services/user-api';
import { Amenity, Question, UserType } from '../services/admin-api';
export declare class UserManager implements UserApi {
    loggedIn: boolean;
    isAdmin: boolean;
    isParkingAdmin: boolean;
    isVaccinated: boolean;
    authKey: string | undefined;
    md5Email: string | undefined;
    fullname: string | undefined;
    unit: number | undefined;
    email: string | undefined;
    phone: string | undefined;
    userType: UserType;
    constructor();
    login(email: string): Promise<boolean>;
    logout(authKey: string): Promise<boolean>;
    processLogin(emailKey: string): Promise<boolean | string>;
    validateToken(token: string): Promise<boolean>;
    createReservation(formData: FormData): Promise<GenericResponse>;
    createElevatorBooking(formData: FormData): Promise<GenericResponse>;
    deleteMyElevatorBooking(id: number): Promise<boolean>;
    getQuestions(): Promise<Question[]>;
    getAmenities(): Promise<Amenity[]>;
    findReservations(date: Date, amenity: number): Promise<ReservationTime[]>;
    visitorParking(formData: FormData): Promise<GenericResponse>;
    getMyReservations(): Promise<MyReservation[]>;
    deleteMyReservation(id: number): Promise<boolean>;
    private validateAuthKey;
}
export default UserManager;
//# sourceMappingURL=user.d.ts.map