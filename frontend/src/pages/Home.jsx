import React from 'react';

import '../assets/styles/Home.css'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Main from '../components/template/Main'
import Footer from '../components/template/Footer'


export default props =>
    <div className="home">
        <header>
            <Main />  {/* Header invocado aqui */}
            <Logo />
        </header>

        <div className="main-content">
            <Nav />  {/* Sidebar */}
            <section className="content">
                <h2>Bem-vindo à nossa página inicial!</h2>
                <a href="/create-event" className="button style">Iniciar dia de Piripake!</a>
                <br /><br /><br />
                <p>
                   <a href="/events" className="button2 style2">Evento já inciado</a>
                </p>
            </section>
        </div>
        <Footer />
    </div>
