import { UserManager } from "../user";
import { UserType } from "../../services/admin-api";
import { get as getCookie, set as setCookie, remove as removeCookie } from "es-cookie";

// Mock dependencies
jest.mock("axios");
jest.mock("es-cookie");

const mockGetCookie = getCookie as jest.MockedFunction<typeof getCookie>;
const mockSetCookie = setCookie as jest.MockedFunction<typeof setCookie>;
const mockRemoveCookie = removeCookie as jest.MockedFunction<typeof removeCookie>;

describe("UserManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCookie.mockReturnValue(undefined);
  });

  describe("Constructor", () => {
    test("initializes with logged out state", () => {
      const manager = new UserManager();
      
      expect(manager.loggedIn).toBe(false);
      expect(manager.isAdmin).toBe(false);
      expect(manager.isParkingAdmin).toBe(false);
      expect(manager.isVaccinated).toBe(false);
      expect(manager.userType).toBe(UserType.None);
    });

    test("loads user data from cookies if token exists", () => {
      mockGetCookie.mockImplementation((key: string) => {
        const cookies: Record<string, string> = {
          "token": "test-token",
          "md5-email": "test-md5",
          "fullname": "Test User",
          "unit": "101",
          "email": "test@example.com",
          "is-admin": "true",
          "phone": "555-1234",
        };
        return cookies[key];
      });

      const manager = new UserManager();

      expect(manager.loggedIn).toBe(true);
      expect(manager.authKey).toBe("test-token");
      expect(manager.md5Email).toBe("test-md5");
      expect(manager.fullname).toBe("Test User");
      expect(manager.unit).toBe(101);
      expect(manager.email).toBe("test@example.com");
      expect(manager.isAdmin).toBe(true);
      expect(manager.phone).toBe("555-1234");
    });
  });

  describe("logout", () => {
    test("clears all cookies and resets state", async () => {
      mockGetCookie.mockReturnValue("test-token");
      const manager = new UserManager();
      manager.authKey = "test-token";
      
      // Mock axios post response
      const axios = require("axios");
      axios.post = jest.fn().mockResolvedValue({ data: { success: true } });

      await manager.logout("test-token");

      expect(mockRemoveCookie).toHaveBeenCalledWith("token");
      expect(manager.loggedIn).toBe(false);
      expect(manager.isAdmin).toBe(false);
      expect(manager.authKey).toBeUndefined();
    });
  });

  describe("userType property", () => {
    test("userType is set correctly based on admin status", () => {
      const manager = new UserManager();
      
      // Initially should be None
      expect(manager.userType).toBe(UserType.None);
    });
  });
});
