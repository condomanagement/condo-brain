import axios from 'axios';
import {
  get as getCookie,
  remove as removeCookie,
  set as setCookie,
} from 'es-cookie';
import {
  Amenity,
  GenericResponse,
  Question,
  ReservationTime,
  UserApi,
} from '../services/user-api';

export class UserManager implements UserApi {
  public loggedIn: boolean;

  public isAdmin: boolean;

  public authKey: string | undefined;

  constructor() {
    this.loggedIn = false;
    this.isAdmin = false;
    if (getCookie('token')) {
      this.authKey = getCookie('token');
      if (this.authKey) {
        this.validateAuthKey(this.authKey);
      }
    } else {
      this.authKey = undefined;
    }
  }

  public async login(email: string): Promise<void> {
    const loginEmail = await axios.post('/api/authentication/login', { email }).then((result) => result.data);
    this.authKey = undefined;
    this.loggedIn = false;
    return loginEmail;
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
          setCookie('token', this.authKey, { expires: 10 });
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
        this.isAdmin = result.data.user.admin;
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
    const findReservation = await axios.post('/api/reservations/find_reservations', {
      date,
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
