import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../../../../contexts/CurrentUserContext';
import useFormValidation from '../../../../../hooks/useFormValidation';

export default function EditAvatar({ isOpen, onClose }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormValidation({
    avatar: ''
  });

  // Limpiar formulario cuando se abre el popup
  useEffect(() => {
    if (isOpen) {
      resetForm({ avatar: '' }, {}, false);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateAvatar({ avatar: values.avatar });
    resetForm();   // Limpia el input
    onClose();     // Cierra el popup
  };

  return (
    <form
      className="popup__form"
      id="avatarForm"
      name="avatarForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        required
        type="url"
        placeholder="Enlace a la nueva foto"
        id="avatar-link"
        name="avatar"
        className={`popup__input ${errors.avatar ? 'popup__input_type_error' : ''}`}
        value={values.avatar || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="avatar-link-error">
        {errors.avatar}
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
