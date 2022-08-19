
import PopupWithForm from './PopupWithForm';
function DeletePopup ({ isOpen, onClose, card, deleteCard,isLoading}){


    function handleSubmit (e) {
        e.preventDefault();
        deleteCard(card);
      };

    return(
        <PopupWithForm
            name="delete"
            title="Вы уверены?"
            submitText={isLoading || "Да"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}

export default DeletePopup;