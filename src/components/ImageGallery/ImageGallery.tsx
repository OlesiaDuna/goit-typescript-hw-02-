import { Photo } from "../../types/photo";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface Props {
  images: Photo[];
  openModal: (url: string, alt: string) => void;
  // openModal (url: string, alt: string): void;
}

const ImageGallery = ({ images, openModal }: Props) => {
  return (
    <ul className={css.gallery}>
      {images.map((image) => {
        return (
          <li className={css.imageitem} key={image.id}>
            <ImageCard img={image} openModal={openModal} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
