export interface AdminApi {
  getUsers(): Promise<User[]>;
  upload(formData: FormData): Promise<boolean>
  getQuestions(): Promise<Question[]>
  createQuestion(formData: FormData): Promise<boolean>
  deleteQuestion(id: number): Promise<boolean>
  getAmenities(): Promise<Amenity[]>
  createAmenity(formData: FormData): Promise<boolean>
  deleteAmenity(id: number): Promise<boolean>
  getReservations(): Promise<Reservation[]>
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

export interface Reservation {
  id: number;
  userName: string;
  userEmail: string;
  amenity: string;
  startTime: Date;
  endTime: Date;
}
