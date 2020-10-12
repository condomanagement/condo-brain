import axios from 'axios';
import moment from 'moment';
import { Md5 } from 'ts-md5';
import {
  get as getCookie,
  remove as removeCookie,
  set as setCookie,
} from 'es-cookie';
import {
  GenericResponse,
  MyReservation,
  ReservationTime,
  UserApi,
} from '../services/user-api';
import { Amenity, Question, UserType } from '../services/admin-api';

export class UserManager implements UserApi {
  public loggedIn: boolean;

  public isAdmin: boolean;

  public isParkingAdmin: boolean;

  public authKey: string | undefined;

  public md5Email: string | undefined;

  public fullname: string | undefined;

  public unit: number | undefined;

  public email: string | undefined;

  public phone: string | undefined;

  public userType: UserType;

  constructor() {
    this.loggedIn = false;
    this.isAdmin = false;
    this.isParkingAdmin = false;
    this.md5Email = undefined;
    this.fullname = undefined;
    this.unit = undefined;
    this.userType = UserType.None;

    if (getCookie('token')) {
      this.authKey = getCookie('token');
      if (this.authKey) {
        this.validateAuthKey(this.authKey);
      }
    } else {
      this.authKey = undefined;
    }
  }

  public async login(email: string): Promise<boolean> {
    this.authKey = undefined;
    this.loggedIn = false;
    return axios.post('/api/authentication/login', { email }).then((result) => {
      if (result.data.error === 'invalid_email') {
        return false;
      }
      return true;
    });
  }

  public async logout(authKey: string): Promise<boolean> {
    this.authKey = undefined;
    this.loggedIn = false;
    return axios.post('/api/authentication/logout', { token: authKey }).then((result) => {
      if (result.data.success === true) {
        this.loggedIn = false;
        this.isAdmin = false;
        removeCookie('token');
        return true;
      }
      return false;
    });
  }

  public async processLogin(emailKey: string): Promise<boolean | string> {
    return axios.post('/api/authentication/process_login', { emailKey }).then((result) => {
      if (result.data.success === false) {
        return false;
      }
      if (result.data.token) {
        this.authKey = result.data.token;
        if (this.authKey) {
          this.loggedIn = true;
          setCookie('token', this.authKey, { expires: 100 });
        }
        return true;
      }
      return false;
    });
  }

  public async validateToken(token: string): Promise<boolean> {
    return axios.post('/api/authentication/valid', { token }).then((result) => {
      let success = false;
      if (result.data.success === true) {
        success = true;
        this.authKey = token;
        this.loggedIn = true;
        this.fullname = result.data.user.name;
        this.md5Email = String(Md5.hashStr(result.data.user.email));
        this.isAdmin = result.data.user.admin;
        this.isParkingAdmin = result.data.user.parkingAdmin;
        this.unit = result.data.user.unit;
        this.phone = result.data.user.phone;
        this.email = result.data.user.email;
        this.userType = result.data.user.type;
      }
      return success;
    });
  }

  public async createReservation(formData: FormData): Promise<GenericResponse> {
    const addReservation: GenericResponse = await axios.post('/api/reservations/create', formData)
      .then((_result) => {
        this.loggedIn = true;
        return ({ success: true });
      })
      .catch((error) => (
        ({ success: false, error: error.response.data.error })
      ));
    return addReservation;
  }

  public async createElevatorBooking(formData: FormData): Promise<GenericResponse> {
    const addBooking: GenericResponse = await axios.post('/api/elevator_bookings/create', formData)
      .then((_result) => {
        this.loggedIn = true;
        return ({ success: true });
      })
      .catch((error) => (
        ({ success: false, error: error.response.data })
      ));
    return addBooking;
  }

  public async deleteMyElevatorBooking(id: number): Promise<boolean> {
    if (this.loggedIn) {
      this.loggedIn = true;
    }
    const deleteResult: boolean = await axios.delete(`/api/elevator_bookings/destroy/${id}`)
      .then((_result) => (true))
      .catch((_error) => (false));

    return deleteResult;
  }

  public async getQuestions(): Promise<Question[]> {
    this.authKey = getCookie('token');
    const questions: Question[] = await axios.get('/api/questions').then((result) => result.data);
    return questions;
  }

  public async getAmenities(): Promise<Amenity[]> {
    this.authKey = getCookie('token');
    const amenities: Amenity[] = await axios.get('/api/resources').then((result) => result.data);
    return amenities;
  }

  public async findReservations(date: Date, amenity: number): Promise<ReservationTime[]> {
    const startDay = moment(date).startOf('day');
    const endDay = moment(date).endOf('day');
    const findReservation = await axios.post('/api/reservations/find_reservations', {
      startDay,
      endDay,
      resource: amenity,
    })
      .then((result) => {
        this.loggedIn = true;
        return result.data;
      })
      .catch((error) => (
        ({ success: false, error: error.response.data.error })
      ));
    return findReservation;
  }

  public async visitorParking(formData: FormData): Promise<GenericResponse> {
    if (this.loggedIn) {
      this.loggedIn = true;
    }

    const addParkingReservation: GenericResponse = await axios.post('/api/parking/create', formData)
      .then((_result) => (({ success: true })))
      .catch((error) => (
        ({ success: false, error: error.response.data.error })
      ));
    return addParkingReservation;
  }

  public async getMyReservations(): Promise<MyReservation[]> {
    if (this.loggedIn) {
      this.loggedIn = true;
    }

    const myReservations = await axios.get('/api/reservations/mine')
      .then((result) => (result.data))
      .catch((error) => (error));
    return myReservations;
  }

  public async deleteMyReservation(id: number): Promise<boolean> {
    if (this.loggedIn) {
      this.loggedIn = true;
    }
    const deleteResult: boolean = await axios.delete(`/api/reservations/destroy/${id}`)
      .then((_result) => (true))
      .catch((_error) => (false));

    return deleteResult;
  }

  private async validateAuthKey(authKey: string): Promise<void> {
    const valid = await axios.post('/api/authentication/valid', { token: authKey }).then((result) => result.data);
    if (valid.valid) {
      this.loggedIn = valid;
      this.authKey = valid.authKey;
    } else {
      this.authKey = undefined;
    }
  }
}
export default UserManager;
