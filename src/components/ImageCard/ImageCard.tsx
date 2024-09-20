import css from "./ImageCard.module.css";
import { PiUserFocus } from "react-icons/pi";
import { FaGrinHearts } from "react-icons/fa";
import { Photo } from "../../types/photo";

interface Props {
  img: Photo;
  openModal: (url: string, alt: string) => void;
}
const ImageCard = ({ img, openModal }: Props) => {
  return (
    <div
      className={css.imagecard}
      onClick={(): void => {
        openModal(img.urls.regular, img.alt_description);
      }}
    >
      <img src={img.urls.small} alt={img.alt_description} />
      <ul className={css.imgList}>
        <li className={css.imgItem}>
          <PiUserFocus size="20" />
          {img.user.name}
        </li>
        <li className={css.imgItem}>
          <FaGrinHearts size="20" />
          {img.likes}
        </li>
      </ul>
    </div>
  );
};

export default ImageCard;
