export default function EditProfile() {
  return (
    <form className="popup__form" name="Editar perfil" id="profileForm" noValidate>
      <input
        required
        type="text"
        placeholder="Name"
        id="name"
        name="name"
        className="popup__input popup__input_type_error"
        maxLength="40"
        minLength="2"
      />
      <span className="popup__input-error" id="name-error"></span>

      <input
        required
        type="text"
        placeholder="About"
        id="occupation"
        name="occupation"
        className="popup__input popup__input_type_error"
        maxLength="200"
        minLength="2"
      />
      <span className="popup__input-error" id="occupation-error"></span>

      <button type="submit" className="popup__save-button">Guardar</button>
    </form>
  );
}