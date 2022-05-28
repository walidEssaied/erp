import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

function DashboardCard02({ vent, vents, achats }) {

  const [t, i18n] = useTranslation()

  const [chartDatavent, setCahrtdatavent] = useState()

  
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
    if(vents) {
      const chartData = {
        labels: [
          '12-01-2020', '01-01-2021', '02-01-2021',
        ],
        datasets: [
          // Indigo line
          {
            data: vents,
            fill: true,
            backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.08)`,
            borderColor: tailwindConfig().theme.colors.green[500],
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.green[500],
            clip: 20,
          },
          // Red line
          {
            data: achats,
            borderColor: tailwindConfig().theme.colors.green  [300],
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.green [300],
            clip: 20,
          },
        ],
      };
      setCahrtdatavent(chartData)
    }
  }, [vents])

 
  return (
    <div className="flex flex-col col-span-full sm:col-span-4 xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          {/* <EditMenu className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
            </li>
          </EditMenu> */}
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">{t('avchart')}</h2>
        {/* <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Sales</div> */}
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2"><span className="text-green-500">$</span>{vent/3} </div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div> */}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {chartDatavent ?
          <LineChart data={chartDatavent} width={389} height={128} />
          : "loading"}
      </div>
    </div>
  );
}

export default DashboardCard02;
