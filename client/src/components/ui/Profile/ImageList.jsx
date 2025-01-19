import PropTypes from 'prop-types';

import ImageListItem from './ImageListItem';

function ImageList({ gallery }) {
  const imagesToRender = gallery.slice(0, 6);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
      {imagesToRender.map((image, index) => (
        <div key={image._id} className="relative overflow-hidden rounded-lg">
          <ImageListItem
            index={index}
            image={image}
            totalImages={gallery.length}
          />
        </div>
      ))}
    </div>
  );
}

ImageList.propTypes = {
  gallery: PropTypes.array.isRequired,
};

export default ImageList;
