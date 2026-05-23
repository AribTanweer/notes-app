import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Archive } from './pages/Archive';
import { Important } from './pages/Important';
import { Trash } from './pages/Trash';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }} 
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/archive' element={<Archive />} />
        <Route path='/important' element={<Important />} />
        <Route path='/bin' element={<Trash />} />
      </Routes>
    </>
  );
}

export default App;
