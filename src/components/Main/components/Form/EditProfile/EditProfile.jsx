import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../../../../contexts/CurrentUserContext';
import useFormValidation from '../../../../../hooks/useFormValidation';

export default function EditProfile({ isOpen, onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  // Hook de validación
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormValidation({
    name: '',
    occupation: '',
  });

  // Cargar datos del usuario al abrir el popup
  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm(
        {
          name: currentUser.name || '',
          occupation: currentUser.about || '',
        },
        {},
        true
      );
    }
  }, [isOpen, currentUser, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({
      name: values.name,
      about: values.occupation,
    });

    resetForm();   // Limpiar campos
    onClose();     // Cerrar popup
  };

  return (
    <form
      className="popup__form"
      name="Editar perfil"
      id="profileForm"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        placeholder="Name"
        id="name"
        name="name"
        className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
        maxLength="40"
        minLength="2"
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="name-error">
        {errors.name}
      </span>

      <input
        required
        type="text"
        placeholder="About"
        id="occupation"
        name="occupation"
        className={`popup__input ${errors.occupation ? 'popup__input_type_error' : ''}`}
        maxLength="200"
        minLength="2"
        value={values.occupation || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="occupation-error">
        {errors.occupation}
      </span>

      <button
        type="submit"
        className="popup__save-button"
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}