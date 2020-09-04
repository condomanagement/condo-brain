export interface AdminApi {
  getUsers(): Promise<User[]>;
  upload(formData: FormData): Promise<boolean>
  createUser(formData: FormData): Promise<boolean>
  editUser(formData: FormData, id: number): Promise<boolean>
  getQuestions(): Promise<Question[]>
  createQuestion(formData: FormData): Promise<boolean>
  deleteQuestion(id: number): Promise<boolean>
  getAmenities(): Promise<Amenity[]>
  createAmenity(formData: FormData): Promise<boolean>
  editAmenity(formData: FormData, id: number): Promise<boolean>
  deleteAmenity(id: number): Promise<boolean>
  getReservations(): Promise<Reservation[]>
  getParkingRegistrations(): Promise<ParkingRegistration[]>
  createAmenityQuestion(formData: FormData): Promise<boolean>
  editQuestion(formData: FormData, id: number): Promise<boolean>
  deleteAmenityQuestion(formData: FormData): Promise<boolean>
}

export interface User {
  id?: number;
  name: string;
  unit?: number;
  admin: boolean;
  active: boolean;
  parkingAdmin: boolean;
  email?: string;
  phone?: string;
}

export interface Question {
  id: number;
  question: string;
  requiredAnswer: boolean;
  amenities: Amenity[];
}

export interface Amenity {
  id: number;
  name: string;
  timeLimit: number;
  questions: Question[];
}

export interface Reservation {
  id: number;
  userName: string;
  userEmail: string;
  amenity: string;
  startTime: Date;
  endTime: Date;
}

export interface ParkingRegistration {
  id: number;
  startDate: Date;
  endDate: Date;
  license: string;
  unit: number;
  make: string;
  color: string;
  contact: string;
}
