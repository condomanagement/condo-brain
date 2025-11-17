import axios from "axios";
import {
  create,
  get,
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
} from "@github/webauthn-json";
import {
  PasskeyCredential,
  PasskeyRegistrationOptions,
  PasskeyAuthenticationOptions,
  PasskeyAvailabilityResponse,
  PasskeyRegistrationResponse,
  PasskeyAuthenticationResponse,
  PasskeyListResponse,
} from "../types/passkey-types";

export class PasskeyManager {
  /**
   * Check if passkeys are supported in the current browser
   */
  public static isSupported(): boolean {
    return (
      window.PublicKeyCredential !== undefined &&
      typeof window.PublicKeyCredential === "function"
    );
  }

  /**
   * Check if a user has passkeys available for their email
   */
  public async checkAvailability(
    email: string,
  ): Promise<PasskeyAvailabilityResponse> {
    const response = await axios.get<PasskeyAvailabilityResponse>(
      "/api/webauthn/check_availability",
      {
        params: { email },
      },
    );
    return response.data;
  }

  /**
   * Start passkey registration process (cookie-based auth)
   * Returns the WebAuthn options needed for credential creation
   */
  public async getRegistrationOptions(): Promise<PasskeyRegistrationOptions> {
    const response = await axios.get<PasskeyRegistrationOptions>(
      "/api/webauthn/registration_options",
    );
    return response.data;
  }

  /**
   * Complete passkey registration (cookie-based auth)
   * Creates a new passkey for the user
   */
  public async register(nickname?: string): Promise<PasskeyRegistrationResponse> {
    try {
      // Get registration options from server
      const options = await this.getRegistrationOptions();

      // Create the credential using WebAuthn
      const credential = await create(options as CredentialCreationOptionsJSON);

      // Register the credential with the server
      const response = await axios.post<PasskeyRegistrationResponse>(
        "/api/webauthn/register",
        {
          credential,
          nickname,
        },
      );

      return response.data;
    } catch (_error) {
      if (axios.isAxiosError(_error)) {
        return {
          success: false,
          error:
            (_error.response?.data as { error?: string })?.error ||
            "Registration failed",
        };
      }
      return {
        success: false,
        error: "Unknown registration error",
      };
    }
  }

  /**
   * Start passkey authentication process
   * Returns the WebAuthn options needed for authentication
   */
  public async getAuthenticationOptions(
    email: string,
  ): Promise<PasskeyAuthenticationOptions> {
    const response = await axios.get<PasskeyAuthenticationOptions>(
      "/api/webauthn/authentication_options",
      {
        params: { email },
      },
    );
    return response.data;
  }

  /**
   * Complete passkey authentication
   * Authenticates the user with their passkey
   */
  public async authenticate(
    email: string,
  ): Promise<PasskeyAuthenticationResponse> {
    try {
      // Get authentication options from server
      const options = await this.getAuthenticationOptions(email);

      if (!options.passkeys_available) {
        return {
          success: false,
          error: "No passkeys available for this user",
        };
      }

      // Get the credential from the authenticator
      const credential = await get(options as CredentialRequestOptionsJSON);

      // Send credential to server for verification
      const response = await axios.post<PasskeyAuthenticationResponse>(
        "/api/webauthn/authenticate",
        {
          credential,
        },
      );

      return response.data;
    } catch (_error) {
      if (axios.isAxiosError(_error)) {
        return {
          success: false,
          error:
            (_error.response?.data as { error?: string })?.error ||
            "Authentication failed",
        };
      }
      return {
        success: false,
        error: "Unknown authentication error",
      };
    }
  }

  /**
   * List all passkeys for the current user (cookie-based auth)
   */
  public async list(): Promise<PasskeyCredential[]> {
    const response = await axios.get<PasskeyListResponse>(
      "/api/webauthn/credentials",
    );
    return response.data.credentials;
  }

  /**
   * Delete a passkey (cookie-based auth)
   */
  public async delete(credentialId: number): Promise<boolean> {
    await axios.delete(`/api/webauthn/credentials/${credentialId}`);
    return true;
  }

  /**
   * Update passkey nickname (cookie-based auth)
   */
  public async updateNickname(
    credentialId: number,
    nickname: string,
  ): Promise<boolean> {
    await axios.patch(`/api/webauthn/credentials/${credentialId}`, {
      nickname,
    });
    return true;
  }

  // Deprecated methods (for backward compatibility)
  
  /**
   * @deprecated Use list() instead
   */
  public async listCredentials(token: string): Promise<PasskeyCredential[]> {
    return this.list();
  }

  /**
   * @deprecated Use delete() instead
   */
  public async deleteCredential(
    token: string,
    credentialId: number,
  ): Promise<boolean> {
    return this.delete(credentialId);
  }
}

export default PasskeyManager;
