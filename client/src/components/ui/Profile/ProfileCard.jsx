import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Loader from '../Loader';
import Message from '../Message';

import { detailsUser } from '../../../redux/thunks/userThunks';

const Profile = React.lazy(() => import('./Profile'));
const EditProfileForm = React.lazy(() => import('./EditProfileForm'));

function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, detailsUserError, userDetails, userInfo } = user;

  useEffect(() => {
    if (userInfo && !userDetails) {
      dispatch(detailsUser({}));
    }
  }, [dispatch, userInfo, userDetails]);

  return (
    <aside className="bg-white sm:w-1/4 flex flex-col items-center justify-between rounded-lg shadow-lg p-4 mb-4 sm:mb-0">
      <Suspense fallback={<Loader />}>
        {loading ? (
          <Loader />
        ) : detailsUserError ? (
          <Message>{detailsUserError}</Message>
        ) : (
          <>
            <h2 className="text-2xl font-bold">
              {isEditing ? 'Edit Profile' : 'Your Profile'}
            </h2>
            {isEditing ? (
              <EditProfileForm user={userDetails} setIsEditing={setIsEditing} />
            ) : (
              <Profile userInfo={userDetails} />
            )}
            {!isEditing && (
              <Button
                variant="primary"
                className="rounded-lg"
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit Profile
              </Button>
            )}
          </>
        )}
      </Suspense>
    </aside>
  );
}

export default ProfileCard;
