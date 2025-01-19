import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader';
import Message from '../Message';
import Table from './Table';

import {
  deleteCaptureById,
  listCaptures,
} from '../../../redux/thunks/captureThunks';

function CapturesList() {
  const captureColumns = ['_id', 'imageUrl', 'user'];

  const dispatch = useDispatch();

  const capture = useSelector((state) => state.capture);
  const {
    loading,
    captureList,
    captureListError,
    captureDeleteByIdSuccess,
    captureDeleteByIdError,
  } = capture;

  const handleDelete = (id) => {
    dispatch(deleteCaptureById(id)).then(() => dispatch(listCaptures({})));
  };

  const successMessageDelete = captureDeleteByIdSuccess && {
    status: '200',
    message: 'Capture Deleted Successfully!',
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold my-2">All Captures</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          {(captureListError ||
            captureDeleteByIdError ||
            successMessageDelete) && (
            <Message>
              {captureListError ||
                captureDeleteByIdError ||
                successMessageDelete}
            </Message>
          )}

          <div className="mt-4">
            {captureList.length > 0 ? (
              <Table
                data={captureList}
                columns={captureColumns}
                handleDelete={handleDelete}
              />
            ) : (
              <h2 className="text-white text-xl text-center rounded-md border-2 border-indigo-400 font-semibold mb-2 p-4 hidden md:block">
                No Captures Found..
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CapturesList;
