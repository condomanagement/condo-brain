import { GenericResponse, MyReservation, ReservationTime, UserApi } from '../services/user-api';
import { Amenity, Question } from '../services/admin-api';
export declare class UserManager implements UserApi {
    loggedIn: boolean;
    isAdmin: boolean;
    authKey: string | undefined;
    md5Email: string | undefined;
    fullname: string | undefined;
    constructor();
    login(email: string): Promise<boolean>;
    logout(authKey: string): Promise<boolean>;
    processLogin(emailKey: string): Promise<boolean | string>;
    validateToken(token: string): Promise<boolean>;
    createReservation(formData: FormData): Promise<GenericResponse>;
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