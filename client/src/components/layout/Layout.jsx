import PropTypes from 'prop-types';

import SideNav from './SideNav';

function Layout({ children }) {
  return (
    <>
      {children}
      <SideNav />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
