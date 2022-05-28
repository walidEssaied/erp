import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Cookies from 'js-cookie'
import { UserdataContext } from '../partials/context/UserdataContext';

export default function Login() {

    const [identifier, setIdentifier] = useState()
    const [password, setPassword] = useState()
    const { user, setUser } = useContext(UserdataContext)
    const pushTo = useNavigate();

    // useEffect(() => {
    //     if(user) {
    //         pushTo("/")
    //     }
    // }, [])

    const login = async (identifier, password) => {
        const payload = {
            identifier,
            password
        };
        let response = await fetch("https://bold-erp.herokuapp.com/auth/local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(async (res) => {
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenue dans Bold Enterprise.',
                    width: 600,
                    padding: '3em',
                    color: '#171354',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `
                      rgba(0,0,150,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Email et/ou mot de passe incorrect(s)',
                    width: 600,
                    padding: '3em',
                    color: '#171354',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `
                      rgba(150,0,0,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                })
            }
            return res;
        });

        if (response != undefined) {
            var whoami = await response.json();
            if (whoami.user != undefined) {
                if (whoami.user.confirmed) {
                    console.log(whoami.user.username)
                    Cookies.set("identifier", identifier);
                    Cookies.set("password", password);
                    Cookies.set("token", JSON.stringify(whoami.jwt))
                    setUser(JSON.stringify(whoami.user))
                    // console.log(JSON.parse(user).orders)
                    // Cookies.set("orders", JSON.stringify(whoami.user.orders))
                    // Cookies.set("clients", JSON.stringify(whoami.user.clients))
                    // Cookies.set("products", JSON.stringify(whoami.user.products))
                    // Cookies.set("alerts", JSON.stringify(whoami.user.alerts))
                    // Cookies.set("username", JSON.stringify(whoami.user.username))
                    // Cookies.set("userID", JSON.stringify(whoami.user.id))
                    if (whoami.user.role.type == "public") {
                        console.log(whoami.user.username)
                        Swal.fire({
                            icon: 'warning',
                            title: 'Vous devez payer vos factures pour bénifier les services.',
                            width: 600,
                            padding: '3em',
                            color: '#171354',
                            background: '#fff url(/images/trees.png)',
                            backdrop: `
                              rgba(0,0,150,0.4)
                              url("/images/nyan-cat.gif")
                              left top
                              no-repeat
                            `
                        })
                    }
                    // redirect from auth
                    pushTo("/")
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Votre compte est bloqué',
                        width: 600,
                        padding: '3em',
                        color: '#171354',
                        background: '#fff url(/images/trees.png)',
                        backdrop: `
                          rgba(150,0,0,0.4)
                          url("/images/nyan-cat.gif")
                          left top
                          no-repeat
                        `
                    })
                }
            }
        }
    }

    const handelSubmit = async () => {
        await login(identifier, password)
    }

    return (
        <div className="bg-white">
            <div className="grid lg:grid-cols-3">
                <div className="hidden lg:block col-span-2 h-screen">
                    <figure className="h-screen">
                        <img src="https://raw.githubusercontent.com/walidEssaied/erp/main/src/images/login_cover.jpg" className="w-full h-full bg-cover" />
                    </figure>
                </div>
                <div>
                    <div className="w-11/12 lg:w-4/5 m-auto py-40 px-10 flex flex-col gap-y-5">
                        <h2 className="text-3xl text-slate-900 font-bold">Bienvenue sur Bold Entreprise</h2>
                        <p className="ml-3 text-gray-500">Gérez votre travail en toute simplicité et épargnez temps et argent.</p>
                        <div className="flex flex-col gap-y-5">
                            <label htmlFor="email">
                                <input type="email" placeholder="Votre email" name="email" className="rounded-md border-gray-300 shadow-sm px-5"
                                    onChange={
                                        (e) => {
                                            setIdentifier(e.target.value)
                                        }
                                    } />
                            </label>
                            <label htmlFor="password">
                                <input type="password" placeholder="Votre password" name="password" className="rounded-md border-gray-300 shadow-sm px-5"
                                    onChange={
                                        (e) => {
                                            setPassword(e.target.value)
                                        }
                                    } />
                            </label>
                            <label htmlFor="connect">
                                <button className="bg-blue-500 text-white p-2 px-5 rounded-md shadow-sm border border-gray-300 cursor-pointer" onClick={() => handelSubmit()}>Connect</button>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
