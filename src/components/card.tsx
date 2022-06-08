import React from "react";
import { Link } from "react-router-dom";
import useAppDispatch from "../hooks/useDispatch";
import useDaysLeft from "../hooks/useDaysLeft";
import { setClient } from "../store/reducers/clientReducer";
import { setModal } from "../store/reducers/modalReducer";
import "../styles/Card.scss";
import { success } from "toastr";

function Card(props: any) {
  const data = useDaysLeft(props.date, props.payment);

  const dispatch = useAppDispatch();

  const handleDispatchUpdate = () => {
    dispatch(setModal({ type: "update", state: true }));
    dispatch(setClient({ ...props }));
  };

  const handleDelete = async () => {
    const { id } = props;
    await fetch(
      `https://payment-manager-api.alejandrosandi.com/clients/${id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      success("Client deleted successfully", "Success");
      props.refetch();
    });
  };

  return (
    <>
      <div className="card">
        <span className="card-header">
          <Link to={`/client/${props.id}`}>{props.name}</Link>
          <p>{data}</p>
        </span>
        <ul>
          <li onClick={handleDispatchUpdate} className="fas fa-edit edit" />
          <li onClick={handleDelete} className="fas fa-trash trash" />
        </ul>
      </div>
    </>
  );
}

export default React.memo(Card);
