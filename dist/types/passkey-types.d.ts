export interface PasskeyCredential {
    id: number;
    nickname: string;
    created_at: string;
    last_used_at?: string;
    credential_type: string;
}
export interface PasskeyRegistrationOptions {
    publicKey: {
        challenge: string;
        rp: {
            name: string;
            id?: string;
        };
        user: {
            id: string;
            name: string;
            displayName: string;
        };
        pubKeyCredParams: Array<{
            type: string;
            alg: number;
        }>;
        timeout?: number;
        excludeCredentials?: Array<{
            id: string;
            type: string;
        }>;
        authenticatorSelection?: {
            authenticatorAttachment?: "platform" | "cross-platform";
            residentKey?: "discouraged" | "preferred" | "required";
            userVerification?: "discouraged" | "preferred" | "required";
        };
    };
}
export interface PasskeyAuthenticationOptions {
    publicKey: {
        challenge: string;
        timeout?: number;
        rpId?: string;
        allowCredentials?: Array<{
            id: string;
            type: string;
        }>;
        userVerification?: "discouraged" | "preferred" | "required";
    };
    passkeys_available: boolean;
}
export interface PasskeyAvailabilityResponse {
    passkeys_available: boolean;
    passkey_count?: number;
}
export interface PasskeyRegistrationResponse {
    success: boolean;
    credential?: PasskeyCredential;
    error?: string;
}
export interface PasskeyAuthenticationResponse {
    success: boolean;
    token?: string;
    user?: {
        active: boolean;
        admin: boolean;
        email: string;
        id: number;
        name: string;
        parkingAdmin: boolean;
        phone: string;
        unit: number;
        type: string;
        vaccinated: boolean;
    };
    error?: string;
}
export interface PasskeyListResponse {
    credentials: PasskeyCredential[];
}
//# sourceMappingURL=passkey-types.d.ts.map