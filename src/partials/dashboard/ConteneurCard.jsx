import { t } from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';

function ConteneurCard({ clients }) {

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
        <h2 className="font-semibold text-slate-800">{t('va')} 115 Conteneur(s)</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2 space-x-reverse">
                  <div className="font-semibold text-left">Type</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Poids</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Prix</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Quantite</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('actions')}</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
                <tr>
                  <td className="p-2">
                    <Link to="#">
                      <div className="flex items-center">
                        <div className="text-blue-500 hover:underline">Lama</div>
                      </div>
                    </Link>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">0.75 KG</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">1.5 DT</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">50</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-red-500">
                      <button className="mr-3 bg-blue-500 px-2 text-white rounded">
                        <Link to="#">
                          {t('voir')}
                        </Link>
                      </button>
                      <button className="mr-3 bg-red-500 px-2 text-white rounded" onClick={() => {  }}>{t('supprimer')}</button>
                    </div>
                  </td>
                </tr>
                <tr>
                <td className="p-2">
                  <Link to="#">
                    <div className="flex items-center">
                      <div className="text-blue-500 hover:underline">Conteneur normal</div>
                    </div>
                  </Link>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">4 KG</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">2.5 DT</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">65</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-red-500">
                    <button className="mr-3 bg-blue-500 px-2 text-white rounded">
                      <Link to="#">
                        {t('voir')}
                      </Link>
                    </button>
                    <button className="mr-3 bg-red-500 px-2 text-white rounded" onClick={() => { }}>{t('supprimer')}</button>
                  </div>
                </td>
              </tr>

              {/* Row */}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default ConteneurCard;
