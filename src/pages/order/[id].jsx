import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserdataContext } from "../../partials/context/UserdataContext";

export default function OrderProfile() {
  const [quantite, setQuantite] = useState();
  const [prix_total, setPrixtotal] = useState();
  const [container, setContainer] = useState();
  const [status, setStatus] = useState();
  const [type_order, setTypeorder] = useState();
  const [avance, setAvance] = useState();
  const params = useParams();
  const { user } = useContext(UserdataContext);
  const [order, setOrder] = useState(null);
  const [client, setClient] = useState(null);
  const [t, i18n] = useTranslation();

  const editOrder = async (id) => {
    const payload = {
      quantite,
      prix_total,
      container,
      status,
      type_order,
      avance,
    };
    console.log(payload);
    const response = await fetch(
      "http://92.222.181.90:1337/orders/" + id,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(payload),
      }
    ).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Order modifiée avec succeés",
          width: 600,
          padding: "3em",
          color: "#171354",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                          rgba(150,0,0,0.4)
                          url("/images/nyan-cat.gif")
                          left top
                          no-repeat
                        `,
        });
      }
    });
  };

  const printOrder = (id) => {
    alert(order);
  };

  useEffect(() => {
    // Get order from server
    fetch("http://92.222.181.90:1337/orders/" + params.id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (
          JSON.parse(user).orders.filter((order) => order.id == params.id)[0]
        ) {
          setOrder(res);
        }
      });
  }, []);
  useEffect(() => {
    if (order) {
      setQuantite(order?.quantite);
      setPrixtotal(order?.prix_total);
      setContainer(order?.container);
      setStatus(order?.status);
      setTypeorder(order?.type_order);
      setAvance(order?.avance);
      setClient(order?.client);
    }
    console.log(order);
    console.log(client);
  }, [order]);
  return (
    <div className="p-5">
      {order != null ? (
        <>
          <h1 className="text-3xl font-semibold">{t("order")}</h1>
          <h3></h3>
          <div className="flex flex-col gap-5 ml-5 py-5">
            {/* <label>
                            <p>
                                <div className="font-semibold text-left">id</div>
                            </p>
                            <input type="text" defaultValue={id} onChange={(e) => setQuantite(e.target.value)} className="rounded p-1 border" />
                        </label> */}
            <label>
              <p>
                <div className="font-semibold text-left">{t("quantite")}</div>
              </p>
              <input
                type="text"
                defaultValue={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>
                <div className="font-semibold text-left">{t("prix_total")}</div>
              </p>
              <input
                type="text"
                defaultValue={prix_total}
                onChange={(e) => setPrixtotal(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>
                <div className="font-semibold text-left">{t("container")}</div>
              </p>
              <input
                type="text"
                defaultValue={container}
                onChange={(e) => setContainer(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>
                <div className="font-semibold text-left">{t("type_order")}</div>
              </p>
              <input
                type="text"
                defaultValue={type_order}
                onChange={(e) => setTypeorder(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>
                <div className="font-semibold text-left">{t("payee")}</div>
              </p>
              <input
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(!status)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <div className="font-semibold text-left">{t("avance")}</div>
              <input
                type="text"
                defaultValue={avance}
                onChange={(e) => setAvance(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <button
                className="p-2 rounded bg-green-500 text-white font-semibold"
                onClick={() => {
                  editOrder(order?.id);
                }}
              >
                {t("modifier")}
              </button>
            </label>
            <label>
              <button
                className="p-2 rounded bg-blue-500 text-white font-semibold"
                onClick={() => {
                  printOrder(order?.id);
                }}
              >
                {t("imprimer")}
              </button>
            </label>
          </div>
        </>
      ) : (
        "Réessayer plus tard"
      )}
    </div>
  );
}
