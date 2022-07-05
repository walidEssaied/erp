import { t } from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';

function ClientCard({ clients }) {

  const deleteClient = (id) => {
    const response = fetch("https://bold-erp.herokuapp.com/clients/" + id, { "method": "DELETE" })
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
        <h2 className="font-semibold text-slate-800">{t('va')} {clients?.length} {t('client')}</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2 space-x-reverse">
                  <div className="font-semibold text-left">{t('nom')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">{t('email')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">{t('telephone')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('mf')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('address')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('balance')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('actions')}</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {clients?.map((client) => (
                <tr key={client.id}>
                  <td className="p-2">
                    <Link to={`/client/${client.id}`}>
                      <div className="flex items-center">
                        <div className="text-blue-500 hover:underline">{client.nom}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">{client.email}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">{client.telephone}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{client.mf}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{client.address}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-red-500">{client.balance}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-red-500">
                      <button className="mr-3 bg-blue-500 px-2 text-white rounded">
                        <Link to={`/client/${client.id}`}>
                          {t('voir')}
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Row */}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default ClientCard;
