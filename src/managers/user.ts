import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { Md5 } from "ts-md5";
import {
  get as getCookie,
  remove as removeCookie,
  set as setCookie,
} from "es-cookie";
import {
  GenericResponse,
  MyReservation,
  ReservationTime,
  UserApi,
} from "../services/user-api";
import { Amenity, Question, UserType } from "../services/admin-api";
import {
  LoginResponse,
  LogoutResponse,
  ProcessLoginResponse,
  ValidateTokenResponse,
} from "../types/api-responses";
import PasskeyManager from "./passkey";

export class UserManager implements UserApi {
  public loggedIn: boolean;

  public isAdmin: boolean;

  public isParkingAdmin: boolean;

  public isVaccinated: boolean;

  public authKey: string | undefined;

  public md5Email: string | undefined;

  public fullname: string | undefined;

  public unit: number | undefined;

  public email: string | undefined;

  public phone: string | undefined;

  public userType: UserType;

  public passkeyManager: PasskeyManager;

  constructor() {
    this.loggedIn = false;
    this.isAdmin = false;
    this.isParkingAdmin = false;
    this.isVaccinated = false;
    this.md5Email = undefined;
    this.fullname = undefined;
    this.unit = undefined;
    this.userType = UserType.None;
    this.passkeyManager = new PasskeyManager();

    if (getCookie("token")) {
      this.authKey = getCookie("token");
      if (this.authKey) {
        void this.validateAuthKey(this.authKey);
      }
    } else {
      this.authKey = undefined;
    }
  }

  /**
   * Check if passkeys are supported in current browser
   */
  public isPasskeySupported(): boolean {
    return PasskeyManager.isSupported();
  }

  /**
   * Check if user has passkeys available
   */
  public async checkPasskeyAvailability(email: string): Promise<boolean> {
    const result = await this.passkeyManager.checkAvailability(email);
    return result.passkeys_available;
  }

  /**
   * Login with passkey (alternative to email magic link)
   */
  public async loginWithPasskey(email: string): Promise<boolean> {
    const result = await this.passkeyManager.authenticate(email);

    if (result.success && result.token && result.user) {
      this.authKey = result.token;
      this.loggedIn = true;
      this.fullname = result.user.name;
      this.md5Email = String(Md5.hashStr(result.user.email));
      this.isAdmin = result.user.admin;
      this.isParkingAdmin = result.user.parkingAdmin;
      this.isVaccinated = result.user.vaccinated;
      this.unit = result.user.unit;
      this.phone = result.user.phone;
      this.email = result.user.email;
      this.userType = result.user.type as UserType;

      setCookie("token", this.authKey, { expires: 100 });
      return true;
    }

    return false;
  }

  /**
   * Register a new passkey for current user
   */
  public async registerPasskey(nickname?: string): Promise<boolean> {
    if (!this.authKey) {
      return false;
    }

    const result = await this.passkeyManager.register(nickname);
    return result.success;
  }

  /**
   * Get list of user's passkeys
   */
  public async getPasskeys() {
    if (!this.authKey) {
      return [];
    }

    return await this.passkeyManager.listCredentials(this.authKey);
  }

  /**
   * Delete a passkey
   */
  public async deletePasskey(credentialId: number): Promise<boolean> {
    if (!this.authKey) {
      return false;
    }

    return await this.passkeyManager.deleteCredential(
      this.authKey,
      credentialId,
    );
  }

  public async login(email: string): Promise<boolean> {
    this.authKey = undefined;
    this.loggedIn = false;
    return axios
      .post<LoginResponse>("/api/authentication/login", { email })
      .then((result: AxiosResponse<LoginResponse>) => {
        if (result.data.error === "invalid_email") {
          return false;
        }
        return true;
      });
  }

  public async logout(authKey: string): Promise<boolean> {
    this.authKey = undefined;
    this.loggedIn = false;
    return axios
      .post<LogoutResponse>("/api/authentication/logout", { token: authKey })
      .then((result: AxiosResponse<LogoutResponse>) => {
        if (result.data.success === true) {
          this.loggedIn = false;
          this.isAdmin = false;
          removeCookie("token");
          return true;
        }
        return false;
      });
  }

  public async processLogin(emailKey: string): Promise<boolean | string> {
    return axios
      .post<ProcessLoginResponse>("/api/authentication/process_login", {
        emailKey,
      })
      .then((result: AxiosResponse<ProcessLoginResponse>) => {
        if (result.data.success === false) {
          return false;
        }
        if (result.data.token) {
          this.authKey = result.data.token;
          if (this.authKey) {
            this.loggedIn = true;
            setCookie("token", this.authKey, { expires: 100 });
          }
          return true;
        }
        return false;
      });
  }

