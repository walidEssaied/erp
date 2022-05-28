import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../partials/actions/Datepicker';
import Banner from '../partials/Banner';
import ProductCard from '../partials/dashboard/ProductCard';
import { UserdataContext } from '../partials/context/UserdataContext';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

function Products() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useContext(UserdataContext)
    const [products, setProducts] = useState()
    const [t, i18n] = useTranslation()

    useEffect(() => {
        if (user) {
            setProducts(JSON.parse(user).products)
        }
        console.log(products)
    }, [])

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div></div>
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    <Link to="/product/newproduct">
                        <button className="p-2 rounded bg-green-500 text-white font-semibold text-sm">{t('addproduit')}</button>
                    </Link>
                    <Datepicker />
                </div>
            </div>
            <div className="grid">
                <ProductCard products={products} />
            </div>
        </div>
    );
}

export default Products;
