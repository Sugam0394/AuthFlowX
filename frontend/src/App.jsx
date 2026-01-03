 import  {Route , Routes} from 'react-router-dom'

 import Home from './pages/Home/Home'
 import Register from './pages/Register/Register'
  import Login from './pages/Login/Login'  
// import Dashboard from './pages/Dashboard/Dashboard'
 import ProtectedRoute from './routes/ProtectedRoute'
 import AppLayout from './layout/AppLayout'
 import Profile from './pages/Profile/Profile'





 import AdminProtectedRoute from './routes/AdminProtectedRoute'
 import Adminlogin from './pages/Login/Adminlogin'
 


 import AdminLayout from './layout/AdminLayout.jsx'
  import Tools from './pages/tools/Tools.jsx'
 import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx'
 import Reviews from './pages/Reviews/Reviews.jsx'
// import ToolDetails from './pages/tools/ToolDetails.jsx'
 import HomeLayout from './layout/HomeLayout.jsx'
 import FieldSelection from './pages/FieldSelection/FieldSelection.jsx'
 import UserDashboard from './pages/userDashboard/UserDashboard.jsx'
 import Saved from './pages/saved/Saved.jsx'
 import Explore from './pages/explore/Explore.jsx'
 


 function App() {
  return (
    <Routes>


      {/* Public routes */}
      <Route element={<HomeLayout />}>  
      <Route  path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
       </Route>


      <Route path="/select-field" element={<FieldSelection />} />

    



    

      {/* User protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/explore" element={<Explore />} />
              <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
         
        </Route>
      </Route>

      {/* Admin public */}
      <Route path="/admin/login" element={<Adminlogin />} />

      {/* Admin protected */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="tools" element={<Tools />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

 
 

 
 
