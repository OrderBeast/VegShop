import { Routes, Route  } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider} from "./context/ShoppingCartContext"
import { Login } from "./pages/LogIn"
import { Register } from "./pages/Register"
import { MyOrders } from "./pages/MyOrders"
import { Admin } from "./pages/AdminControl"
import ProtectedRoutes from "./components/ProtectedRoute"


function App() 
{
  return(
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path = "/" element= {<Store />} />
          <Route path = "/About" element= {<About />} />
          <Route path = "/LogIn" element= {<Login />} />
          <Route path = "/Register" element= {<Register />} />
          <Route path = "/MyOrders" element= {<MyOrders />} /> 
          
          <Route element={<ProtectedRoutes />}>
          <Route path = "/Admin" element= {<Admin/>} />
         </Route>
      

        </Routes>
      </Container>  
    </ShoppingCartProvider>
  )
}

export default App
