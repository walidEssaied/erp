import { t } from 'i18next';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { UserdataContext } from '../../partials/context/UserdataContext';

export default function Newclient() {
    const { user } = useContext(UserdataContext)
    const [nom, setNom] = useState();
    const [email, setEmail] = useState();
    const [telephone, setTel] = useState();
    const [mf, setMf] = useState();
    const [address, setAddress] = useState();
    const [balance, setBalance] = useState(0);
    const pushTo = useNavigate();


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const payload = {
            nom,
            email,
            telephone,
            address,
            mf,
            balance,
            user: 1
        }
        console.log(user, JSON.stringify(user.id))
        const response = await fetch("https://bold-erp.herokuapp.com/clients", {
            "method": "POST",
            "headers": {
                "Content-type": "application/json; charset=UTF-8"
            },
            "body": JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then(res => {
                if (res.id && user) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Client ajouter avec succeés',
                        width: 600,
                        padding: '3em',
                        color: '#171354',
                        background: '#fff url(/images/trees.png)',
                        backdrop: `
                              rgba(150,0,0,0.4)
                              url("/images/nyan-cat.gif")
                              left top
                              no-repeat
                            `
                    })
                    pushTo("/clients")
                    console.log(res.id)
                }
            })
    }
    return (
        <div className="p-5">
            <h1 className="text-3xl">{t('addclient')}</h1>
            <form className="flex flex-col gap-5 ml-5 py-5" onSubmit={(e) => onSubmitHandler(e)}>
                <label>
                    <p>
                        {t('nom')} {t('client')}
                    </p>
                    <input type="text" defaultValue="" onChange={(e) => setNom(e.target.value)} className="rounded p-1 border" />
                </label>
                <label>
                    <p>
                        {t('email')}
                    </p>
                    <input type="text" defaultValue="" onChange={(e) => setEmail(e.target.value)} className="rounded p-1 border" />
                </label>
                <label>
                    <p>
                    {t('telephone')}
                    </p>
                    <input type="text" defaultValue="" onChange={(e) => setTel(e.target.value)} className="rounded p-1 border" />
                </label>
                <label>
                    <p>
                    {t('address')}
                    </p>
                    <input type="text" defaultValue="" onChange={(e) => setAddress(e.target.value)} className="rounded p-1 border" />
                </label>
                <label>
                    <p>
                    {t('mf')}
                    </p>
                    <input type="text" defaultValue="" onChange={(e) => setMf(e.target.value)} className="rounded p-1 border" />
                </label>
                <label>
                    <input type="submit" value={t('enregistrer')} className="p-2 bg-blue-500 rounded text-white font-semibold"/>
                </label>
            </form>
        </div>
    )
}
