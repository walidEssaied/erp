import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserdataContext } from "../../partials/context/UserdataContext";

export default function ProductProfile() {
  const [nom, setNom] = useState();
  const [prix, setPrix] = useState();
  const [quantite_disponible, setQuantitedispo] = useState();
  const [quantite_vendu_total, setQuantitevt] = useState();
  const { user } = useContext(UserdataContext);
  const [product, setProduct] = useState(null);
  const params = useParams();
  const [t, i18n] = useTranslation();

  const editProduct = async (id) => {
    const payload = {
      nom,
      prix,
      quantite_disponible,
      quantite_vendu_total,
    };
    console.log(payload);
    const response = await fetch(
      "https://bold-erp.herokuapp.com/products/" + id,
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
          title: "Product modifiée avec succeés",
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
    // Get product from server
    fetch("https://bold-erp.herokuapp.com/products/" + params.id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (
          JSON.parse(user).products.filter(
            (product) => product.id == params.id
          )[0]
        ) {
          setProduct(res);
        }
      });
  }, []);

  useEffect(() => {
    if (product) {
      setNom(product?.nom);
      setPrix(product?.prix);
      setQuantitedispo(product?.quantite_disponible);
      setQuantitevt(product?.quantite_vendu_total);
    }
    console.log(product);
  }, [product]);
  return (
    <div className="p-5">
      {product != null ? (
        <>
          <h1 className="text-3xl font-semibold">{t("produitprofile")}</h1>
          <h3></h3>
          <div className="flex flex-col gap-5 ml-5 py-5">
            <label>
              <p>{t("nom")}</p>
              <input
                type="text"
                defaultValue={nom}
                onChange={(e) => setNom(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("prix")}</p>
              <input
                type="text"
                defaultValue={prix}
                onChange={(e) => setPrix(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("qte_dispo_total")}</p>
              <input
                type="number"
                defaultValue={quantite_disponible}
                onChange={(e) => setQuantitedispo(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <p>{t("qte_vendu_total")}</p>
              <input
                type="number"
                defaultValue={quantite_vendu_total}
                onChange={(e) => setQuantitevt(e.target.value)}
                className="rounded p-1 border"
              />
            </label>
            <label>
              <button
                className="p-2 rounded bg-green-500 text-white font-semibold"
                onClick={() => {
                  editProduct(product?.id);
                }}
              >
                {t("modifier")}
              </button>
            </label>
            <label>
              <button className="mr-3 bg-red-500 px-2 text-white rounded">
                {t("supprimer")}
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
