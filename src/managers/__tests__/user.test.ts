import { UserManager } from "../user";
import { UserType } from "../../services/admin-api";
import * as esCookie from "es-cookie";
import axios from "axios";

// Mock dependencies
jest.mock("axios");
jest.mock("es-cookie");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockGetCookie = esCookie.get as jest.MockedFunction<typeof esCookie.get>;
const mockRemoveCookie = esCookie.remove as jest.MockedFunction<
  typeof esCookie.remove
>;

describe("UserManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCookie.mockReturnValue(undefined);
  });

  describe("Constructor", () => {
    test("initializes with logged out state when no token cookie", () => {
      const manager = new UserManager();

      expect(manager.loggedIn).toBe(false);
      expect(manager.isAdmin).toBe(false);
      expect(manager.isParkingAdmin).toBe(false);
      expect(manager.isVaccinated).toBe(false);
      expect(manager.userType).toBe(UserType.None);
      expect(manager.authKey).toBeUndefined();
    });
  });

  describe("login", () => {
    test("sends login request successfully", async () => {
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      const manager = new UserManager();
      const result = await manager.login("test@example.com");

      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/authentication/login",
        {
          email: "test@example.com",
        },
      );
      expect(result).toBe(true);
    });

    test("returns false for invalid email", async () => {
      mockedAxios.post.mockResolvedValue({ data: { error: "invalid_email" } });

      const manager = new UserManager();
      const result = await manager.login("invalid@example.com");

      expect(result).toBe(false);
    });
  });

  describe("logout", () => {
    test("logs out successfully and clears state", async () => {
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      const manager = new UserManager();
      manager.authKey = "test-token";
      manager.loggedIn = true;
      manager.isAdmin = true;

      const result = await manager.logout("test-token");

      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/api/authentication/logout",
        {
          token: "test-token",
        },
      );
      expect(mockRemoveCookie).toHaveBeenCalledWith("token");
      expect(manager.loggedIn).toBe(false);
      expect(manager.isAdmin).toBe(false);
      expect(manager.authKey).toBeUndefined();
      expect(result).toBe(true);
    });

    test("returns false when logout fails", async () => {
      mockedAxios.post.mockResolvedValue({ data: { success: false } });

      const manager = new UserManager();
      const result = await manager.logout("test-token");

      expect(result).toBe(false);
    });
  });

  describe("userType property", () => {
    test("userType is initially None", () => {
      const manager = new UserManager();
      expect(manager.userType).toBe(UserType.None);
    });
  });
});
