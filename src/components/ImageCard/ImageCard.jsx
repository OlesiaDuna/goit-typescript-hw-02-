import css from "./ImageCard.module.css";
import { PiUserFocus } from "react-icons/pi";
import { FaGrinHearts } from "react-icons/fa";

const ImageCard = ({ img, openModal }) => {
  return (
    <div
      className={css.imagecard}
      onClick={() => openModal(img.urls.regular, img.alt_description)}
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
