import { AdminApi, Amenity, ElevatorBooking, ParkingRegistration, Question, Reservation, User } from '../services/admin-api';
export declare class AdminManager implements AdminApi {
    private _isAdmin;
    constructor();
    getUsers(): Promise<User[]>;
    getQuestions(): Promise<Question[]>;
    getReservations(): Promise<Reservation[]>;
    getElevatorBookings(): Promise<ElevatorBooking[]>;
    deleteElevatorBooking(id: number): Promise<boolean>;
    approveElevatorBooking(id: number, formData: FormData): Promise<boolean>;
    rejectElevatorBooking(id: number, formData: FormData): Promise<boolean>;
    getParkingRegistrations(when?: string): Promise<ParkingRegistration[]>;
    createQuestion(formData: FormData): Promise<boolean>;
    editQuestion(formData: FormData, id: number): Promise<boolean>;
    createAmenityQuestion(formData: FormData): Promise<boolean>;
    deleteQuestion(id: number): Promise<boolean>;
    deleteAmenityQuestion(formData: FormData): Promise<boolean>;
    getAmenities(): Promise<Amenity[]>;
    createAmenity(formData: FormData): Promise<boolean>;
    editAmenity(formData: FormData, id: number): Promise<boolean>;
    deleteAmenity(id: number): Promise<boolean>;
    upload(formData: FormData): Promise<boolean>;
    createUser(formData: FormData): Promise<boolean>;
    editUser(formData: FormData, id: number): Promise<boolean>;
}
export default AdminManager;
//# sourceMappingURL=admin-api.d.ts.map