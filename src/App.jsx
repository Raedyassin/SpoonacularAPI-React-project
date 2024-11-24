import Cuisine from "./pages/Cuisine"
import Searched from "./pages/Searched"
import Recipe from "./pages/Recipe"
import Home from "./pages/Home"
import Mot from "./components/Mot"
import Error from "./components/Error"
import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion"
import NavUp from "./components/NavUp"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: Infinity,
        staleTime:Infinity,
      }
    }
});

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AnimationApp />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

function AnimationApp() {
  const location = useLocation();
  return (
    <AnimatePresence  mode="wait">
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<NavUp/>}>
        <Route path="home" element={<Home />} />
        <Route path="cuisine/:type" element={<Cuisine />} />   
        <Route path="searched/:search" element={ <Searched/> } />
        <Route path="recipe/:id" element={ <Recipe/> } />
        <Route path="mot" element={<Mot />} />
        </Route>
        <Route path="*" element={<Error/>} />
    </Routes>
    {/* <Pages /> */}
  </AnimatePresence>
  )
}


