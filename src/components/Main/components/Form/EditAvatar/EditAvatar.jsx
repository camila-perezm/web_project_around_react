export default function EditAvatar() {
  return (
    <form className="popup__form" id="avatarForm" name="avatarForm" noValidate>
      <input
        required
        type="url"
        placeholder="Enlace a la nueva foto"
        id="avatar-link"
        name="avatar"
        className="popup__input"
      />
      <span className="popup__input-error" id="avatar-link-error"></span>

      <button type="submit" className="popup__save-button">Guardar</button>
    </form>
  );
}