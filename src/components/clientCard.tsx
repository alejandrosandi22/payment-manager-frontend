import React from "react";
import "../styles/ClientCard.scss";
import moment from "moment";
import useDaysLeft from "../hooks/useDaysLeft";
import { ClientsType } from "../types";
import useAppDispatch from "../hooks/useDispatch";
import { setModal } from "../store/reducers/modalReducer";
import { setClient } from "../store/reducers/clientReducer";
import { useNavigate } from "react-router-dom";
import { success } from "toastr";

function paymentFormating(payment: number) {
  let paymentFormat: string = "";
  const splitPayment: string[] = payment.toString().split("");

  if (splitPayment.length >= 5) {
    splitPayment.map((num: string, index: number) => {
      if (index === 0) paymentFormat = "₡";
      if (index === 2) paymentFormat = paymentFormat + ",";
      return (paymentFormat = paymentFormat + num);
    });
  } else {
    paymentFormat = "₡" + payment;
  }

  return paymentFormat;
}

export default function ClientCard({ id, name, payment, date }: ClientsType) {
  const daysLeft = useDaysLeft(date, payment);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDispatchUpdate = () => {
    dispatch(setModal({ type: "update", state: true }));
    dispatch(setClient({ id, name, payment, date }));
  };

  const handleDelete = async () => {
    await fetch(
      `https://payment-manager-api.alejandrosandi.com/clients/${id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      success("Client deleted successfully", "Success");
      navigate("/");
    });
  };

  return (
    <div className="client-card">
      <div className="header">
        <span>
          <h1>{name}</h1>
        </span>
        <ul>
          <li onClick={handleDispatchUpdate} className="fas fa-edit edit" />
          <li onClick={handleDelete} className="fas fa-trash trash" />
        </ul>
      </div>
      <ul className="client-data">
        <li>
          <span>Days left:</span> {daysLeft}
        </li>
        <li>
          <span>Last update:</span>{" "}
          {moment(date).format("YYYY-MM-DD hh:mm:ss A")}
        </li>
        <li>
          <span>Last payment:</span> {paymentFormating(payment)}
        </li>
      </ul>
    </div>
  );
}
