import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../ui/Button';
import AuthModal from '../ui/Auth/AuthModal';

import { logout } from '../../redux/slices/userSlice';

import { listCapturesByUserId } from '../../redux/thunks/captureThunks';
import { detailsUser } from '../../redux/thunks/userThunks';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const capture = useSelector((state) => state.capture);
  const { captureListByUserId } = capture;

  let latestImage = '';
  if (captureListByUserId && captureListByUserId.length > 0) {
    latestImage = captureListByUserId[captureListByUserId.length - 1];
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(listCapturesByUserId({}));
    }
  }, [dispatch, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    setIsOpen(!isOpen);
  };

  return (
    <>
      <aside
        className={`fixed top-0 right-0 flex flex-col justify-between items-center h-full w-40 bg-gray-700 text-gray-200 p-4 transition-all duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <Link
            to="/"
            className="flex items-center text-2xl font-bold mb-6"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h1>
              Camify <span className="text-sm text-gray-400">v1.0</span>
            </h1>
          </Link>
        </div>

        {userInfo && (
          <div className="flex items-center mb-6">
            <img
              src={userInfo.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="text-xl font-semibold">{userInfo.name}</p>
          </div>
        )}

        <div className="flex flex-col w-full text-center">
          {userInfo ? (
            <>
              <Link
                to="/"
                className="rounded-sm p-1 bg-gray-600 border-2 border-transparent hover:bg-gray-800 hover:border-gray-500 m-1"
                onClick={() => setIsOpen(!isOpen)}
              >
                New Click
              </Link>
              <Link
                to="/profile"
                className="rounded-sm p-1 bg-gray-600 border-2 border-transparent hover:bg-gray-800 hover:border-gray-500 m-1"
                onClick={() => {
                  setIsOpen(!isOpen);
                  dispatch(detailsUser({}));
                  dispatch(listCapturesByUserId({}));
                }}
              >
                Profile
              </Link>

              {userInfo?.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="rounded-sm p-1 bg-gray-600 border-2 border-transparent hover:bg-gray-800 hover:border-gray-500 m-1"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Dashboard
                </Link>
              )}
              <Button
                className="bg-gray-900 border-2 border-transparent hover:bg-gray-800 hover:border-gray-500 m-1 rounded-md"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              className="rounded-md block mb-6"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Login / Register
            </Button>
          )}
        </div>

        {userInfo && (
          <Link
            to="/gallery"
            className="block mb-6 rounded-md p-1 border-2 border-transparent hover:border-gray-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {latestImage ? (
              <img
                src={latestImage.imageUrl}
                alt="Latest Capture"
                className="w-24 h-24 object-cover rounded-md"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-400 rounded-md">
                No captures yet
              </div>
            )}
          </Link>
        )}
      </aside>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-0 ${
          isOpen ? 'right-40' : 'right-0'
        } border-2 border-indigo-800 border-r-0 p-4 transition-all duration-300 transform rounded-l-full`}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        )}
      </Button>
      {!userInfo && isAuthModalOpen && (
        <AuthModal
          onClose={() => {
            setIsAuthModalOpen(false);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};

export default SideNav;
