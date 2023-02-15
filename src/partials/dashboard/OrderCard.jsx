import { t } from 'i18next';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function OrderCard({ orders }) {

  const [t, i18n] = useTranslation()

  useEffect(() => {
    console.log({ orders: orders })
  }, [])

  const deleteOrder = (id) => {
    const response = fetch("http://92.222.181.90:1337/orders/" + id, { "method": "DELETE" })
      .then(res => {
        if (res.status == 200) {
          res.json
          window.location.reload()
          window.location.reload()
        }
      })
      .then(res => console.log(res))
  }

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{t('va')} {orders?.length} {t('order')}</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">{t('id')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">{t('type_order')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('quantite')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('prix_total')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('container')}</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">{t('avance')}</div>
                </th> */}
                <th className="p-2">
                  <div className="font-semibold text-center">{t('status')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('actions')}</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {orders?.map((order) => (
                <tr key={order.id}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">{order?.id}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">{order?.type_order}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{order?.quantite}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">$ {order?.prix_total}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{order?.container}</div>
                  </td>
                  {/* <td className="p-2">
                    <div className="text-center">DINAR {order?.avance}</div>
                  </td> */}
                  <td className="p-2">
                    <td className="p-2">{order.status ? <>Payée</> : <>Non payée</>}</td>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-red-500">
                      <button className="mr-3 bg-blue-500 px-2 text-white rounded">
                        <Link to={`/order/${order.id}`}>
                        {t('voir')}
                        </Link>
                      </button>
                      <button className="mr-3 bg-red-500 px-2 text-white rounded" onClick={() => { deleteOrder(client.id) }}>{t('supprimer')}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default OrderCard;
