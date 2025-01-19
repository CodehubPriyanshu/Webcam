import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCaptureById } from '../../../redux/thunks/captureThunks';

function ImageListItem({ image, index, totalImages }) {
  const dispatch = useDispatch();

  const handleImageClick = () => {
    dispatch(getCaptureById(image._id));
  };

  return (
    <>
      <Link to={`/gallery/${image._id}`} onClick={handleImageClick}>
        <img
          src={image.imageUrl}
          alt="Gallery"
          className="p-1 rounded-lg border-2 border-transparent hover:border-indigo-500"
        />
      </Link>
      {index === 5 && totalImages > 6 && (
        <Link
          to="/gallery"
          className="absolute inset-0 flex items-center justify-center bg-indigo-500 text-white text-lg rounded-lg bg-opacity-40 hover:bg-opacity-70"
        >
          See More
        </Link>
      )}
    </>
  );
}

ImageListItem.propTypes = {
  image: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  totalImages: PropTypes.number.isRequired,
};

export default ImageListItem;
