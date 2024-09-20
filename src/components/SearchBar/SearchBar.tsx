import { ChangeEvent, FormEvent } from "react";
import css from "./SearchBar.module.css";

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const SearchBar = ({ onSubmit, onChange, search }: Props) => {
  return (
    <header className={css.header}>
      <form onSubmit={onSubmit} className={css.form}>
        <input
          className={css.input}
          name="request"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={onChange}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
