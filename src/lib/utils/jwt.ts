export type JwtPayload = {
  user_id: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
};

export function parseJwt<T = JwtPayload>(token: string): T | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as T;
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}
