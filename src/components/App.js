import React from 'react'
import Login from './Login'
import { Routes,  Route, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard';
import TransactionReport from './TransactionReport';
import TransactionList from './TransactionList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/transaction-report" element={<TransactionReport />} />
        <Route path="/transaction-list" element={<TransactionList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
