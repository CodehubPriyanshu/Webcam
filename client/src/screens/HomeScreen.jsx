import { useCallback, useEffect, useRef, useState } from 'react';
import { RiCameraLensFill, RiCameraLensLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import Webcam from 'react-webcam';

import AuthModal from '../components/ui/Auth/AuthModal';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';

import { dataURLToBlob } from '../utils/imageUtils';

import {
  createCapture,
  listCapturesByUserId,
} from '../redux/thunks/captureThunks';
import Button from '../components/ui/Button';

function HomeScreen() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [shutterClosed, setShutterClosed] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const webcamRef = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const capture = useSelector((state) => state.capture);
  const { loading, captureInfo, captureInfoSuccess, captureInfoError } =
    capture;

  const captureImage = useCallback(() => {
    setShutterClosed(true);
    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = dataURLToBlob(imageSrc);
      dispatch(createCapture(blob));
    }, 300);
  }, [webcamRef, dispatch]);

  useEffect(() => {
    if (userInfo) {
      setIsAuthModalOpen(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (captureInfoSuccess) {
      setCapturedImage(captureInfo?.imageUrl);
      dispatch(listCapturesByUserId({}));
      setShutterClosed(false);
    }
  }, [captureInfoSuccess, captureInfo, dispatch]);

  return (
    <section className="h-screen bg-indigo-500 flex flex-col-reverse sm:flex-row justify-evenly items-center p-10">
      {userInfo ? (
        <>
          <button
            onClick={
              capturedImage ? () => setCapturedImage(null) : captureImage
            }
            className="bg-indigo-800 text-white rounded-full p-2 mr-2 shadow-xl"
          >
            {shutterClosed ? (
              <RiCameraLensFill
                size={80}
                className="animate-shutter"
                style={{ animationDuration: '1s' }}
              />
            ) : (
              <RiCameraLensLine size={80} />
            )}
          </button>
          {captureInfoError && <Message>{captureInfoError}</Message>}
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="captured"
              className="border-2 border-indigo-800 rounded-xl shadow-xl p-1"
            />
          ) : (
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 bg-indigo-500 bg-opacity-25 flex items-center justify-center">
                  <Loader />
                </div>
              )}
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="border-2 border-indigo-800 rounded-xl shadow-xl p-1"
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-white text-center">
          <h1 className="text-3xl text-indigo-100 font-bold mb-2">
            Welcome to
          </h1>
          <h1 className="text-5xl font-bold mb-2">Camify</h1>
          <p className="text-xl text-indigo-300 font-medium mb-2">
            Login to capture your moments!
          </p>
          <Button
            variant="outline"
            className="rounded-lg shadow-lg"
            onClick={() => {
              setIsAuthModalOpen(true);
            }}
          >
            Login / Register
          </Button>
        </div>
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => {
            setIsAuthModalOpen(false);
          }}
        />
      )}
    </section>
  );
}

export default HomeScreen;
