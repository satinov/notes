import { useSelector } from "react-redux";
import { noteDetailsSelector } from "../noteDetailsSlice";

export const useNoteDetails = () => {
  const {
    error: {
      create: createError,
      delete: deleteError,
      read: readError,
      update: updateError,
      copy: copyError,
    },
    isLoading: {
      create: isCreateLoading,
      delete: isDeleteLoading,
      read: isReadLoading,
      update: isUpdateLoading,
      copy: isCopyLoading,
    },
    details,
  } = useSelector(noteDetailsSelector);

  return {
    createError,
    deleteError,
    readError,
    updateError,
    copyError,
    isCreateLoading,
    isCopyLoading,
    isDeleteLoading,
    isReadLoading,
    isUpdateLoading,
    details,
  };
};
