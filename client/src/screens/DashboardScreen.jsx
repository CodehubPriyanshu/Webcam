import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AuthModal from '../components/ui/Auth/AuthModal';
import MainContent from '../components/ui/Dashboard/MainContent';
import SideBar from '../components/ui/Dashboard/SideBar';

import { listCaptures } from '../redux/thunks/captureThunks';
import { listUsers } from '../redux/thunks/userThunks';

function DashboardScreen() {
  const menuItems = [
    {
      name: 'Home',
      icon: 'fas fa-home',
    },
    {
      name: 'Users',
      icon: 'fas fa-users',
    },
    {
      name: 'Captures',
      icon: 'fas fa-camera',
    },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState('Home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const [collapsible, setCollapsible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (!userInfo) {
      setIsAuthModalOpen(true);
    } else {
      setIsAuthModalOpen(false);
      if (!userInfo.isAdmin) {
        navigate('/');
      }
      dispatch(listUsers({}));
      dispatch(listCaptures({}));
    }
  }, [navigate, dispatch, userInfo]);

  const toggleSidebar = () => {
    setCollapsible((prevState) => !prevState);
  };

  const handleMenuItemClick = (name) => {
    setActiveMenuItem(name);
    toggleSidebar();
  };

  return (
    <section className="min-h-screen flex flex-row items-center justify-center bg-indigo-600 text-white">
      {!userInfo ? (
        <AuthModal
          onClose={() => {
            setIsAuthModalOpen(false);
            navigate('/');
          }}
        />
      ) : (
        <>
          {collapsible && (
            <SideBar
              menuItems={menuItems}
              handleMenuItemClick={handleMenuItemClick}
              activeMenuItem={activeMenuItem}
              collapsible={collapsible}
            />
          )}

          <MainContent
            menuItems={menuItems}
            activeMenuItem={activeMenuItem}
            collapsible={collapsible}
            onToggleSidebar={toggleSidebar}
          />
        </>
      )}
    </section>
  );
}

export default DashboardScreen;
