import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserdataContext } from '../../partials/context/UserdataContext'

export default function NewProduct() {

    const [nom, setNom] = useState()
    const [prix, setPrix] = useState()
    const [quantite_disponible, setQuantitedispo] = useState(0)
    const [quantite_vendu_total, setQuantitevt] = useState(0)
    const { user } = useContext(UserdataContext)
    const [product, setProduct] = useState(null)
    
    const pushTo = useNavigate();

    const CreateProduct = async () => {
        const payload = {
            nom,
            prix,
            quantite_disponible,
            quantite_vendu_total,
            user: 1
        }
        const response = await fetch("http://localhost:1337/products", {
            "method": "POST",
            "headers": {
                "Content-type": "application/json; charset=UTF-8"
            },
            "body": JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then(res => {
            if(res.id) {
                pushTo("/products")
            }
        })
    }

    return (
        <>
        <div className="grid">
            <h3 className="text-xl font-bold">Ajouter nouveau produit</h3>
            <label className="text-md font-semibold mt-5">
                Nom du produit
                <input type="text" onChange={(e) => setNom(e.target.value)} className="block p-2 rounded my-1"/>
            </label>
            <label className="text-md font-semibold mt-5">
                Prix du produit
                <input type="number" onChange={(e) => setPrix(e.target.value)} className="block p-2 rounded my-1"/>
            </label>
            <p>Il n'est pas récommander de saisir manuellmant ces valeurs, la mise à jour des valeus ci-desous sera changée auto par le systéme.</p>
            <label className="text-md font-semibold mt-5">
                Quantite disponible
                <input type="number" onChange={(e) => setQuantitedispo(e.target.value)} className="block p-2 rounded my-1"/>
            </label>
            <label className="text-md font-semibold my-5">
                Quantite Vendu total
                <input type="number" onChange={(e) => setQuantitevt(e.target.value)} className="block p-2 rounded my-1"/>
            </label>
        </div>
            <button className="rounded p-2 bg-blue-500 text-white" onClick={() => {CreateProduct()}}>Enregistrer</button>
        </>

    )
}
