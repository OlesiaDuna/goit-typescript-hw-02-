import { useEffect, useState } from "react";
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

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = e.target.elements.request.value;

    if (request.trim() === "") {
      toast.error("Please enter your query!");
      return;
    }
    setSearchQuery(request);
    e.target.reset();
    setImages([]);
    setError(false);
    setLoader(true);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (url, alt) => {
    setShowModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalUrl("");
    setModalAlt("");
  };
  useEffect(() => {
    if (!searchQuery) return;
    const fetchImages = async () => {
      setLoader(true);
      try {
        const responce = await getPhotos(searchQuery, page, perPage);
        // console.log(responce);

        if (!responce.results.length) {
          toast.error("There is no images");
          return setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...responce.results]);
        setIsVisible(page < Math.ceil(responce.total_pages / perPage));
        // console.log(responce);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchImages();
  }, [searchQuery, page]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {loader && <Loader />}
      {error && <MessageErrors>{error}</MessageErrors>}
      {isEmpty && <MessageErrors></MessageErrors>}
      {isVisible && (
        <LoadMoreButton onClick2={handleLoadMore} disabled={loader}>
          Load more
        </LoadMoreButton>
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
