import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad | TravelExcursiones",
  description: "Política de privacidad y protección de datos de TravelExcursiones.",
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Política de Privacidad</h1>
          <p className="text-white/80 max-w-3xl">
            En TravelExcursiones nos comprometemos a proteger y respetar su privacidad. Esta política explica cómo
            recopilamos y tratamos sus datos personales.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 md:p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Responsable del Tratamiento</h2>
            <p className="text-gray-700 mb-4">
              TravelExcursiones S.L. (en adelante, "TravelExcursiones") es el responsable del tratamiento de los datos
              personales que usted nos proporciona.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Dirección:</strong> Calle Principal 123, Ciudad Turística, 28001, España
              <br />
              <strong>Email:</strong> privacidad@travelexcursiones.com
              <br />
              <strong>Teléfono:</strong> +34 912 345 678
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Datos que Recopilamos</h2>
            <p className="text-gray-700 mb-4">Podemos recopilar y procesar los siguientes datos personales:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Datos de identificación:</strong> nombre, apellidos, DNI/NIE/Pasaporte, fecha de nacimiento.
              </li>
              <li>
                <strong>Datos de contacto:</strong> dirección postal, dirección de correo electrónico, número de
                teléfono.
              </li>
              <li>
                <strong>Datos de pago:</strong> información de tarjeta de crédito/débito (procesada de forma segura a
                través de nuestros proveedores de pago).
              </li>
              <li>
                <strong>Datos de la reserva:</strong> información sobre las excursiones reservadas, fechas, número de
                participantes, preferencias especiales.
              </li>
              <li>
                <strong>Datos de uso del sitio web:</strong> dirección IP, tipo de navegador, páginas visitadas,
                interacciones con el sitio.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Finalidad del Tratamiento</h2>
            <p className="text-gray-700 mb-4">Tratamos sus datos personales para los siguientes fines:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>Gestionar sus reservas y proporcionar los servicios contratados.</li>
              <li>Procesar los pagos relacionados con nuestros servicios.</li>
              <li>Comunicarnos con usted sobre sus reservas, cambios en nuestros servicios o políticas.</li>
              <li>
                Enviarle información sobre promociones, ofertas y novedades (solo si ha dado su consentimiento
                específico).
              </li>
              <li>Mejorar nuestro sitio web y servicios mediante el análisis de datos de uso.</li>
              <li>Cumplir con nuestras obligaciones legales y fiscales.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Base Legal para el Tratamiento</h2>
            <p className="text-gray-700 mb-4">
              El tratamiento de sus datos personales se basa en las siguientes bases legales:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Ejecución de un contrato:</strong> cuando el tratamiento es necesario para la gestión y
                prestación de los servicios contratados.
              </li>
              <li>
                <strong>Consentimiento:</strong> cuando nos ha dado su consentimiento explícito para tratar sus datos
                con fines específicos, como el envío de comunicaciones comerciales.
              </li>
              <li>
                <strong>Interés legítimo:</strong> cuando el tratamiento responde a un interés legítimo de
                TravelExcursiones, como la mejora de nuestros servicios o la prevención del fraude.
              </li>
              <li>
                <strong>Obligación legal:</strong> cuando el tratamiento es necesario para cumplir con nuestras
                obligaciones legales.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Conservación de Datos</h2>
            <p className="text-gray-700 mb-4">
              Conservaremos sus datos personales durante el tiempo necesario para cumplir con los fines para los que
              fueron recopilados, incluyendo el cumplimiento de requisitos legales, contables o de información.
            </p>
            <p className="text-gray-700 mb-4">
              En general, los datos relacionados con reservas se conservarán durante un período de 5 años desde la
              finalización del servicio, para cumplir con las obligaciones fiscales y atender posibles reclamaciones.
            </p>
            <p className="text-gray-700 mb-4">
              Los datos tratados con fines de marketing se conservarán hasta que usted retire su consentimiento o
              solicite su eliminación.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Destinatarios de los Datos</h2>
            <p className="text-gray-700 mb-4">Sus datos personales pueden ser comunicados a:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Proveedores de servicios:</strong> empresas que nos prestan servicios necesarios para la
                ejecución de nuestras actividades (procesamiento de pagos, alojamiento web, envío de emails, etc.).
              </li>
              <li>
                <strong>Colaboradores:</strong> empresas con las que colaboramos para la prestación de los servicios
                contratados (guías turísticos, empresas de transporte, etc.).
              </li>
              <li>
                <strong>Autoridades competentes:</strong> cuando estemos obligados por ley o en respuesta a un
                requerimiento legal.
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Todos nuestros proveedores de servicios están obligados a tratar sus datos de forma confidencial y segura,
              y solo para los fines específicos que les hemos indicado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Derechos de los Usuarios</h2>
            <p className="text-gray-700 mb-4">
              Usted tiene los siguientes derechos en relación con sus datos personales:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Acceso:</strong> derecho a obtener confirmación sobre si estamos tratando sus datos personales
                y, en tal caso, acceder a ellos.
              </li>
              <li>
                <strong>Rectificación:</strong> derecho a solicitar la rectificación de datos inexactos o incompletos.
              </li>
              <li>
                <strong>Supresión:</strong> derecho a solicitar la eliminación de sus datos personales cuando ya no sean
                necesarios para los fines para los que fueron recogidos.
              </li>
              <li>
                <strong>Limitación:</strong> derecho a solicitar la limitación del tratamiento de sus datos en
                determinadas circunstancias.
              </li>
              <li>
                <strong>Portabilidad:</strong> derecho a recibir sus datos en un formato estructurado, de uso común y
                lectura mecánica, y a transmitirlos a otro responsable.
              </li>
              <li>
                <strong>Oposición:</strong> derecho a oponerse al tratamiento de sus datos en determinadas
                circunstancias.
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Puede ejercer estos derechos enviando un email a privacidad@travelexcursiones.com o por correo postal a
              nuestra dirección, incluyendo una copia de su DNI/NIE/Pasaporte para verificar su identidad.
            </p>
            <p className="text-gray-700 mb-4">
              También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos
              (www.aepd.es) si considera que el tratamiento de sus datos no cumple con la normativa vigente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Medidas de Seguridad</h2>
            <p className="text-gray-700 mb-4">
              Hemos implementado medidas de seguridad técnicas y organizativas adecuadas para proteger sus datos
              personales contra el acceso no autorizado, la pérdida accidental, la alteración o la divulgación.
            </p>
            <p className="text-gray-700 mb-4">
              Estas medidas incluyen, entre otras, el cifrado de datos, controles de acceso, formación del personal y
              procedimientos de gestión de incidentes de seguridad.
            </p>
            <p className="text-gray-700 mb-4">
              Sin embargo, ninguna transmisión de datos por Internet o sistema de almacenamiento puede garantizar una
              seguridad absoluta. Si tiene motivos para creer que su interacción con nosotros ya no es segura, por favor
              notifíquenoslo inmediatamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-700 mb-4">
              Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación,
              analizar el uso del sitio y personalizar el contenido.
            </p>
            <p className="text-gray-700 mb-4">
              Puede configurar su navegador para rechazar todas o algunas cookies, o para alertarle cuando los sitios
              web establecen o acceden a las cookies. Sin embargo, si desactiva o rechaza las cookies, algunas partes de
              nuestro sitio pueden volverse inaccesibles o no funcionar correctamente.
            </p>
            <p className="text-gray-700 mb-4">
              Para más información sobre las cookies que utilizamos, consulte nuestra{" "}
              <Link href="/cookies" className="text-blue-600 hover:underline">
                Política de Cookies
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">10. Cambios en la Política de Privacidad</h2>
            <p className="text-gray-700 mb-4">
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas
              de tratamiento de datos o para cumplir con nuevos requisitos legales.
            </p>
            <p className="text-gray-700 mb-4">
              Las modificaciones entrarán en vigor desde su publicación en el sitio web. Le recomendamos que revise
              periódicamente esta política para estar informado de cómo protegemos su información.
            </p>
            <p className="text-gray-700 mb-4">
              La fecha de la última actualización se indica al final de esta política.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">11. Contacto</h2>
            <p className="text-gray-700 mb-4">
              Si tiene alguna pregunta sobre esta Política de Privacidad o sobre el tratamiento de sus datos personales,
              puede contactar con nuestro Delegado de Protección de Datos:
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> dpo@travelexcursiones.com
              <br />
              <strong>Teléfono:</strong> +34 912 345 679
              <br />
              <strong>Dirección:</strong> Calle Principal 123, Ciudad Turística, 28001, España
            </p>
          </section>

          <div className="text-gray-600 text-sm mt-8 pt-4 border-t border-gray-200">
            <p>Última actualización: 10 de mayo de 2025</p>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            ¿Tienes preguntas sobre nuestra política de privacidad?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de protección de datos está disponible para resolver cualquier duda que puedas tener sobre el
            tratamiento de tus datos personales.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-8 transition-colors"
          >
            Contactar con nosotros
          </Link>
        </div>
      </div>
    </main>
  )
}
