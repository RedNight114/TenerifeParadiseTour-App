"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, X, Printer, FileText, Shield, ChevronRight, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Footer() {
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  const [showTerminos, setShowTerminos] = useState(false)
  const [showPrivacidad, setShowPrivacidad] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([])

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (showTerminos || showPrivacidad) {
      document.body.style.overflow = "hidden"
      // Pequeño retraso para la animación
      setTimeout(() => setModalVisible(true), 10)
    } else {
      setModalVisible(false)
      // Pequeño retraso antes de restaurar el scroll
      setTimeout(() => {
        document.body.style.overflow = "auto"
      }, 300)
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showTerminos, showPrivacidad])

  const handlePrint = () => {
    window.print()
  }

  const handleExcursionesClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/excursiones")
  }

  // Redirigir al login en lugar de directamente al dashboard
  const handleAdminAccess = () => {
    router.push("/login")
  }

  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "¿Cómo puedo reservar una excursión?",
      answer: "Puede reservar a través de nuestra web, por teléfono o visitando nuestra oficina en Santa Cruz.",
    },
    {
      question: "¿Cuál es la política de cancelación?",
      answer: "Cancelaciones con 48h de antelación reciben reembolso completo. Menos de 48h, se cobra el 50%.",
    },
    {
      question: "¿Las excursiones incluyen recogida en el hotel?",
      answer:
        "Sí, todas nuestras excursiones incluyen recogida y regreso a su alojamiento en las zonas turísticas principales.",
    },
  ]

  return (
    <>
      <footer className="bg-gray-50 border-t border-gray-200 pt-8 pb-6">
        <div className="container mx-auto px-4">
          {/* Grid principal responsivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo y descripción */}
            <div className="col-span-1 flex flex-col items-center sm:items-start">
              <div className="flex items-center mb-4" onDoubleClick={handleAdminAccess}>
                <Image src="/logo.png" alt="Tenerife Paradise Tours" width={60} height={60} className="mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Tenerife Paradise Tours</h3>
              </div>
              <p className="text-gray-600 mb-4 text-center sm:text-left">
                Ofrecemos las mejores excursiones y experiencias para hacer de tus vacaciones en Tenerife un recuerdo
                inolvidable.
              </p>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-500 hover:text-primary transition-colors p-2" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors p-2" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors p-2" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-primary text-center sm:text-left">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-primary transition-colors flex items-center justify-center sm:justify-start"
                  >
                    <ChevronRight className="h-5 w-5 text-primary/70 mr-1" />
                    <span>Inicio</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/excursiones"
                    className="text-gray-600 hover:text-primary transition-colors flex items-center justify-center sm:justify-start"
                  >
                    <ChevronRight className="h-5 w-5 text-primary/70 mr-1" />
                    <span className="flex items-center">
                      Excursiones
                      <span className="ml-2 px-2 py-0.5 text-xs bg-secondary text-white rounded-full">Ver todas</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre-nosotros"
                    className="text-gray-600 hover:text-primary transition-colors flex items-center justify-center sm:justify-start"
                  >
                    <ChevronRight className="h-5 w-5 text-primary/70 mr-1" />
                    <span>Sobre Nosotros</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-gray-600 hover:text-primary transition-colors flex items-center justify-center sm:justify-start"
                  >
                    <ChevronRight className="h-5 w-5 text-primary/70 mr-1" />
                    <span>Contacto</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowTerminos(true)}
                    className="text-gray-600 hover:text-primary transition-colors text-left w-full flex items-center justify-center sm:justify-start"
                  >
                    <ChevronRight className="h-5 w-5 text-primary/70 mr-1" />
                    <span>Términos y Condiciones</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacidad(true)}
                    className="text-gray-600 hover:text-primary transition-colors text-left w-full flex items-center justify-center sm:justify-start"
                  >
                    <ChevronRight className="h-5 w-5 text-primary/70 mr-1" />
                    <span>Política de Privacidad</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-primary text-center sm:text-left">Contacto</h4>
              <ul className="space-y-3">
                <li className="flex items-start justify-center sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-600">Calle Principal 123, Santa Cruz de Tenerife, 38001</span>
                </li>
                <li className="flex items-start justify-center sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-600">+34 922 345 678</span>
                </li>
                <li className="flex items-start justify-center sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600">info@tenerifeparadisetours.com</span>
                </li>
              </ul>
            </div>

            {/* Preguntas frecuentes */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-primary text-center sm:text-left">Preguntas Frecuentes</h4>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-3 text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 rounded-lg"
                      aria-expanded={expandedFaqs.includes(index)}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-medium text-left text-sm">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-primary transition-transform ${
                          expandedFaqs.includes(index) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedFaqs.includes(index) ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <p className="p-3 pt-0 text-sm text-gray-600 border-t border-gray-100">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer inferior */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
                © {currentYear} Tenerife Paradise Tours. Todos los derechos reservados.
                <button
                  onClick={handleAdminAccess}
                  className="ml-1 text-gray-400 hover:text-gray-500 transition-opacity opacity-50 hover:opacity-100 focus:outline-none"
                  aria-label="Área de administración"
                >
                  <span className="inline-block w-4 h-4">·</span>
                </button>
              </p>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start">
                  <span className="text-primary mr-2">♥</span> Diseñado y desarrollado con amor para amantes de Tenerife
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal estilizado de Términos y Condiciones - Optimizado para móvil */}
      {showTerminos && (
        <div
          className={`fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${modalVisible ? "opacity-100" : "opacity-0"}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowTerminos(false)
          }}
        >
          <div
            className={`bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full transition-transform duration-300 ${modalVisible ? "translate-y-0" : "translate-y-8"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 border-b border-gray-100 rounded-t-xl">
              <div className="flex justify-between items-center p-4 sm:p-6">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Términos y Condiciones</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Imprimir"
                    title="Imprimir"
                  >
                    <Printer className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowTerminos(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-4">
              <div className="prose max-w-none text-gray-700">
                <div className="bg-blue-50 border-l-4 border-primary p-3 sm:p-4 mb-6">
                  <p className="text-sm text-blue-700">
                    Última actualización: 10 de mayo de 2025. Por favor, lea detenidamente estos términos antes de
                    utilizar nuestros servicios.
                  </p>
                </div>

                <section className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 flex-shrink-0">
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    1. Introducción y Aceptación
                  </h3>
                  <div className="pl-6 sm:pl-9">
                    <p className="mb-3">
                      Bienvenido a Tenerife Paradise Tours. Estos Términos y Condiciones regulan el uso de nuestro sitio
                      web y la contratación de nuestros servicios de excursiones y actividades turísticas.
                    </p>
                    <p className="mb-3">
                      Al acceder a nuestro sitio web, registrarse como usuario o contratar cualquiera de nuestros
                      servicios, usted acepta quedar vinculado por estos términos y condiciones.
                    </p>
                  </div>
                </section>

                {/* Resto de secciones similares... */}
                <section className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 flex-shrink-0">
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    2. Condiciones de Uso del Servicio
                  </h3>
                  <div className="pl-6 sm:pl-9">
                    <p className="mb-3">
                      El usuario se compromete a utilizar el sitio web y los servicios de conformidad con la ley, estos
                      términos y condiciones, la moral y las buenas costumbres generalmente aceptadas y el orden
                      público.
                    </p>
                    <p className="mb-3">
                      El usuario se obliga a abstenerse de utilizar el sitio web y los servicios con fines o efectos
                      ilícitos, contrarios a lo establecido en estos términos, lesivos de los derechos e intereses de
                      terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el sitio web
                      o impedir la normal utilización del sitio web por parte de otros usuarios.
                    </p>
                  </div>
                </section>

                <div className="border-t border-gray-200 pt-4 mt-6 sm:mt-8">
                  <p className="text-sm text-gray-500">
                    Si tiene alguna pregunta sobre estos términos, por favor contacte con nosotros en{" "}
                    <a href="mailto:legal@tenerifeparadisetours.com" className="text-primary hover:underline">
                      legal@tenerifeparadisetours.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal estilizado de Política de Privacidad - Optimizado para móvil */}
      {showPrivacidad && (
        <div
          className={`fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${modalVisible ? "opacity-100" : "opacity-0"}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPrivacidad(false)
          }}
        >
          <div
            className={`bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full transition-transform duration-300 ${modalVisible ? "translate-y-0" : "translate-y-8"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 border-b border-gray-100 rounded-t-xl">
              <div className="flex justify-between items-center p-4 sm:p-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Política de Privacidad</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Imprimir"
                    title="Imprimir"
                  >
                    <Printer className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowPrivacidad(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-4">
              <div className="prose max-w-none text-gray-700">
                <div className="bg-green-50 border-l-4 border-primary p-3 sm:p-4 mb-6">
                  <p className="text-sm text-green-700">
                    Última actualización: 10 de mayo de 2025. Esta política describe cómo recopilamos, utilizamos y
                    protegemos su información personal.
                  </p>
                </div>

                <section className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 flex-shrink-0">
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    1. Responsable del Tratamiento
                  </h3>
                  <div className="pl-6 sm:pl-9">
                    <p className="mb-3">
                      Tenerife Paradise Tours S.L. (en adelante, "Tenerife Paradise Tours") es el responsable del
                      tratamiento de los datos personales que usted nos proporciona.
                    </p>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-3">
                      <p className="mb-1">
                        <strong className="text-gray-700">Dirección:</strong> Calle Principal 123, Santa Cruz de
                        Tenerife, 38001, España
                      </p>
                      <p className="mb-1">
                        <strong className="text-gray-700">Email:</strong>{" "}
                        <a href="mailto:privacidad@tenerifeparadisetours.com" className="text-primary hover:underline">
                          privacidad@tenerifeparadisetours.com
                        </a>
                      </p>
                      <p>
                        <strong className="text-gray-700">Teléfono:</strong> +34 922 345 678
                      </p>
                    </div>
                  </div>
                </section>

                {/* Resto de secciones similares... */}
                <section className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 flex-shrink-0">
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    2. Datos que Recopilamos
                  </h3>
                  <div className="pl-6 sm:pl-9">
                    <p className="mb-3">Podemos recopilar y procesar los siguientes datos personales:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-3">
                      <li>
                        <strong className="text-gray-700">Datos de identificación:</strong> nombre, apellidos,
                        DNI/NIE/Pasaporte, fecha de nacimiento.
                      </li>
                      <li>
                        <strong className="text-gray-700">Datos de contacto:</strong> dirección postal, dirección de
                        correo electrónico, número de teléfono.
                      </li>
                      <li>
                        <strong className="text-gray-700">Datos de pago:</strong> información de tarjeta de
                        crédito/débito (procesada de forma segura a través de nuestros proveedores de pago).
                      </li>
                    </ul>
                  </div>
                </section>

                <div className="border-t border-gray-200 pt-4 mt-6 sm:mt-8">
                  <p className="text-sm text-gray-500">
                    Para ejercer sus derechos o si tiene alguna pregunta sobre nuestra política de privacidad, por favor
                    contacte con nosotros en{" "}
                    <a href="mailto:privacidad@tenerifeparadisetours.com" className="text-primary hover:underline">
                      privacidad@tenerifeparadisetours.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para impresión */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .prose, .prose * {
            visibility: visible;
          }
          .prose {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2rem;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
