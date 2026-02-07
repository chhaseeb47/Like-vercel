import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import MainForm from './components/MainForm';
import VideoLinkModal from './components/VideoLinkModal';
import ScrollingBanner from './components/ScrollingBanner';

function App() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    service: ''
  });

  const handleFormSubmit = (data: { email: string; password: string; service: string }) => {
    setFormData(data);
    setShowVideoModal(true);
  };

  const handleWhatsAppClick = () => {
    window.open('https://whatsapp.com/channel/0029VaxTIEH1CYoSV4sZmq37', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ScrollingBanner />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-6">
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle size={24} />
            <span className="font-semibold">Join Our Channel</span>
          </button>
        </div>

        <MainForm onSubmit={handleFormSubmit} />
      </div>

      {showVideoModal && (
        <VideoLinkModal
          formData={formData}
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </div>
  );
}

export default App;
