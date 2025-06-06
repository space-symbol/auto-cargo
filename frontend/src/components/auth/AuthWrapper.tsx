import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useToast } from '@/components/ui/use-toast';

const SAVED_FORM_DATA_KEY = 'cargo_request_form_data';

export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(SAVED_FORM_DATA_KEY);
      if (savedData) {
        toast({
          title: 'Данные формы восстановлены',
          description: 'Вы можете продолжить оформление заявки',
        });
        navigate('/cargo/new');
      }
    }
  }, [navigate, toast, user]);

  return <>{children}</>;
}; 