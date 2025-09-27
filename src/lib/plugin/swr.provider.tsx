import { SWRConfig } from 'swr';
import {apiClient} from "./api-client.tsx";

export const SwrProvider = ({ children }: any) => {
  return (
    <SWRConfig
      value={{
        fetcher: apiClient.getFetcher(),
      }}
    >
      {children}
    </SWRConfig>
  );
};
