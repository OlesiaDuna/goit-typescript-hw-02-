import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "modern-normalize";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import { getPhotos } from "./apiService";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import MessageErrors from "./components/MessageErrors/MessageErrors";
import { Photo } from "./types/photo";
import { AxiosError } from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);
  const [images, setImages] = useState<Photo[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (search.trim() === "") {
      toast.error("Please enter your query!");
      return;
    }
    setSearchQuery(search);
    setImages([]);
    setError("");
    setLoader(true);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
    e.currentTarget.reset();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };
  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (url: string, alt: string): void => {
    setShowModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const closeModal = (): void => {
    setShowModal(false);
    setModalUrl("");
    setModalAlt("");
  };
  useEffect(() => {
    if (!searchQuery) return;
    const fetchImages = async (): Promise<void> => {
      setLoader(true);
      try {
        const data = await getPhotos(searchQuery, page, perPage);
        // console.log(responce);

        if (!data.results.length) {
          toast.error("There is no images");
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...data.results]);
        setIsVisible(page < Math.ceil(data.total_pages / perPage));
        // console.log(data);
      } catch (error: any) {
        const err = error as AxiosError;
        setError(err.message);
      } finally {
        setLoader(false);
      }
    };
    fetchImages();
  }, [searchQuery, page]);

  return (
    <>
      <SearchBar
        onSubmit={handleSubmit}
        search={search}
        onChange={handleChange}
      />
      <ImageGallery images={images} openModal={openModal} />
      {loader && <Loader />}
      {(error || isEmpty) && <MessageErrors error={error} />}
      {isVisible && (
        <LoadMoreButton onClick={handleLoadMore} isDisabled={loader} />
      )}
      <ImageModal
        modalIsOpen={showModal}
        src={modalUrl}
        alt={modalAlt}
        closeModal={closeModal}
      />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
