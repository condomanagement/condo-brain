import { AdminApi, Amenity, Question, User } from '../services/admin-api';
export declare class AdminManager implements AdminApi {
    private _isAdmin;
    constructor();
    getUsers(): Promise<User[]>;
    getQuestions(): Promise<Question[]>;
    createQuestion(formData: FormData): Promise<boolean>;
    deleteQuestion(id: number): Promise<boolean>;
    getAmenities(): Promise<Amenity[]>;
    createAmenity(formData: FormData): Promise<boolean>;
    deleteAmenity(id: number): Promise<boolean>;
    upload(formData: FormData): Promise<boolean>;
}
export default AdminManager;
//# sourceMappingURL=admin-api.d.ts.map