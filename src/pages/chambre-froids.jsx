import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../partials/actions/Datepicker';
import Banner from '../partials/Banner';
import ClientCard from '../partials/dashboard/ClientCard';
import { UserdataContext } from '../partials/context/UserdataContext';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import ChambreCard from '../partials/dashboard/ChambreCard';

function ChambreFroids() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useContext(UserdataContext)
    const [clients, setClients] = useState()

    useEffect(() => {
        if (user) {
            setClients(JSON.parse(user).clients)
        }
    }, [])


    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div></div>
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    <Link to="/order/neworder">
                        <button className="p-2 rounded bg-green-500 text-white font-semibold text-sm">Ajouter ordre</button>
                    </Link>
                    <Datepicker />
                </div>
            </div>
            <div className="felx felx-col">
                <ChambreCard clients={clients} />
            </div>
        </div>
    );
}

export default ChambreFroids;
