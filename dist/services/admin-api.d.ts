export interface AdminApi {
    getUsers(): Promise<User[]>;
    upload(formData: FormData): Promise<boolean>;
    getQuestions(): Promise<Question[]>;
    createQuestion(formData: FormData): Promise<boolean>;
    deleteQuestion(id: number): Promise<boolean>;
    getAmenities(): Promise<Amenity[]>;
    createAmenity(formData: FormData): Promise<boolean>;
    deleteAmenity(id: number): Promise<boolean>;
}
export interface User {
    id: number;
    name: string;
    unit: number;
    admin: boolean;
    email: string;
}
export interface Question {
    id: number;
    question: string;
    requiredAnswer: boolean;
}
export interface Amenity {
    id: number;
    name: string;
}
//# sourceMappingURL=admin-api.d.ts.map