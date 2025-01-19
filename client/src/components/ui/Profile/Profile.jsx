import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Message from '../Message';

function Profile({ userInfo }) {
  const user = useSelector((state) => state.user);
  const { updateProfileSuccess } = user;

  const successMessage = updateProfileSuccess && {
    status: '200',
    message: 'Updated Successfully!',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {successMessage && <Message>{successMessage}</Message>}

      <img
        src={userInfo.avatar}
        alt="User Avatar"
        className="w-32 h-32 rounded-full"
      />

      <p className="text-gray-600">
        Welcome back, <span className="font-bold">{userInfo.name}</span>
      </p>
      <p className="text-gray-600">
        Your email is{' '}
        <span className="font-bold">
          <a
            href={`mailto:${userInfo.email}`}
            className="text-indigo-500 hover:text-indigo-600"
          >
            {userInfo.email}
          </a>
        </span>
      </p>
    </div>
  );
}

Profile.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default Profile;
