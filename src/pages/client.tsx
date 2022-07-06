import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientCard from "components/clientCard";
import Loading from "components/loading";
import useAppSelector from "hooks/useSelector";
import { ClientsType } from "types";
import "styles/Client.scss";
import useFetch from "hooks/useFetch";

function Client() {
  const { refetch: refetchReducer } = useAppSelector((state) => state);
  const [clientData, setClientData] = useState<ClientsType>({
    id: 0,
    name: "",
    payment: 0,
  });
  const { id } = useParams();
  const { data, loading, refetch } = useFetch<ClientsType>(
    `https://payment-manager-api.alejandrosandi.com/clients/${id}`
  );

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) setClientData(data);
  }, [data]);

  useEffect(() => {
    handleRefetch();
  }, [handleRefetch, refetchReducer]);

  return (
    <div className="client">
      {loading ? <Loading /> : <ClientCard {...clientData} />}
    </div>
  );
}

export default React.memo(Client);
