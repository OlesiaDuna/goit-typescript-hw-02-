interface Props {
  onClick: () => void;
  isDisabled: boolean;
}

const LoadMoreButton = ({ onClick, isDisabled }: Props) => {
  return (
    <button onClick={onClick} type="button" disabled={isDisabled}>
      Load more
    </button>
  );
};

export default LoadMoreButton;
