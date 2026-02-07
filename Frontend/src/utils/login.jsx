import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/createPageURL'
import LoginForm from '../pages/LoginForm';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (data) => {

    if (data.token) {
       navigate('/publish-blog', { replace: true });
    } else {
      navigate(createPageUrl("Home")); // default
    }
    // navigate(createPageUrl('Login'));
  };

  const handleSwitchToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
      <LoginForm 
        onSuccess={handleLoginSuccess}
        onSwitchToRegister={handleSwitchToRegister}
      />
    </div>
  );
}