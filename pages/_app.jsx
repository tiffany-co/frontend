import "../styles/globals.css";
import "../styles/grid.css";
import "../styles/normalize.css";
import "../public/fonts/typo.css";
import "../public/fontawesome-5/css/all.css";
import { AuthProvider } from "@/context/auth/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: false,
    },
  },
});
export default function App({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