  public async validateToken(token: string): Promise<boolean> {
    return axios
      .post<ValidateTokenResponse>("/api/authentication/valid", { token })
      .then((result: AxiosResponse<ValidateTokenResponse>) => {
        let success = false;
        if (result.data.success === true) {
          success = true;
          this.authKey = token;
          this.loggedIn = true;
          this.fullname = result.data.user.name;
          this.md5Email = String(Md5.hashStr(result.data.user.email));
          this.isAdmin = result.data.user.admin;
          this.isParkingAdmin = result.data.user.parkingAdmin;
          this.isVaccinated = result.data.user.vaccinated;
          this.unit = result.data.user.unit;
          this.phone = result.data.user.phone;
          this.email = result.data.user.email;
          this.userType = result.data.user.type;
        }
        return success;
      });
  }

  public async createReservation(formData: FormData): Promise<GenericResponse> {
    const addReservation: GenericResponse = await axios
      .post<GenericResponse>("/api/reservations/create", formData)
      .then((_result) => {
        this.loggedIn = true;
        return { success: true };
      })
      .catch((error: { response?: { data?: { error?: string } } }) => ({
        success: false,
        error: error.response?.data?.error,
      }));
    return addReservation;
  }

  public async createElevatorBooking(
    formData: FormData,
  ): Promise<GenericResponse> {
    const addBooking: GenericResponse = await axios
      .post<GenericResponse>("/api/elevator_bookings/create", formData)
      .then((_result) => {
        this.loggedIn = true;
        return { success: true };
      })
      .catch((error: { response?: { data?: { error?: string } } }) => ({
        success: false,
        error: error.response?.data?.error,
      }));
    return addBooking;
  }

  public async deleteMyElevatorBooking(id: number): Promise<boolean> {
    if (this.loggedIn) {
      this.loggedIn = true;
    }
    const deleteResult: boolean = await axios
      .delete(`/api/elevator_bookings/destroy/${id}`)
      .then((_result) => true)
      .catch((_error) => false);

    return deleteResult;
  }

  public async getQuestions(): Promise<Question[]> {
    this.authKey = getCookie("token");
    const questions: Question[] = await axios
      .get<Question[]>("/api/questions")
      .then((result: AxiosResponse<Question[]>) => result.data);
    return questions;
  }

  public async getAmenities(): Promise<Amenity[]> {
    this.authKey = getCookie("token");
    const amenities: Amenity[] = await axios
      .get<Amenity[]>("/api/resources")
      .then((result: AxiosResponse<Amenity[]>) => result.data);
    return amenities;
  }

  public async findReservations(
    date: Date,
    amenity: number,
  ): Promise<ReservationTime[]> {
    const startDay = moment(date).startOf("day");
    const endDay = moment(date).endOf("day");
    const findReservation = await axios
      .post<ReservationTime[]>("/api/reservations/find_reservations", {
        startDay,
        endDay,
        resource: amenity,
      })
      .then((result: AxiosResponse<ReservationTime[]>) => {
        this.loggedIn = true;
        return result.data;
      })
      .catch((_error: { response?: { data?: { error?: string } } }) => {
        // Return empty array on error since return type must match
        return [] as ReservationTime[];
      });
    return findReservation;
  }

  public async visitorParking(formData: FormData): Promise<GenericResponse> {
    if (this.loggedIn) {
      this.loggedIn = true;
    }

    const addParkingReservation: GenericResponse = await axios
      .post<GenericResponse>("/api/parking/create", formData)
      .then((_result) => ({ success: true }))
      .catch((error: { response?: { data?: { error?: string } } }) => ({
        success: false,
        error: error.response?.data?.error,
      }));
    return addParkingReservation;
  }

  public async getMyReservations(): Promise<MyReservation[]> {
    if (this.loggedIn) {
      this.loggedIn = true;
    }

    const myReservations = await axios
      .get<MyReservation[]>("/api/reservations/mine")
      .then((result: AxiosResponse<MyReservation[]>) => result.data)
      .catch((_error) => {
        return [] as MyReservation[];
      });
    return myReservations;
  }

  public async deleteMyReservation(id: number): Promise<boolean> {
    if (this.loggedIn) {
      this.loggedIn = true;
    }
    const deleteResult: boolean = await axios
      .delete(`/api/reservations/destroy/${id}`)
      .then((_result) => true)
      .catch((_error) => false);

    return deleteResult;
  }

  private async validateAuthKey(authKey: string): Promise<void> {
    const valid = await axios
      .post<{
        valid: boolean;
        authKey?: string;
      }>("/api/authentication/valid", { token: authKey })
      .then(
        (result: AxiosResponse<{ valid: boolean; authKey?: string }>) =>
          result.data,
      );
    if (valid.valid) {
      this.loggedIn = true;
      this.authKey = valid.authKey;
    } else {
      this.authKey = undefined;
    }
  }
}
export default UserManager;
