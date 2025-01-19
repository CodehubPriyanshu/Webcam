import PropTypes from 'prop-types';

function Card({ children, className: additionalClassNames, ...props }) {
  let classes = 'w-full bg-white border-2 border-indigo-800 rounded-md';

  if (additionalClassNames) {
    classes += ` ${additionalClassNames}`;
  }
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
