import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';

const SavedInvoices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Saved Invoices</h2>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Save Current Invoice
          </button>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved invoices yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first invoice to get started
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Create Your First Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedInvoices; 