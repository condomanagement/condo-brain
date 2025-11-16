import { AdminManager } from "../admin-api";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AdminManager", () => {
  let manager: AdminManager;

  beforeEach(() => {
    manager = new AdminManager();
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    test("fetches users successfully", async () => {
      const mockUsers = [
        { id: 1, email: "user1@example.com", fullname: "User One" },
        { id: 2, email: "user2@example.com", fullname: "User Two" },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockUsers });

      const result = await manager.getUsers();

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/users");
      expect(result).toEqual(mockUsers);
    });
  });

  describe("getQuestions", () => {
    test("fetches questions successfully", async () => {
      const mockQuestions = [
        { id: 1, question: "What is your favorite color?", required_answer: "Blue" },
        { id: 2, question: "What is your pet's name?", required_answer: "Fluffy" },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockQuestions });

      const result = await manager.getQuestions();

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/questions");
      expect(result).toEqual(mockQuestions);
    });
  });

  describe("getReservations", () => {
    test("fetches reservations successfully", async () => {
      const mockReservations = [
        { id: 1, amenity: "Pool", date: "2024-01-15" },
        { id: 2, amenity: "Gym", date: "2024-01-16" },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockReservations });

      const result = await manager.getReservations();

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/reservations");
      expect(result).toEqual(mockReservations);
    });
  });

  describe("getAmenities", () => {
    test("fetches amenities successfully", async () => {
      const mockAmenities = [
        { id: 1, name: "Pool", visible: true },
        { id: 2, name: "Gym", visible: true },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockAmenities });

      const result = await manager.getAmenities();

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/resources");
      expect(result).toEqual(mockAmenities);
    });
  });

  describe("getParkingRegistrations", () => {
    test("fetches future parking registrations successfully", async () => {
      const mockRegistrations = [
        { id: 1, license_plate: "ABC123", start_date: "2024-01-01" },
        { id: 2, license_plate: "XYZ789", start_date: "2024-01-02" },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockRegistrations });

      const result = await manager.getParkingRegistrations("future");

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/parking/future");
      expect(result).toEqual(mockRegistrations);
    });

    test("fetches current parking registrations successfully", async () => {
      const mockRegistrations = [
        { id: 3, license_plate: "DEF456", start_date: "2024-01-01" },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockRegistrations });

      const result = await manager.getParkingRegistrations("current");

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/parking/current");
      expect(result).toEqual(mockRegistrations);
    });
  });

  describe("getElevatorBookings", () => {
    test("fetches elevator bookings successfully", async () => {
      const mockBookings = [
        { id: 1, date: "2024-01-15", time_slot: "morning" },
        { id: 2, date: "2024-01-16", time_slot: "afternoon" },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockBookings });

      const result = await manager.getElevatorBookings();

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/elevator_bookings");
      expect(result).toEqual(mockBookings);
    });
  });
});
