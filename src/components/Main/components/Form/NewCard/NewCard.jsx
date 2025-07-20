import { useEffect } from "react";
import useFormValidation from "../../../../../hooks/useFormValidation";

export default function NewCard({ onAddCard }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation({
    title: "",
    url: "",
  });

  useEffect(() => {
    resetForm(); // limpia el formulario cuando se monta (al abrir popup)
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return; // no envía si hay errores

    onAddCard({
      name: values.title,
      link: values.url,
    });

    resetForm(); // limpia formulario después de enviar
  }


  return (
    <form
      className="popup__form"
      name="Nuevo lugar"
      id="addCardForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className={`popup__input ${errors.title ? "popup__input_type_error" : ""}`}
        id="title"
        maxLength="30"
        minLength="2"
        name="title"
        placeholder="Título"
        required
        type="text"
        value={values.title || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="title-error">{errors.title}</span>

      <input
        className={`popup__input ${errors.url ? "popup__input_type_error" : ""}`}
        id="url"
        name="url"
        placeholder="Enlace a la imagen"
        required
        type="url"
        value={values.url || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="url-error">{errors.url}</span>

      <button className="popup__save-button" type="submit" disabled={!isValid}>
        Guardar
      </button>
    </form>
  );
}