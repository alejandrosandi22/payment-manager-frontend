import Card from "../components/card";
import React, { useCallback, useEffect, useState } from "react";
import { ClientsType } from "../types";
import "../styles/List.scss";
import useAppSelector from "../hooks/useSelector";
import useAppDispatch from "../hooks/useDispatch";
import { setList } from "../store/reducers/listReducer";
import Loading from "../components/loading";
import useAxios from "axios-hooks";

function List() {
  const dispatch = useAppDispatch();
  const [noResults, setNoResults] = useState<boolean>(false);
  const [loadClients, setLoadClients] = useState<ClientsType[]>([
    {
      id: 0,
      name: "",
      payment: 0,
    },
  ]);
  const {
    list,
    search,
    refetch: refetchReducer,
  } = useAppSelector((state) => state);
  const [{ data, loading }, refetch] = useAxios(
    "https://payment-manager-api.alejandrosandi.com/clients"
  );

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) dispatch(setList(data));
  }, [data, dispatch]);

  useEffect(() => {
    handleRefetch();
  }, [handleRefetch, refetchReducer]);

  useEffect(() => {
    setNoResults(false);
    if (search.status) {
      if (search.searchResults.length === 0) return setNoResults(true);
      return setLoadClients(search.searchResults);
    }
    setLoadClients(list);
  }, [search, list]);

  return (
    <>
      <div
        className="list-container"
        style={{ justifyContent: `${loading ? "center" : "flex-start"}` }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            {!noResults ? (
              loadClients.map((client: ClientsType) => {
                return <Card key={client.id} refetch={refetch} {...client} />;
              })
            ) : (
              <>
                <h1 className="no-results">No Results Founded</h1>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default React.memo(List);
