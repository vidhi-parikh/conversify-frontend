import './App.css';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import ChatPage from './Pages/Chatpage';
import HomePage from './Pages/Homepage';
import ChatProvider from './Context/ChatProvider';

function App() {
  return (
    <div className='App'>  
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<ChatProvider><HomePage /></ChatProvider>} />
          <Route path="/chat" element={<ChatProvider><ChatPage /></ChatProvider>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
