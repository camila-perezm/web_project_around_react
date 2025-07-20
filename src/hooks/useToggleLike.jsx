import api from "../utils/api";
import { useState } from "react";

export default function useToggleLike(card) {
  const [isTogglingLike, setIsTogglingLike] = useState(false);

  const toggleLike = async () => {
    try {
      setIsTogglingLike(true);
      const newCardState = card.isLiked
        ? await api.unLikeCard(card._id)
        : await api.likeCard(card._id);

      if (!newCardState) {
        throw new Error("Error al actualizar like");
      }

      return newCardState;
    } catch (error) {
      console.error("Error al actualizar like:", error);
    } finally {
      setIsTogglingLike(false);
    }
  };

  return { isTogglingLike, toggleLike };
}