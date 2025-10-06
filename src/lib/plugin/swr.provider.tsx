import { SWRConfig } from "swr";
import type {ReactNode} from "react";
import {swrFetcher} from "./auth-provider/api-client.tsx";

// Fournit le fetcher global à toutes les requêtes SWR
export function SwrProvider({ children }: { children: ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher: swrFetcher,
                revalidateOnFocus: false,
                shouldRetryOnError: false,
                keepPreviousData: true,
            }}
        >
            {children}
        </SWRConfig>
    );
}
