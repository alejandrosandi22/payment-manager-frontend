import React, { useEffect, useRef, useState } from "react";
import useAppDispatch from "hooks/useDispatch";
import useAppSelector from "hooks/useSelector";
import { ClientsType } from "types";
import { setModal } from "store/reducers/modalReducer";
import Loading from "./loading";
import { setRefetch } from "store/reducers/refetchReducer";
import { error, success } from "toastr";
import "styles/Modal.scss";

export default function Modal() {
  const dialog = useRef<any>(null);
  const form = useRef<any>(null);
  const { modal, client, refetch } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [preload, setPreload] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataClient, setDataClient] = useState<ClientsType>(() => {
    if (modal.type === "update") {
      return { ...client };
    }
    return {
      id: 0,
      name: "",
      payment: 0,
    };
  });

  const handleClose = () => {
    form.current.reset();
    dispatch(setModal({ state: false, type: "" }));
    if (dialog.current) dialog.current.close();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataClient.payment === 0)
      return error("You must enter a payment ", "Error");
    setIsLoading(true);
    if (modal.type === "add") {
      await fetch("https://payment-manager-api.alejandrosandi.com/clients", {
        method: "POST",
        body: JSON.stringify(dataClient),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        success("Client added successfully", "Success");
        dispatch(setRefetch(!refetch));
        setIsLoading(false);
        handleClose();
      });
      return;
    }

    await fetch(
      `https://payment-manager-api.alejandrosandi.com/clients/${client.id}`,
      {
        method: "PUT",
        body: JSON.stringify(dataClient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      success("Client updated successfully", "Success");
      dispatch(setRefetch(!refetch));
      setIsLoading(false);
      handleClose();
    });
  };

  useEffect(() => {
    if (modal.type === "update") {
      setDataClient({ ...client });
    }
    return () => {
      setDataClient({
        id: 0,
        name: "",
        payment: 0,
      });
    };
  }, [modal.type, client]);

  useEffect(() => {
    if (!dialog.current) return;
    if (!modal.state) return dialog.current.close();
    dialog.current.show();
    setPreload(false);
  }, [modal]);

  return (
    <section
      className={`${preload ? "preload" : ""} ${
        modal.state ? "showModal" : "hiddeModal"
      }`}
    >
      <dialog ref={dialog}>
        <header>
          <h1>{modal.type === "add" ? "Add Client" : "Update Client"}</h1>
          <i onClick={handleClose} className="fal fa-times"></i>
        </header>
        <form ref={form} onSubmit={handleSubmit}>
          <input
            value={dataClient.id > 0 ? dataClient.id : ""}
            onChange={(e) =>
              setDataClient({ ...dataClient, id: parseInt(e.target.value) })
            }
            type="text"
            id="id"
            placeholder="Id"
            required
          />
          <input
            value={dataClient.name}
            onChange={(e) =>
              setDataClient({ ...dataClient, name: e.target.value })
            }
            type="text"
            id="name"
            placeholder="Name"
            required
          />
          <select
            value={dataClient.payment}
            onChange={(e) =>
              setDataClient({
                ...dataClient,
                payment: parseInt(e.target.value),
              })
            }
            name="payment"
            id="payment"
            required
          >
            <option value="0">Select payment</option>
            <option value="10000">Month</option>
            <option value="5000">Fortnight</option>
            <option value="3000">Week</option>
          </select>
          <div>
            <button
              disabled={isLoading}
              className="action-button"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="action-button"
              type="submit"
            >
              {modal.type === "add" ? "Add" : "Update"}
              {isLoading && <Loading />}
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
