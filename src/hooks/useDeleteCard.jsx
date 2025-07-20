import { useState } from "react";
import api from "../utils/api";

export default function useDeleteCard(card) {
  const [isDeletingCard, setIsDeletingCard] = useState(false);
  const [error, setError] = useState(null);

  const deleteCard = async () => {
    try {
      setIsDeletingCard(true);
      const newCardState = await api.deleteCard(card._id);

      if (!newCardState) {
        throw new Error("no se que paso");
      }
      setError(null);
      return "ok";
    } catch (error) {
      setError(error);
      console.error("Error al eliminar la tarjeta:", error);
    } finally {
      setIsDeletingCard(false);
    }
  };

  return { isDeletingCard, deleteCard, error };
}