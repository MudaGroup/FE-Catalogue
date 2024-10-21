import { Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { Navbar } from './component/navbar';
import { Home, Profile, ProductPage } from './pages';
import Footer from './component/footer';
import Admin from './component/admin/Admin';
import Login from './component/admin/login';
import ProtectedRoute from './component/admin/ProtectedRoute';

function App() {
  const location = useLocation(); // Mendapatkan lokasi saat ini

  // Menentukan apakah navbar dan footer harus disembunyikan
  const hideNavbarAndFooter = ['/login', '/admin'].includes(location.pathname);

  return (
    <div className='App'>
      {!hideNavbarAndFooter && <Navbar />} {/* Hanya tampilkan Navbar jika bukan di login atau admin */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ProductPage' element={<ProductPage />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        {/* Halaman admin dilindungi oleh ProtectedRoute */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!hideNavbarAndFooter && <Footer />} {/* Hanya tampilkan Footer jika bukan di login atau admin */}
    </div>
  );
}

export default App;
