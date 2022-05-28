import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../partials/actions/Datepicker';
import Banner from '../partials/Banner';
import OrderCard from '../partials/dashboard/OrderCard';
import { UserdataContext } from '../partials/context/UserdataContext';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

function Orders() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(UserdataContext)
  const [orders, setOrders] = useState()

  useEffect(() => {
    if (user) {
      setOrders(JSON.parse(user).orders)
      console.log(JSON.parse(user).orders)
    }
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div></div>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <Link to="/order/neworder">
            <button className="p-2 rounded bg-green-500 text-white font-semibold text-sm">{t('addorder')}</button>
          </Link>
          <Datepicker />
        </div>
      </div>
      <div className="grid">
        <OrderCard orders={orders} />
      </div>
    </div>
  );
}

export default Orders;