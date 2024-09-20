import Modal from "react-modal";

Modal.setAppElement("#root");

interface CustomStyles {
  content: {
    top: string;
    left: string;
    right: string;
    bottom: string;
    marginRight: string;
    transform: string;
  };
}

const customStyles: CustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
interface Props {
  modalIsOpen: boolean;
  closeModal: () => void;
  // closeModal (): void;
  src: string;
  alt: string;
}
const ImageModal = ({ modalIsOpen, closeModal, src, alt }: Props) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={src} alt={alt} />
      </Modal>
    </>
  );
};
export default ImageModal;
