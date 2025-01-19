import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../Button';

import { detailsUser, updateProfile } from '../../../redux/thunks/userThunks';

function EditProfileForm({ user, setIsEditing }) {
  const dispatch = useDispatch();

  const initialFormData = {
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData)).then(() => {
      setIsEditing(false);
      dispatch(detailsUser);
    });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full my-4">
        <label className="sr-only" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full text-gray-600 bg-gray-200 rounded-md p-4 text-sm shadow-sm"
          value={formData.name}
          onChange={handleFieldChange}
        />
      </div>

      <div className="w-full my-4">
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          className="w-full text-gray-600 bg-gray-200 rounded-md p-4 text-sm shadow-sm"
          onChange={handleFieldChange}
        />
      </div>

      <div className="w-full my-4">
        <label className="sr-only" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full text-gray-600 bg-gray-200 rounded-md p-4 text-sm shadow-sm"
          onChange={handleFieldChange}
        />
      </div>

      <div className="w-full my-4">
        <label className="sr-only" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="w-full text-gray-600 bg-gray-200 rounded-md p-4 text-sm shadow-sm"
          onChange={handleFieldChange}
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit" variant="primary" className="rounded-md">
          Save Changes
        </Button>
        <Button variant="danger" className="rounded-md" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

EditProfileForm.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default EditProfileForm;
