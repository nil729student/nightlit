import Link from "next/link";


export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-5xl font-bold mb-4 text-yellow-300">¡No te pierdas lo mejor!</h1>
            <p className="text-lg max-w-2xl text-center mb-6">
                Bienvenido a el lugar donde se vive la vida al maximo. Aquí encontrarás discotecas, eventos, festivales, todos valorados por los usuarios como tú, para que descubras los mejores planes y no te pierdas ninguna fiesta legedaria.        </p>
            <p className="text-lg max-w-2xl text-center mb-6">
                ¿Quieres organizar tu propio evento?¡Crea uno y deja que todos lo descubran y voten! --{'>'} <Link href="http://localhost:3000/register/owner" className="underline" >Register as Owner</Link>
            </p>
            <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg max-w-lg w-full text-center">
                <p className="mb-4">¿Tienes alguna duda o sugerencia? ¡Contáctanos!</p>
                <hr className="my-4" />
                Si eres propietario de una discoteca o evento ya existente, contáctanos y te daremos acceso para que puedas gestionar tu perfil y compartir tus mejores fiestas.

                <hr className="my-4" />
                <h2 className="text-3xl font-bold mb-4 text-purple-600">Contacto</h2>
                <p className="mb-2"><span className="font-semibold">Correo:</span> contacto@fiestaweb.com</p>

                <h3 className="text-2xl font-semibold text-pink-500 mb-2">Síguenos en nuestras redes:</h3>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">📘</a>
                    <a href="#" className="text-pink-500 hover:text-pink-700 text-2xl">📷</a>
                    <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl">🐦</a>
                </div>
            </div>
        </div>
    );
}
