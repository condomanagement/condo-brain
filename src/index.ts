export * from "./managers/parking";
export * from "./managers/admin-api";
export * from "./services/admin-api";
export * from "./managers/user";
export * from "./services/user-api";
export * from "./managers/passkey";
export * from "./types/passkey-types";

// Export version info
import packageJson from "../package.json";
export const VERSION = packageJson.version;

