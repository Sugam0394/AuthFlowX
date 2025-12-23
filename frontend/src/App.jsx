 import  {Route , Routes} from 'react-router-dom'

 


 

 

 import Home from './pages/Home/Home'
 import Register from './pages/Register/Register'
  import Login from './pages/Login/Login'  
 import Dashboard from './pages/Dashboard/Dashboard'
 import ProtectedRoute from './routes/ProtectedRoute'
 import AppLayout from './layout/AppLayout'
 import Profile from './pages/Profile/Profile'

 import AdminProtectedRoute from './routes/AdminProtectedRoute'
 
 import Adminlogin from './pages/Login/Adminlogin'
 import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx'
 




function App() {

   


  return (


    
       <Routes>

       {/* Public routes */}

       <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />  
      <Route path="/register" element={<Register />} />

      
      {/* Protected routes */}

     <Route element={<ProtectedRoute />}>
     <Route element={<AppLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
  </Route>


        {/* Admin routes */}
        
       <Route path="/admin/login" element={<Adminlogin />} />
       


       <Route
  path="/admin/dashboard"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>


 
 
       </Routes>
  )
}

export default App

 
