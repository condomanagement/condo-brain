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
     * Start passkey registration process (cookie-based auth)
     * Returns the WebAuthn options needed for credential creation
     */
    getRegistrationOptions(): Promise<PasskeyRegistrationOptions>;
    /**
     * Complete passkey registration (cookie-based auth)
     * Creates a new passkey for the user
     */
    register(nickname?: string): Promise<PasskeyRegistrationResponse>;
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
     * List all passkeys for the current user (cookie-based auth)
     */
    list(): Promise<PasskeyCredential[]>;
    /**
     * Delete a passkey (cookie-based auth)
     */
    delete(credentialId: number): Promise<boolean>;
    /**
     * Update passkey nickname (cookie-based auth)
     */
    updateNickname(credentialId: number, nickname: string): Promise<boolean>;
    /**
     * @deprecated Use list() instead
     */
    listCredentials(token: string): Promise<PasskeyCredential[]>;
    /**
     * @deprecated Use delete() instead
     */
    deleteCredential(token: string, credentialId: number): Promise<boolean>;
}
export default PasskeyManager;
//# sourceMappingURL=passkey.d.ts.map