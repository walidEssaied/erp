import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserdataContext } from "../../partials/context/UserdataContext";

export default function ClientProfile() {
  const [nom, setNom] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTel] = useState();
  const [mf, setMf] = useState();
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();
  const params = useParams();
  const { user } = useContext(UserdataContext);
  const [client, setClient] = useState(null);
  const [t, i18n] = useTranslation();

  const editClient = async (id) => {
    const payload = {
      nom,
      email,
      telephone,
      address,
      mf,
      balance,
    };
    console.log(payload);
    const response = await fetch(
      "https://erp-server-production.up.railway.app/clients/" + id,
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
          title: "Client modifiée avec succeés",
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

  useEffect(() => {
    console.log(params.id);
    console.log({ userfromclient: JSON.parse(user) });

    // Get client from server
    fetch("https://erp-server-production.up.railway.app/clients/" + params.id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (
          JSON.parse(user).clients.filter((client) => client.id == params.id)[0]
        ) {
          setClient(res);
        }
      });
  }, []);
  useEffect(() => {
    if (client) {
      setNom(client?.nom);
      setEmail(client?.email);
      setTel(client?.telephone);
      setMf(client?.mf);
      setAddress(client?.address);
      setBalance(client?.balance);
    }
  }, [client]);
  return (
    <div className="p-5">
      {client != null ? (
        <>
          <h1 className="text-3xl font-semibold">{t("clientprofile")}</h1>
          <h3></h3>
          <div className="flex flex-col gap-5 ml-5 py-5">
            <label>
              <p>
                {t("nom")} {t("client")}
              </p>
              <input
                type="text"
                defaultValue={nom}
                onChange={(e) => setNom(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("email")}</p>
              <input
                type="text"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("telephone")}</p>
              <input
                type="text"
                defaultValue={telephone}
                onChange={(e) => setTel(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("address")}</p>
              <input
                type="text"
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("mf")}</p>
              <input
                type="text"
                defaultValue={mf}
                oonChange={(e) => setMf(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("balance")}</p>
              <input
                type="text"
                defaultValue={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("nombre_order")}</p>
              <input
                type="text"
                defaultValue={client?.orders?.length}
                disabled
                className="bg-gray-400 cursor-not-allowed"
                title="Vous pouvez modifier et supprimer l'order dans la page d'ordres"
              />
            </label>
            <label>
              <button
                className="p-2 rounded bg-green-500 text-white font-semibold"
                onClick={() => {
                  editClient(client?.id);
                }}
              >
                {t("modifier")}{" "}
              </button>
            </label>
            <label>
              <button className="p-2 bg-red-500  text-white rounded">
                {t("supprimer")}
              </button>
            </label>
          </div>
          <h3 className="text-xl font-semibold my-3">{t("liste_orders")}: </h3>
          <table>
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr className="uppercase">
                <th className="p-2">
                  <div className="font-semibold text-left">{t("id")}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">{t("quantite")}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">
                    {t("prix total")}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {t("container")}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t("status")}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {t("type_order")}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t("avance")}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {t("montant_final")}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {t("actions")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {client?.orders?.map((order) => (
                <tr
                  className={
                    order.status ? "bg-green-500" : "bg-red-500 text-white"
                  }
                >
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.quantite}</td>
                  <td className="p-2">{order.prix_total}</td>
                  <td className="p-2">{order.container}</td>
                  <td className="p-2">
                    {order.status ? "Payee" : "non payee"}
                  </td>
                  <td className="p-2">{order.type_order}</td>
                  <td className="p-2">{order.avance}</td>
                  <td className="p-2">
                    {order.status ? "-" : order.prix_total - order.avance}
                  </td>
                  <td className="flex p-2 gap-x-3 bg-white text-gray-500">
                    <button className="font-semibold">{t("voir")}</button>
                    <button className="font-semibold">{t("imprimer")}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        "Réessayer plus tard"
      )}
    </div>
  );
}
