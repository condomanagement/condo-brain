import axios, { AxiosResponse } from "axios";
import {
  AdminApi,
  Amenity,
  ElevatorBooking,
  ParkingRegistration,
  Question,
  Reservation,
  User,
} from "../services/admin-api";

export class AdminManager implements AdminApi {
  private _isAdmin: boolean;

  constructor() {
    this._isAdmin = true;
  }

  public async getUsers(): Promise<User[]> {
    if (!this._isAdmin) {
      return [];
    }
    const users: User[] = await axios
      .get<User[]>("/api/users")
      .then((result: AxiosResponse<User[]>) => result.data);
    return users;
  }

  public async getQuestions(): Promise<Question[]> {
    if (!this._isAdmin) {
      return [];
    }
    const questions: Question[] = await axios
      .get<Question[]>("/api/questions")
      .then((result: AxiosResponse<Question[]>) => result.data);
    return questions;
  }

  public async getReservations(): Promise<Reservation[]> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const reservations: Reservation[] = await axios
      .get<Reservation[]>("/api/reservations")
      .then((result: AxiosResponse<Reservation[]>) => result.data);

    return reservations;
  }

  public async getElevatorBookings(): Promise<ElevatorBooking[]> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const bookings: ElevatorBooking[] = await axios
      .get<ElevatorBooking[]>("/api/elevator_bookings")
      .then((result: AxiosResponse<ElevatorBooking[]>) => result.data);

    return bookings;
  }

  public async deleteElevatorBooking(id: number): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const deleteResult: boolean = await axios
      .delete(`/api/elevator_bookings/destroy/${id}`)
      .then((_result) => true)
      .catch((_error) => false);

    return deleteResult;
  }

  public async approveElevatorBooking(
    id: number,
    formData: FormData,
  ): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const approveResult: boolean = await axios
      .patch(`/api/elevator_bookings/approve/${id}`, formData)
      .then((_result) => true)
      .catch((_error) => false);

    return approveResult;
  }

  public async rejectElevatorBooking(
    id: number,
    formData: FormData,
  ): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const approveResult: boolean = await axios
      .patch(`/api/elevator_bookings/reject/${id}`, formData)
      .then((_result) => true)
      .catch((_error) => false);

    return approveResult;
  }

  public async getParkingRegistrations(
    when = "today",
  ): Promise<ParkingRegistration[]> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const registration: ParkingRegistration[] = await axios
      .get<ParkingRegistration[]>(`/api/parking/${when}`)
      .then((result: AxiosResponse<ParkingRegistration[]>) => result.data);

    return registration;
  }

  public async createQuestion(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const addResult: boolean = await axios
      .post("/api/questions/create", formData)
      .then((_result) => true)
      .catch((_error) => false);

    return addResult;
  }

  public async editQuestion(formData: FormData, id: number): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const editResult: boolean = await axios
      .patch(`/api/questions/update/${id}`, formData)
      .then((_result) => true)
      .catch((_error) => false);

    return editResult;
  }

  public async createAmenityQuestion(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const addResult: boolean = await axios
      .post("/api/resource_questions/create", formData)
      .then((_result) => true)
      .catch((_error) => false);

    return addResult;
  }

  public async deleteQuestion(id: number): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const deleteResult: boolean = await axios
      .delete(`/api/questions/destroy/${id}`)
      .then((_result) => true)
      .catch((_error) => false);

    return deleteResult;
  }

  public async deleteAmenityQuestion(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const deleteResult: boolean = await axios
      .post("/api/resource_questions/remove", formData)
      .then((_result) => true)
      .catch((_error) => false);

    return deleteResult;
  }

  public async getAmenities(): Promise<Amenity[]> {
    if (!this._isAdmin) {
      return [];
    }
    const amenities: Amenity[] = await axios
      .get<Amenity[]>("/api/resources")
      .then((result: AxiosResponse<Amenity[]>) => result.data);
    return amenities;
  }

  public async createAmenity(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const addResult: boolean = await axios
      .post("/api/resources/create", formData)
      .then((_result) => true)
      .catch((_error) => false);

    return addResult;
  }

  public async editAmenity(formData: FormData, id: number): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const addResult: boolean = await axios
      .patch(`/api/resources/update/${id}`, formData)
      .then((_result) => true)
      .catch((_error) => false);

    return addResult;
  }

  public async deleteAmenity(id: number): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const deleteResult: boolean = await axios
      .delete(`/api/resources/destroy/${id}`)
      .then((_result) => true)
      .catch((_error) => false);

    return deleteResult;
  }

  public async upload(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return false;
    }

    const uploadResult: boolean = await axios
      .post("/api/users/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((_result) => true)
      .catch((_error) => false);
    return uploadResult;
  }

  public async createUser(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const addResult: boolean = await axios
      .post("/api/users/create", formData)
      .then((_result) => true)
      .catch((_error) => false);

    return addResult;
  }

  public async editUser(formData: FormData, id: number): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error("Not authorized"));
    }

    const editResult: boolean = await axios
      .patch(`/api/users/update/${id}`, formData)
      .then((_result) => true)
      .catch((_error) => false);

    return editResult;
  }
}
export default AdminManager;
