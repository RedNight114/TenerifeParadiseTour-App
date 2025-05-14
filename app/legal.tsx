import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Book, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Información Legal | TravelExcursiones",
  description: "Términos y condiciones y política de privacidad de TravelExcursiones.",
}

export default function LegalPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Información Legal</h1>
          <p className="text-white/80 max-w-3xl">
            Consulta nuestros términos y condiciones y nuestra política de privacidad para conocer tus derechos y
            obligaciones al utilizar nuestros servicios.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs para alternar entre términos y privacidad */}
        <Tabs defaultValue="terminos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="terminos" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Términos y Condiciones</span>
            </TabsTrigger>
            <TabsTrigger value="privacidad" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Política de Privacidad</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido de Términos y Condiciones */}
          <TabsContent value="terminos" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              {/* Introducción */}
              <section className="mb-8" id="terminos-introduccion">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Introducción y Aceptación</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Bienvenido a TravelExcursiones. Estos Términos y Condiciones regulan el uso de nuestro sitio web y
                    la contratación de nuestros servicios de excursiones y actividades turísticas.
                  </p>

                  <p>
                    Al acceder a nuestro sitio web, registrarse como usuario o contratar cualquiera de nuestros
                    servicios, usted acepta quedar vinculado por estos términos y condiciones. Si no está de acuerdo con
                    alguna parte de estos términos, le rogamos que no utilice nuestro sitio web ni contrate nuestros
                    servicios.
                  </p>

                  <p>
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones
                    entrarán en vigor desde su publicación en el sitio web. Es responsabilidad del usuario revisar
                    periódicamente estos términos.
                  </p>
                </div>
              </section>

              {/* Condiciones de uso */}
              <section className="mb-8" id="terminos-condiciones-uso">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Condiciones de Uso del Servicio</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    El usuario se compromete a utilizar el sitio web y los servicios de conformidad con la ley, estos
                    términos y condiciones, la moral y las buenas costumbres generalmente aceptadas y el orden público.
                  </p>

                  <p>
                    El usuario se obliga a abstenerse de utilizar el sitio web y los servicios con fines o efectos
                    ilícitos, contrarios a lo establecido en estos términos, lesivos de los derechos e intereses de
                    terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el sitio web o
                    impedir la normal utilización del sitio web por parte de otros usuarios.
                  </p>

                  <p>
                    TravelExcursiones se reserva el derecho de denegar o retirar el acceso al sitio web y/o a los
                    servicios, en cualquier momento y sin necesidad de preaviso, a aquellos usuarios que incumplan estos
                    términos y condiciones.
                  </p>
                </div>
              </section>

              {/* Proceso de reserva */}
              <section className="mb-8" id="terminos-proceso-reserva">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Proceso de Reserva</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    Para realizar una reserva, el usuario deberá seguir el procedimiento establecido en el sitio web,
                    proporcionando la información solicitada de manera veraz y completa.
                  </p>

                  <p>
                    Una vez completado el proceso de reserva y efectuado el pago correspondiente, el usuario recibirá
                    una confirmación de su reserva por correo electrónico. Esta confirmación constituirá el documento
                    acreditativo de la reserva.
                  </p>

                  <p>
                    TravelExcursiones se reserva el derecho de rechazar cualquier reserva a su sola discreción,
                    reembolsando al usuario el importe abonado en caso de que ya se hubiera efectuado el pago.
                  </p>

                  <p>
                    Los precios indicados en el sitio web incluyen el IVA y cualquier otro impuesto aplicable, salvo que
                    se indique lo contrario. Los precios pueden ser modificados en cualquier momento, pero los cambios
                    no afectarán a las reservas ya confirmadas.
                  </p>
                </div>
              </section>

              {/* Política de cancelaciones */}
              <section className="mb-8" id="terminos-cancelaciones">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Política de Cancelaciones y Reembolsos</h2>
                <div className="text-gray-700 space-y-4">
                  <p>El usuario podrá cancelar su reserva en cualquier momento, sujeto a las siguientes condiciones:</p>

                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Cancelaciones realizadas con más de 7 días de antelación a la fecha de la excursión: reembolso del
                      100% del importe abonado.
                    </li>
                    <li>
                      Cancelaciones realizadas entre 3 y 7 días de antelación: reembolso del 50% del importe abonado.
                    </li>
                    <li>
                      Cancelaciones realizadas con menos de 3 días de antelación: no se realizará reembolso alguno.
                    </li>
                  </ul>

                  <p>
                    TravelExcursiones se reserva el derecho de cancelar cualquier excursión por causas de fuerza mayor,
                    condiciones meteorológicas adversas o no alcanzar el número mínimo de participantes. En estos casos,
                    se ofrecerá al usuario la posibilidad de cambiar la fecha de la excursión o recibir un reembolso
                    completo del importe abonado.
                  </p>

                  <p>
                    Las solicitudes de cancelación deberán realizarse por escrito, enviando un correo electrónico a la
                    dirección indicada en la confirmación de la reserva.
                  </p>
                </div>
              </section>

              {/* Más secciones de términos... */}
              <section className="mb-8" id="terminos-responsabilidades">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Responsabilidades y Limitaciones</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    TravelExcursiones se compromete a prestar los servicios con la máxima diligencia y profesionalidad,
                    garantizando la calidad y seguridad de los mismos.
                  </p>

                  <p>
                    El usuario se compromete a seguir las instrucciones de los guías y personal de TravelExcursiones
                    durante las excursiones, así como a respetar las normas de seguridad y comportamiento establecidas.
                  </p>

                  <p>
                    TravelExcursiones no será responsable de los daños o perjuicios que puedan derivarse del
                    incumplimiento por parte del usuario de las instrucciones dadas o de las normas de seguridad
                    establecidas.
                  </p>
                </div>
              </section>

              <div className="text-gray-600 text-sm mt-8 pt-4 border-t border-gray-200">
                <p>Última actualización: 10 de mayo de 2025</p>
              </div>
            </div>
          </TabsContent>

          {/* Contenido de Política de Privacidad */}
          <TabsContent value="privacidad" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <section className="mb-8" id="privacidad-responsable">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Responsable del Tratamiento</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    TravelExcursiones S.L. (en adelante, "TravelExcursiones") es el responsable del tratamiento de los
                    datos personales que usted nos proporciona.
                  </p>
                  <p>
                    <strong>Dirección:</strong> Calle Principal 123, Ciudad Turística, 28001, España
                    <br />
                    <strong>Email:</strong> privacidad@travelexcursiones.com
                    <br />
                    <strong>Teléfono:</strong> +34 912 345 678
                  </p>
                </div>
              </section>

              <section className="mb-8" id="privacidad-datos">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Datos que Recopilamos</h2>
                <div className="text-gray-700 space-y-4">
                  <p>Podemos recopilar y procesar los siguientes datos personales:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Datos de identificación:</strong> nombre, apellidos, DNI/NIE/Pasaporte, fecha de
                      nacimiento.
                    </li>
                    <li>
                      <strong>Datos de contacto:</strong> dirección postal, dirección de correo electrónico, número de
                      teléfono.
                    </li>
                    <li>
                      <strong>Datos de pago:</strong> información de tarjeta de crédito/débito (procesada de forma
                      segura a través de nuestros proveedores de pago).
                    </li>
                    <li>
                      <strong>Datos de la reserva:</strong> información sobre las excursiones reservadas, fechas, número
                      de participantes, preferencias especiales.
                    </li>
                    <li>
                      <strong>Datos de uso del sitio web:</strong> dirección IP, tipo de navegador, páginas visitadas,
                      interacciones con el sitio.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8" id="privacidad-finalidad">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Finalidad del Tratamiento</h2>
                <div className="text-gray-700 space-y-4">
                  <p>Tratamos sus datos personales para los siguientes fines:</p>
                  <ul className="list-disc pl-5 space-y-2">
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
                </div>
              </section>

              {/* Más secciones de privacidad... */}
              <section className="mb-8" id="privacidad-derechos">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Derechos de los Usuarios</h2>
                <div className="text-gray-700 space-y-4">
                  <p>Usted tiene los siguientes derechos en relación con sus datos personales:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Acceso:</strong> derecho a obtener confirmación sobre si estamos tratando sus datos
                      personales y, en tal caso, acceder a ellos.
                    </li>
                    <li>
                      <strong>Rectificación:</strong> derecho a solicitar la rectificación de datos inexactos o
                      incompletos.
                    </li>
                    <li>
                      <strong>Supresión:</strong> derecho a solicitar la eliminación de sus datos personales cuando ya
                      no sean necesarios para los fines para los que fueron recogidos.
                    </li>
                    <li>
                      <strong>Limitación:</strong> derecho a solicitar la limitación del tratamiento de sus datos en
                      determinadas circunstancias.
                    </li>
                    <li>
                      <strong>Portabilidad:</strong> derecho a recibir sus datos en un formato estructurado, de uso
                      común y lectura mecánica, y a transmitirlos a otro responsable.
                    </li>
                    <li>
                      <strong>Oposición:</strong> derecho a oponerse al tratamiento de sus datos en determinadas
                      circunstancias.
                    </li>
                  </ul>
                </div>
              </section>

              <div className="text-gray-600 text-sm mt-8 pt-4 border-t border-gray-200">
                <p>Última actualización: 10 de mayo de 2025</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA final */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            ¿Tienes preguntas sobre nuestra información legal?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo está disponible para resolver cualquier duda que puedas tener sobre nuestros términos y
            condiciones o política de privacidad.
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
