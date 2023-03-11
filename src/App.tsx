import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import RoutesRenderer from "./routes/RoutesRenderer";

const App = () => {
  const queryClient = new QueryClient()
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <RoutesRenderer />
         </BrowserRouter>
         <ReactQueryDevtools />
      </QueryClientProvider>
   );
};

export default App;
