import React, { useState, useEffect, useContext } from 'react'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard007 from '../partials/dashboard/DashboardCard007';
import { UserdataContext } from '../partials/context/UserdataContext';
import i18n from '../i18n';

export default function Dashboard() {
    const { user } = useContext(UserdataContext)
    const [orders, setOrders] = useState(null)
    const [vent, setVent] = useState(0)
    const [vents, setVents] = useState(0)
    const [achats, setAchats] = useState(0)
    const [achat, setAchat] = useState(0)
    const [client, setClients] = useState()


    useEffect(() => {
        if (user) {
            setOrders(JSON.parse(user).orders)
        }
    }, [])


    useEffect(() => {
        if (user) {
            setClients(JSON.parse(user).clients)
            console.log(JSON.parse(user).orders)
        }
    }, [])

    useEffect(() => {
        if (orders) {
            var vent = []
            var achat = []
            orders?.map((order) => {
                if (order.type_order == "vent" && order.status == true) {
                    vent.push(parseInt(order.prix_total))
                }
                if (order.type_order == "achat" && order.status == true) {
                    achat.push(parseInt(order.prix_total))
                }
            })
            if(vent != 0) {
                setVents(vent)
            }
            if(achat != 0) {
                setAchats(achat)
            }
            var sumVent = vent.reduce(function (a, b) {
                return a + b;
            }, 0);
            var sumAchat = achat.reduce(function (a, b) {
                return a + b;
            }, 0);
            setVent(sumVent)
            setAchat(sumAchat)
        }
    }, [client])
    return (
        <div>

            {/* Welcome banner */}
            <WelcomeBanner /> {/* Dashboard actions */}
            <div className={`${i18n.language == "fr" ? "sm:flex sm:justify-between sm:items-center mb-8" : "flex-row-reverse"}`}>

                {/* Left: Avatars */}
                {/* <DashboardAvatars /> */}
                <div></div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Filter button */}
                    {/* <FilterButton /> */}
                    {/* Datepicker built with flatpickr */}
                    <Datepicker /> {/* Add view button */}
                    {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add view</span>
        </button>                 */} </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

                {/* Line chart (Acme Plus) */}
                <DashboardCard01 vent={vent} vents={vents} achats={achats}/> {/* Line chart (Acme Advanced) */}
                <DashboardCard02 vent={vent} vents={vents} achats={achats}/> {/* Line chart (Acme Professional) */}
                {/* <DashboardCard03 /> */}
                {/* Bar chart (Direct vs Indirect) */}
                {/* <DashboardCard04 /> */}
                {/* Line chart (Real Time Value) */}
                {/* <DashboardCard05 /> */}
                {/* Doughnut chart (Top Countries) */}
                {/* <DashboardCard06 /> Table (Top Channels) */}
                <DashboardCard07 /> {/* Line chart (Sales Over Time) */}
                <DashboardCard007 />
                {/* Stacked bar chart (Sales VS Refunds) */}
                {/* <DashboardCard09 /> */}
                {/* Card (Customers) */}
                {/* <DashboardCard10 /> */}
                {/* Card (Reasons for Refunds) */}
                {/* <DashboardCard11 /> */}
                {/* Card (Recent Activity) */}
                {/* <DashboardCard12 /> */}
                {/* Card (Income/Expenses) */}
                {/* <DashboardCard13 /> */} </div>
        </div>
    )
}
