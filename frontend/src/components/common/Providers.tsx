import { store } from "@/common/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          panelPosition="right"
        />
      </QueryClientProvider>
    </Provider>
  );
};

export { Providers };
