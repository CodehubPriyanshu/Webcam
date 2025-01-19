import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../Card';
import Loader from '../Loader';
import Message from '../Message';

import { getUserById } from '../../../redux/thunks/userThunks';

function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, users, userDetails } = user;

  const capture = useSelector((state) => state.capture);
  const { loading: loadingCaptures, captureListError, captureList } = capture;

  const totalUsers = users.length;
  const totalCaptures = captureList.length;

  // Function to check if a user was created today
  const isCreatedToday = (userDate) => {
    const userCreationDate = new Date(userDate);
    const today = new Date();
    return (
      userCreationDate.getDate() === today.getDate() &&
      userCreationDate.getMonth() === today.getMonth() &&
      userCreationDate.getFullYear() === today.getFullYear()
    );
  };

  // Function to check if a user was created this week
  const isCreatedThisWeek = (userDate) => {
    const userCreationDate = new Date(userDate);
    const today = new Date();
    return (
      today.getTime() - userCreationDate.getTime() < 7 * 24 * 60 * 60 * 1000 &&
      today.getDay() >= userCreationDate.getDay()
    );
  };

  // Function to check if a user was created this month
  const isCreatedThisMonth = (userDate) => {
    const userCreationDate = new Date(userDate);
    const today = new Date();
    return (
      userCreationDate.getMonth() === today.getMonth() &&
      userCreationDate.getFullYear() === today.getFullYear()
    );
  };

  // Filter users based on creation date
  const usersCreatedToday = users.filter((user) =>
    isCreatedToday(user.createdAt)
  );
  const usersCreatedThisWeek = users.filter((user) =>
    isCreatedThisWeek(user.createdAt)
  );
  const usersCreatedThisMonth = users.filter((user) =>
    isCreatedThisMonth(user.createdAt)
  );

  // Filter captures based on creation date
  const capturesCreatedToday = captureList.filter((capture) =>
    isCreatedToday(capture.createdAt)
  );
  const capturesCreatedThisWeek = captureList.filter((capture) =>
    isCreatedThisWeek(capture.createdAt)
  );
  const capturesCreatedThisMonth = captureList.filter((capture) =>
    isCreatedThisMonth(capture.createdAt)
  );

  useEffect(() => {
    const findMaxcapturesUser = () => {
      const usercapturesCount = {};

      captureList.forEach((capture) => {
        const userId = capture.user;
        if (userId !== undefined) {
          usercapturesCount[userId] = (usercapturesCount[userId] || 0) + 1;
        }
      });

      if (Object.keys(usercapturesCount).length === 0) {
        // If the captures list is empty or all captures lack userId, return null
        return null;
      }

      // Find the userId with the maximum number of captures
      let maxcapturesUser = Object.keys(usercapturesCount)[0];
      for (const userId in usercapturesCount) {
        if (usercapturesCount[userId] > usercapturesCount[maxcapturesUser]) {
          maxcapturesUser = userId;
        }
      }

      return maxcapturesUser;
    };

    if (findMaxcapturesUser() !== null) {
      dispatch(getUserById(findMaxcapturesUser()));
    }
  }, [dispatch, captureList, users]);

  const CardsList = [
    {
      title: 'Total Users',
      count: totalUsers,
    },
    {
      title: 'Total Captures',
      count: totalCaptures,
    },
    {
      title: 'Users Created Today!',
      count: usersCreatedToday.length,
    },
    {
      title: 'Users Created This Week!',
      count: usersCreatedThisWeek.length,
    },
    {
      title: 'Users Created This Month!',
      count: usersCreatedThisMonth.length,
    },
    {
      title: 'Captures Created Today!',
      count: capturesCreatedToday.length,
    },
    {
      title: 'Captures Created This Week!',
      count: capturesCreatedThisWeek.length,
    },
    {
      title: 'Captures Created This Month!',
      count: capturesCreatedThisMonth.length,
    },
    {
      title: 'User With Most Captures',
      count: userDetails ? userDetails.name : 'No User',
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {captureListError ? (
        <Message>{captureListError}</Message>
      ) : (
        <>
          {CardsList.map((card, index) => (
            <Card key={index} className="text-center p-2 m-2 ">
              {loading || loadingCaptures ? (
                <Loader />
              ) : (
                <p className="text-violet-600 text-5xl font-bold truncate truncate-middle">
                  {card.count}
                </p>
              )}
              <h1 className="font-regular text-md text-indigo-800 mt-2 truncate truncate-middle">
                {card.title}
              </h1>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
