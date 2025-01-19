import PropTypes from 'prop-types';

function Button({
  variant,
  children,
  className: additionalClassNames,
  ...props
}) {
  let classes = '';

  switch (variant) {
    case 'primary':
      classes =
        'bg-indigo-500 hover:bg-indigo-600 text-white text-md font-medium py-3 px-4 my-4';
      break;
    case 'secondary':
      classes =
        'bg-red-500 hover:bg-red-600 text-white text-md font-medium py-3 px-4 my-4';
      break;
    case 'outline':
      classes =
        'bg-transparent hover:bg-white text-md font-medium py-3 px-4 my-4 border-2 border-white hover:border-indigo-700 text-white hover:text-indigo-500 transition-all duration-300';
      break;
    case 'danger':
      classes =
        'bg-red-500 hover:bg-red-600 text-white text-md font-medium py-3 px-4 my-4';
      break;
    default:
      classes =
        'bg-indigo-500 hover:bg-indigo-600 text-md font-medium py-3 px-4 my-4';
      break;
  }

  if (additionalClassNames) {
    classes += ` ${additionalClassNames}`;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
