import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function ProductCard({ products }) {
  const [t, i18n] = useTranslation()


  const deleteProduct = (id) => {
    const response = fetch("https://bold-erp.herokuapp.com/products/" + id, { "method": "DELETE" })
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
        <h2 className="font-semibold text-slate-800">{t('va')} {products?.length} {t('produit')}</h2>
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
                  <div className="font-semibold text-left">{t('nom')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">{t('prix')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('qte_dispo_total')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('qte_vendu_total')}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">{t('actions')}</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {products?.map((product) => (
                <tr>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">{product.id}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">{product.nom}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">${product.prix}</div>
                  </td>

                  <td className="p-2">
                    <div className="text-center">{product.quantite_disponible } kg</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{product.quantite_vendu_total} kg</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-red-500">
                      <button className="mr-3 bg-blue-500 px-2 text-white rounded">
                        <Link to={`/product/${product.id}`}>
                        {t('voir')}
                        </Link>
                      </button>
                      <button className="mr-3 bg-red-500 px-2 text-white rounded" onClick={() => { deleteProduct(product.id) }}>{t('supprimer')}</button>
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

export default ProductCard;
