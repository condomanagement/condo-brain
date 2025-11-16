import { PasskeyCredential, PasskeyRegistrationOptions, PasskeyAuthenticationOptions, PasskeyAvailabilityResponse, PasskeyRegistrationResponse, PasskeyAuthenticationResponse } from "../types/passkey-types";
export declare class PasskeyManager {
    /**
     * Check if passkeys are supported in the current browser
     */
    static isSupported(): boolean;
    /**
     * Check if a user has passkeys available for their email
     */
    checkAvailability(email: string): Promise<PasskeyAvailabilityResponse>;
    /**
     * Start passkey registration process
     * Returns the WebAuthn options needed for credential creation
     */
    getRegistrationOptions(email: string): Promise<PasskeyRegistrationOptions>;
    /**
     * Complete passkey registration
     * Creates a new passkey for the user
     */
    register(token: string, nickname?: string): Promise<PasskeyRegistrationResponse>;
    /**
     * Start passkey authentication process
     * Returns the WebAuthn options needed for authentication
     */
    getAuthenticationOptions(email: string): Promise<PasskeyAuthenticationOptions>;
    /**
     * Complete passkey authentication
     * Authenticates the user with their passkey
     */
    authenticate(email: string): Promise<PasskeyAuthenticationResponse>;
    /**
     * List all passkeys for the current user
     */
    listCredentials(token: string): Promise<PasskeyCredential[]>;
    /**
     * Delete a passkey
     */
    deleteCredential(token: string, credentialId: number): Promise<boolean>;
    /**
     * Update passkey nickname
     */
    updateNickname(token: string, credentialId: number, nickname: string): Promise<boolean>;
}
export default PasskeyManager;
//# sourceMappingURL=passkey.d.ts.map