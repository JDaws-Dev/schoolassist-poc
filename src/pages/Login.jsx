import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const PARENT_PASSWORD = 'artios2026';

export default function Login() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));

    if (password === PARENT_PASSWORD) {
      sessionStorage.setItem('parentLoggedIn', 'true');
      navigate('/');
    } else {
      setError('Incorrect password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-2xl" />
        <div className="absolute top-1/4 -left-16 w-64 h-64 bg-indigo-400/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-8 w-48 h-48 bg-white/5 rounded-full blur-lg" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo/Header - Enhanced branding area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-5 ring-4 ring-white/20 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/Artios Logo.png"
              alt="Artios"
              className="w-14 h-14 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Artios Connect</h1>
          <p className="text-blue-200 mt-2 text-lg font-medium">Parent Portal</p>
        </div>

        {/* Login Form - Enhanced card styling */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 ring-1 ring-white/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 group-focus-within:text-blue-500">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter parent password"
                  className="w-full pl-11 pr-11 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white
                    hover:border-gray-300 hover:bg-white
                    transition-all duration-200 text-gray-900 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600
                    p-1 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700
                hover:from-blue-700 hover:to-blue-800
                active:from-blue-800 active:to-blue-900 active:scale-[0.98]
                text-white font-semibold rounded-xl
                transition-all duration-200
                shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:active:scale-100
                focus:outline-none focus:ring-4 focus:ring-blue-500/30
                flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Password provided by Artios Academies
          </p>
        </div>

        {/* Footer - Enhanced styling */}
        <p className="mt-8 text-center text-sm text-blue-200/80 font-medium">
          Artios Academies of Sugar Hill
        </p>
      </div>
    </div>
  );
}
