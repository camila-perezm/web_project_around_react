export default function NewCard() {
  return (
    <form
      className="popup__form"
      name="Nuevo lugar"
      id="addCardForm"
      noValidate
    >
      <input
        className="popup__input popup__input_type_error"
        id="title"
        maxLength="30"
        minLength="2"
        name="title"
        placeholder="Título"
        required
        type="text"
      />
      <span className="popup__input-error" id="title-error"></span>

      <input
        className="popup__input"
        id="url"
        name="url"
        placeholder="Enlace a la imagen"
        required
        type="url"
      />
      <span className="popup__input-error" id="url-error"></span>

      <button className="popup__save-button" type="submit">
        Guardar
      </button>
    </form>
  );
}