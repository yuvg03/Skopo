import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { InvoiceFormData } from '../types/invoice';

const AIInvoiceBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<InvoiceFormData | null>(null);

  const generateInvoice = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response
      const mockResponse: InvoiceFormData = {
        invoiceNumber: `INV-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        clientName: 'John Doe',
        clientEmail: 'john.doe@example.com',
        businessName: 'Your Business',
        businessAddress: '123 Business St\nCity, State 12345',
        items: [
          {
            id: '1',
            description: 'Web Development Services',
            quantity: 10,
            rate: 100,
            amount: 1000,
          },
        ],
        tax: 10,
        discount: 0,
        notes: 'Payment due within 30 days',
      };

      setGeneratedData(mockResponse);
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error generating invoice. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const useGeneratedData = () => {
    if (generatedData) {
      localStorage.setItem('currentInvoice', JSON.stringify({
        ...generatedData,
        subtotal: generatedData.items.reduce((sum, item) => sum + item.amount, 0),
        total: generatedData.items.reduce((sum, item) => sum + item.amount, 0) * (1 + generatedData.tax / 100) * (1 - generatedData.discount / 100),
      }));
      navigate('/');
    }
  };

  const examples = [
    "Create invoice for 5 hours of web development at $100/hr for John Doe",
    "Invoice for 3 logo designs at $150 each for ABC Company",
    "Bill for 20 hours of consulting at $75/hr with 10% tax",
    "Invoice for website maintenance - 8 hours at $50/hr for TechCorp",
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">AI Invoice Builder</h2>
          <p className="text-gray-600 text-lg">
            Describe your invoice in natural language and let AI generate it for you
          </p>
        </div>

        <div className="space-y-8">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Describe your invoice
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="input-field"
              rows={4}
              placeholder="e.g., Create invoice for 10 hours of web development at $100/hr for John Doe with 10% tax"
            />
          </div>

          {/* Example Prompts */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Example prompts:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-left p-4 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={generateInvoice}
              disabled={!prompt.trim() || isGenerating}
              className="btn-primary flex items-center px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Generate Invoice
                </>
              )}
            </button>
          </div>

          {/* Generated Data Preview */}
          {generatedData && (
            <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                Generated Invoice Preview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium text-gray-700 mb-1">Client</p>
                  <p className="text-gray-900 font-semibold">{generatedData.clientName}</p>
                  <p className="text-gray-600">{generatedData.clientEmail}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium text-gray-700 mb-1">Invoice Details</p>
                  <p className="text-gray-900 font-semibold">#{generatedData.invoiceNumber}</p>
                  <p className="text-gray-600">Due: {new Date(generatedData.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Items:</p>
                <div className="space-y-2">
                  {generatedData.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm bg-white p-3 rounded border">
                      <span className="text-gray-900">{item.description}</span>
                      <span className="text-gray-600">
                        {item.quantity} × ${item.rate} = ${item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">
                    Tax: {generatedData.tax}% | Discount: {generatedData.discount}%
                  </p>
                </div>
                <button
                  onClick={useGeneratedData}
                  className="btn-primary flex items-center"
                >
                  Use This Data
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInvoiceBuilder; 