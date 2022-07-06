import React, { useState } from "react";
import useAppDispatch from "hooks/useDispatch";
import useAppSelector from "hooks/useSelector";
import { setSearch } from "store/reducers/searchReducer";
import { ClientsType } from "types";
import "styles/Search.scss";

export default function Search() {
  const { list, search } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleReset = () => {
    setSearchValue("");
    dispatch(setSearch({ status: false, searchResults: [] }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toSearch = searchValue;

    if (toSearch === "") {
      setSearchValue("");
      return dispatch(setSearch({ status: false, searchResults: [] }));
    }

    const foundedClients: ClientsType[] = list.filter((client: ClientsType) => {
      return client.name.toLowerCase().includes(toSearch.toLowerCase());
    });

    if (foundedClients.length > 0) {
      return dispatch(
        setSearch({ status: true, searchResults: foundedClients })
      );
    }
    dispatch(setSearch({ status: true, searchResults: [] }));
  };

  return (
    <form onSubmit={handleSearch} className="serach-form">
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="search-input"
        type="text"
        id="search"
        placeholder="Search"
      />
      {search.status ? (
        <button onClick={handleReset} type="button" className="search-button">
          <i className="fal fa-times"></i>
        </button>
      ) : (
        <button className="search-button">
          <i className="fal fa-search"></i>
        </button>
      )}
    </form>
  );
}
