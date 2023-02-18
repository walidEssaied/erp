import { t } from "i18next";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserdataContext } from "../../partials/context/UserdataContext";

export default function Neworder() {
  const { user } = useContext(UserdataContext);
  const [clients, setClients] = useState(null);
  const [products, setProducts] = useState(null);
  const [addproduct, setAddproduct] = useState(false);

  // Client
  const [clientID, setClientid] = useState();
  const [balance, setBalance] = useState();

  // Select product
  const [productID, setProductId] = useState();
  const [oldProdcuctprix, setOldproductprix] = useState();

  // Create product
  const [productName, setProductname] = useState();
  const [productPrix, setProductprix] = useState();
  const [qunaiteDispo, setQuantitedispo] = useState();
  const [product, setProduct] = useState();

  // Create order
  const [quantite, setQuantite] = useState();
  const [prixTotal, setPrixtotal] = useState(false);
  const [container, setContainer] = useState(false);
  const [status, setStatus] = useState(false);
  const [typeOrder, setTypeorder] = useState();
  const [avance, setAvance] = useState();

  const [typeContainer, setTypecontainer] = useState(false);
  const [prixContainer, setPrixcontainer] = useState(false);
  const [prixProduct, setPrixProduct] = useState(false);

  const pushTo = useNavigate();

  useEffect(() => {
    if (user) {
      setClients(JSON.parse(user).clients);
      setProducts(JSON.parse(user).products);
    }
    console.log(JSON.parse(user));
    console.log(clients);
    console.log(products);
  }, [user]);

  useEffect(() => {
    if (quantite) {
      setQuantitedispo(quantite);
    }
    console.log({
      clientID: clientID,
      productID: productID,
      productName: productName,
      productPrix: productPrix,
      qunaiteDispo: qunaiteDispo,
      quantite: quantite,
      prixTotal: prixTotal,
      container: container,
      status: status,
      typeOrder: typeOrder,
      avance: avance,
    });
  }, [quantite]);

  useEffect(() => {
    setPrixProduct(quantite * parseFloat(productPrix));
    setPrixtotal(
      parseFloat(prixContainer) + parseFloat(prixProduct) + parseFloat(avance)
    );
    console.log(parseFloat(avance));
    console.log(parseFloat(prixTotal));
  }, [
    productPrix,
    typeContainer,
    quantite,
    prixContainer,
    prixProduct,
    avance,
  ]);

  useEffect(() => {
    if (productID != 0) {
      fetch("https://erp-server-production.up.railway.app/products/" + productID, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setOldproductprix(res);
        });
    }
    if (oldProdcuctprix) {
      setProductprix(parseInt(oldProdcuctprix.prix) * quantite);
    }
  }, [oldProdcuctprix, quantite]);

  // Create Order
  // Update product quantite disponible
  // Update product quantite vendu total
  // If order not payed update client balance

  const updateClient = () => {};

  const updateProductQteDispoAndVenduTotal = () => {};

  const addOrder = async () => {
    const orderData = {
      quantite: quantite,
      prix_total: prixTotal,
      container: container,
      status: status,
      type_order: typeOrder,
      avance: avance,
      products: [productID],
      orderToClient: { id: clientID },
      user: { id: 1 },
    };
    fetch("https://erp-server-production.up.railway.app/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(orderData),
    }).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Order crée avec succeés",
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
      pushTo("/orders");
    });
    // Update client balance
    if (status == false) {
      fetch("https://erp-server-production.up.railway.app/clients/" + clientID, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setBalance(res);
        });
      console.log({ balance: parseInt(balance.balance) });
      console.log("update user balance");
      console.log(parseInt(balance.balance) + parseInt(prixTotal));
      console.log(
        "new balance = ",
        parseInt(balance.balance) + parseInt(prixTotal) - parseInt(avance)
      );
      fetch("https://erp-server-production.up.railway.app/clients/" + clientID, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          balance:
            parseInt(balance.balance) + parseInt(prixTotal) - parseInt(avance),
        }),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("Client updated");
          }
          res.json();
        })
        .then((res) => console.log(res));
    }

    if (status == true && avance != 0) {
      fetch("https://erp-server-production.up.railway.app/clients/" + clientID, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setBalance(res);
        });
      console.log({ balance: parseInt(balance.balance) });
      console.log("update user balance");
      console.log(parseInt(balance.balance) + parseInt(prixTotal));
      console.log(
        "new balance = ",
        parseInt(balance.balance) + parseInt(prixTotal) - parseInt(avance)
      );
      fetch("https://erp-server-production.up.railway.app/clients/" + clientID, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          balance:
            parseInt(balance.balance) + parseInt(prixTotal) - parseInt(avance),
        }),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("Client updated");
          }
          res.json();
        })
        .then((res) => console.log(res));
    }

    // Update product quantite dispo and vendu (qv = 0)
    fetch("https://erp-server-production.up.railway.app/products/" + productID, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
    if (typeOrder == "achat") {
      fetch("https://erp-server-production.up.railway.app/products/" + productID, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantite_dispo: product.quantite + quantite }),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("product updated");
          }
          res.json();
        })
        .then((res) => {
          if (res.id != 0) {
            console.log(res);
            // setProductId(res.id)
          }
        });
    }
    if (typeOrder == "vente") {
      fetch("https://erp-server-production.up.railway.app/products/" + productID, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          quantite_vendu_total:
            parseInt(product.quantite_vendu_total) + parseInt(quantite),
          quantite_dispo: parseInt(product.quantite) - parseInt(quantite),
        }),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("product updated");
          }
          res.json();
        })
        .then((res) => {
          if (res.id != 0) {
            console.log(res);
            // setProductId(res.id)
          }
        });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">{t("addorder")}</h1>
      <section className="grid m-10">
        <h3 className="text-md font-semibold">{t("selection_client")}</h3>
        <select
          onChange={(e) => {
            setClientid(e.target.value);
          }}
          className="p-2 rounded w-min pr-10 my-1"
        >
          {clients?.map((client) => (
            <option value={client.id} key={client.id}>
              {client.nom}
            </option>
          ))}
        </select>
      </section>
      <section className="grid m-10">
        <h3 className="text-md font-semibold">{t("selection_produit")}</h3>
        <select
          onChange={(e) => setProductId(e.target.value)}
          className="p-2 rounded w-min pr-10 my-1"
        >
          <option>{t("selection_produit")}</option>
          {products?.map((product) => (
            <option value={product.id} key={product.id}>
              {product.nom}
            </option>
          ))}
        </select>
        <section className="grid my-10">
          <h3 className="text-md font-semibold">{t("type_order")}</h3>
          <select
            onChange={(e) => setTypeorder(e.target.value)}
            className="p-2 rounded w-min pr-10 my-1"
          >
            <option value="vente">{t("choisir_type_order")}</option>
            <option value="vente">Achat</option>
            <option value="achat">Vente</option>
            <option value="achat">Achat produit chambre froide</option>
            <option value="achat">Vente produit chambre froide</option>
            <option value="achat">Location chambre froide</option>
          </select>
        </section>
      </section>
      <section className="grid m-10">
        <label className="text-md font-semibold my-10">
          {t("quantite")} en KG
          <input
            type="text"
            onChange={(e) => setQuantite(e.target.value)}
            className="block p-2 rounded pl-5 my-1"
          />
        </label>
        <br />
        <span className="font-normal mt-3">
          <b>NB:</b>
          <br />
          Conteneur normal: 2kg | 3,5 TND
          <br />
          Lama: 700gr ou 1kg | 1,5 TN
        </span>
        <label className="text-md font-semibold mt-5">
          <span>Choisir le type de conteneur</span>
          <select
            onChange={(e) => setTypecontainer(e.target.value)}
            className="block p-2 rounded pr-7"
          >
            <option value="vente">{t("choisir_type_order")}</option>
            <option value="conteneur_normal">Conteneur normal</option>
            <option value="lama">Lama</option>
          </select>
        </label>
        <label className="text-md font-semibold mt-3">
          Nombre des conteneurs
          <input
            type="number"
            value={parseInt(container)}
            onChange={(e) => setContainer(e.target.value)}
            className="block p-2 rounded pl-5 my-1"
          />
        </label>
        {/* <label className="text-md font-semibold mt-5">
          Prix du conteneur(s)
          <input
            type="number"
            onChange={(e) => setPrixcontainer(e.target.value)}
            className="block p-2 rounded my-1"
          />
        </label> */}

        <label className="text-md font-semibold mt-3">
          Prix produit
          <input
            type="number"
            onChange={(e) => setPrixProduct(e.target.value)}
            defaultValue={parseFloat(prixProduct)}
            className="block p-2 rounded pl-5 my-1"
          />
          <span className="text-xs">Prix produit {prixProduct}</span>
          {/* <span className="ml-5 text-xs font-inter">
            {t("prix_total_calculer")} {parseInt(prixTotal)}
          </span> */}
        </label>
        <label className="text-md font-semibold mt-5">
          {t("qstavance")}
          <input
            type="number"
            onChange={(e) => setAvance(e.target.value)}
            className="block p-2 rounded pl-5 my-1"
          />
        </label>
        <label className="text-md font-semibold mt-5">
          {t("prix_total")}
          <input
            type="number"
            onChange={(e) => setPrixtotal(e.target.value)}
            value={parseFloat(prixTotal)}
            className="block p-2 rounded my-1"
          />
          <span className="text-xs">Prix Total {prixProduct}</span>
        </label>
      </section>

      <button
        className="p-2 bg-blue-500 rounded text-white font-semibold"
        onClick={() => {
          addOrder();
        }}
      >
        {t("enregistrer")}
      </button>
    </div>
  );
}
