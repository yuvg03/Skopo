import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Mail } from 'lucide-react';

const InvoicePreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </button>
          <div className="flex space-x-4">
            <button className="btn-secondary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
            <button className="btn-primary flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </button>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invoice Preview</h2>
          <p className="text-gray-600 mb-6">
            This is where your generated invoice will be displayed
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">Invoice content will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview; 