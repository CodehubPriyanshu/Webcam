import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import AuthModal from '../components/ui/Auth/AuthModal';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';

import {
  deleteCaptureById,
  listCapturesByUserId,
} from '../redux/thunks/captureThunks';

function ImageScreen() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const capture = useSelector((state) => state.capture);
  const {
    loading,
    captureInfoById,
    captureInfoByIdError,
    captureDeleteByIdError,
    captureDeleteByIdSuccess,
  } = capture;

  const successMessageDeleteById = captureDeleteByIdSuccess && {
    status: '200',
    message: 'Capture Deleted Successfully!',
  };

  const handleDeleteCaptureById = () => {
    dispatch(deleteCaptureById(captureInfoById._id)).then(() => {
      dispatch(listCapturesByUserId({}));
      navigate('/gallery');
    });
  };

  return (
    <section className="bg-indigo-500 flex flex-col justify-center items-center min-h-screen p-10">
      {loading ? (
        <Loader />
      ) : userInfo ? (
        <>
          <Link to={'/gallery'}>
            <Button
              variant="outline"
              type="button"
              className="mb-4 rounded-lg shadow-lg flex flex-row items-center"
            >
              <IoIosArrowBack />
              Back
            </Button>
          </Link>

          {(captureInfoByIdError ||
            captureDeleteByIdError ||
            successMessageDeleteById) && (
            <Message>
              {captureInfoByIdError ||
                captureDeleteByIdError ||
                successMessageDeleteById}
            </Message>
          )}

          <div className="relative bg-white flex flex-col items-center rounded-lg shadow-lg p-2">
            <img
              src={captureInfoById.imageUrl}
              alt="Captured"
              className="rounded-lg"
            />
            <Button
              variant="danger"
              type="button"
              className="absolute top-2 right-6 rounded-lg shadow-lg"
              onClick={handleDeleteCaptureById}
            >
              Delete
            </Button>
          </div>
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

export default ImageScreen;
