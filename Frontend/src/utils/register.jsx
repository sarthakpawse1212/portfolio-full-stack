import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/createPageURL'
import RegisterForm from '../pages/RegisterForm';

export default function Register() {
  const navigate = useNavigate();

  const handleRegisterSuccess = (data) => {

    if (data) {
       navigate('/login'); // ✅ Go back to publish page
    } else {
      navigate(createPageUrl("Home")); // default
    }
    // navigate(createPageUrl('Login'));
  };

  const handleSwitchToLogin = () => {
    navigate(createPageUrl('Login'));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
      <RegisterForm 
        onSuccess={handleRegisterSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
}