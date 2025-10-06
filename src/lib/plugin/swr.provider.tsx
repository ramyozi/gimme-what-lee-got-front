import { SWRConfig } from 'swr';
import {apiClient} from "./api-client.tsx";

export const SwrProvider = ({ children }: any) => {
  return (
    <SWRConfig
      value={{
              fetcher: apiClient.getFetcher(),
              revalidateOnFocus: false,
              keepPreviousData: true,
              dedupingInterval: 10000,
        }}
    >
      {children}
    </SWRConfig>
  );
};
