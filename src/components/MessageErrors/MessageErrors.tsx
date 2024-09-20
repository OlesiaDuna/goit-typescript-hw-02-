import css from "./MessageErrors.module.css";
interface Props {
  error: string;
}
const MessageErrors = ({ error }: Props) => {
  return <div>{error}</div>;
};

export default MessageErrors;
