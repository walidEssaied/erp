import React from 'react'

export default function TaskCard() {
  return (
      <div className="grid lg:w-1/2">
        <div className="bg-white p-4 shadow-lg border">
            <h3>Taches</h3>
            <p className="text-xs px-2 text-gray-500">Ajouter des taches pour simplifier votre travail</p>
            <div className="p-3">
                <ul className="flex flex-col gap-3">
                    <li>
                        <input type="text" className="rounded-md border-gray-300 px-2 placeholder:text-xs placeholder:text-gray-300" placeholder="➕ Ajouter des taches"/>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <input type="checkbox" className="rounded-md"/>
                    Appele mohamed</li>
                    <li className="flex items-center gap-x-2">
                        <input type="checkbox" className="rounded-md"/>
                    500 kg fraise</li>
                    <li className="flex items-center gap-x-2 line-through text-gray-300">
                        <input type="checkbox" className="rounded-md" checked={true}/>
                    Vérifier paiment</li>
                </ul>
            </div>
        </div>
      </div>
  )
}
