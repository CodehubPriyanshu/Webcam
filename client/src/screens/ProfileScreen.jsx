import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AuthModal from '../components/ui/Auth/AuthModal';
import ImageGalleryCard from '../components/ui/Profile/ImageGalleryCard';
import ProfileCard from '../components/ui/Profile/ProfileCard';

function ProfileScreen() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  return (
    <section className="bg-indigo-500 flex flex-col sm:flex-row justify-center items-center min-h-screen py-4 px-16">
      {userInfo ? (
        <>
          <ProfileCard />
          <ImageGalleryCard />
        </>
      ) : (
        <AuthModal
          onClose={() => {
            setIsAuthModalOpen(false);
            navigate('/');
          }}
        />
      )}
    </section>
  );
}

export default ProfileScreen;
