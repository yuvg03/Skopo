import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import SavedInvoices from './components/SavedInvoices';
import AIInvoiceBuilder from './components/AIInvoiceBuilder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<InvoiceForm />} />
            <Route path="/ai-builder" element={<AIInvoiceBuilder />} />
            <Route path="/preview" element={<InvoicePreview />} />
            <Route path="/saved" element={<SavedInvoices />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
