import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state/authState';
import { api } from '../utils/api';

export const AuthInitializer = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');

      if (!token || !username || !role) {
        setUser({ username: null, role: null, isLoading: false });
        return;
      }

      try {
        const response = await api.get('/verify-token');
        const { username: verifiedUsername, role: verifiedRole } = response.data;
        
        // Update the user state with verified data
        setUser({ 
          username: verifiedUsername, 
          role: verifiedRole, 
          isLoading: false 
        });
        
        // Update localStorage with verified data
        localStorage.setItem('username', verifiedUsername);
        localStorage.setItem('role', verifiedRole);
      } catch (err) {
        console.error('Token verification failed:', err);
        // Clear auth data
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUser({ username: null, role: null, isLoading: false });
      }
    };

    initializeAuth();
  }, [setUser]);

  return null;
}; 