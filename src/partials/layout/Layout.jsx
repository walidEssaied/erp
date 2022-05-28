import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Banner from '../Banner';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import { UserdataContext } from '../context/UserdataContext';
import Login from '../../pages/Login';
import { useTranslation } from 'react-i18next';

export default function Layout(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState()
  // const [token, setToken] = useState(Cookies.get("token"))

  const [loading, setLoading] = useState(true)

  const location = useLocation();
  const { pathname } = location;
  const pushTo = useNavigate()

  const [t, i18n] = useTranslation()

  const updateUserData = async (identifier, password) => {
    const payload = {
      identifier,
      password
    };
    let response = await fetch("http://localhost:1337/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("user updated")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Veuillez vérifier votre compte!',
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
        pushTo("/login")
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
          // Cookies.set("orders", JSON.stringify(whoami.user.orders))
          // Cookies.set("clients", JSON.stringify(whoami.user.clients))
          // Cookies.set("products", JSON.stringify(whoami.user.products))
          // Cookies.set("alerts", JSON.stringify(whoami.user.alerts))
          // Cookies.set("username", JSON.stringify(whoami.user.username))
          // Cookies.set("userID", JSON.stringify(whoami.user.id))
          // Cookies.set("token", JSON.stringify(whoami.jwt))
          if (whoami.user.role.type == "public") {
            console.log(whoami.user)
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
        } else if (whoami.user.bloacked) {
          pushTo("/login")
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

  useEffect(() => {
    if (Cookies.get("identifier") && Cookies.get("password")) {
      const id = Cookies.get("identifier")
      const pass = Cookies.get("password")
      updateUserData(id, pass)
        setLoading(false)
    } else {
      pushTo("/login")
    }
    console.log(user)
    console.log({ afterRemove: user })
  }, [])




  return (
    <UserdataContext.Provider value={{ user, setUser }}>
      {!user ? <Login /> :
        <div className={`flex h-screen overflow-hidden relative ${i18n.language == 'fr' ? "" : "drtl"}`}>
          {/* Sidebar */}
          <div className={i18n.language == "fr" ? "" : "absolute right-0 drtl z-40"}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </div>
          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />

            <main>
              <div className={`px-4 sm:px-6 lg:px-8 py-8  max-w-7xl mx-auto ${i18n.language == "ar" ? "w-4/5 ml-10" : ""}`}>
              {props.children}
              </div>
            </main>

            <Banner />

          </div>
        </div>
      }
    </UserdataContext.Provider>

  );
}
