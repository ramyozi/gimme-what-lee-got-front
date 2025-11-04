import type {User} from "../../types";


export function getUserDisplayName(user?: User) {
    if (!user) return undefined;

    if (user.first_name || user.last_name) {
        return `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
    } else {
        return user.username;
    }
}
