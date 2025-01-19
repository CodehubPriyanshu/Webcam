import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Loader from '../Loader';
import Message from '../Message';

import ImageList from './ImageList';

import {
  deleteCapturesByUserId,
  listCapturesByUserId,
} from '../../../redux/thunks/captureThunks';

function ImageGalleryCard() {
  const dispatch = useDispatch();

  const capture = useSelector((state) => state.capture);
  const {
    loading,
    captureListByUserIdError,
    captureListByUserId,
    captureDeleteByUserIdError,
    captureDeleteByUserIdSuccess,
  } = capture;

  const successMessageDeleteAll = captureDeleteByUserIdSuccess && {
    status: '200',
    message: 'All Captures Deleted Successfully!',
  };

  let latestImage = '';
  if (captureListByUserId && captureListByUserId.length > 0) {
    latestImage = captureListByUserId[captureListByUserId.length - 1];
  }

  const handleDeleteAllCaptures = () => {
    dispatch(deleteCapturesByUserId({})).then(() => {
      dispatch(listCapturesByUserId({}));
    });
  };

  return (
    <aside className="bg-white w-full sm:w-3/4 rounded-lg shadow-lg p-4 sm:ml-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Photos</h2>
          <p className="text-gray-600">
            You have{' '}
            <span className="font-bold">{captureListByUserId.length}</span>{' '}
            photos
          </p>
        </div>
        {captureListByUserId.length > 0 && (
          <Button
            variant="danger"
            type="button"
            className="mt-4 rounded-lg shadow-lg"
            onClick={handleDeleteAllCaptures}
          >
            Delete All Captures
          </Button>
        )}
      </div>

      {(captureListByUserIdError ||
        captureDeleteByUserIdError ||
        captureDeleteByUserIdSuccess) && (
        <Message>
          {captureListByUserIdError ||
            captureDeleteByUserIdError ||
            successMessageDeleteAll}
        </Message>
      )}

      {loading ? (
        <Loader />
      ) : captureListByUserId.length === 0 ? (
        <div className="flex flex-col justify-center items-center border-y-2 border-y-indigo-700 p-2 mt-4">
          <h2 className="text-2xl font-bold">No Media</h2>
          <p className="text-lg text-gray-500">
            You have not captured any media yet.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 break-all">
            Your latest photo is{' '}
            <span className="font-bold">
              <a
                href={latestImage.imageUrl}
                className="text-indigo-500 hover:text-indigo-600"
              >
                {latestImage.imageUrl}
              </a>
            </span>
          </p>

          <ImageList gallery={captureListByUserId} />
        </>
      )}
    </aside>
  );
}

export default ImageGalleryCard;
