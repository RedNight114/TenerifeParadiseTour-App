import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SeccionTerminos } from "@/components/terminos/seccion-terminos"
import { NavegacionTerminos } from "@/components/terminos/navegacion-terminos"

export const metadata: Metadata = {
  title: "Términos y Condiciones | TravelExcursiones",
  description:
    "Términos y condiciones legales para el uso de nuestros servicios de excursiones y actividades turísticas.",
}

export default function TerminosPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Términos y Condiciones</h1>
          <p className="text-white/80 max-w-3xl">
            Por favor, lea detenidamente estos términos y condiciones antes de utilizar nuestros servicios. Al utilizar
            nuestro sitio web y contratar nuestras excursiones, usted acepta cumplir con estos términos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navegación de términos */}
        <NavegacionTerminos />

        {/* Contenido principal */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 md:p-8">
          {/* Introducción */}
          <SeccionTerminos
            id="introduccion"
            titulo="1. Introducción y Aceptación"
            contenido={`
              <p>Bienvenido a TravelExcursiones. Estos Términos y Condiciones regulan el uso de nuestro sitio web y la contratación de nuestros servicios de excursiones y actividades turísticas.</p>
              
              <p>Al acceder a nuestro sitio web, registrarse como usuario o contratar cualquiera de nuestros servicios, usted acepta quedar vinculado por estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestro sitio web ni contrate nuestros servicios.</p>
              
              <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web. Es responsabilidad del usuario revisar periódicamente estos términos.</p>
            `}
          />

          {/* Condiciones de uso */}
          <SeccionTerminos
            id="condiciones-uso"
            titulo="2. Condiciones de Uso del Servicio"
            contenido={`
              <p>El usuario se compromete a utilizar el sitio web y los servicios de conformidad con la ley, estos términos y condiciones, la moral y las buenas costumbres generalmente aceptadas y el orden público.</p>
              
              <p>El usuario se obliga a abstenerse de utilizar el sitio web y los servicios con fines o efectos ilícitos, contrarios a lo establecido en estos términos, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el sitio web o impedir la normal utilización del sitio web por parte de otros usuarios.</p>
              
              <p>TravelExcursiones se reserva el derecho de denegar o retirar el acceso al sitio web y/o a los servicios, en cualquier momento y sin necesidad de preaviso, a aquellos usuarios que incumplan estos términos y condiciones.</p>
            `}
          />

          {/* Proceso de reserva */}
          <SeccionTerminos
            id="proceso-reserva"
            titulo="3. Proceso de Reserva"
            contenido={`
              <p>Para realizar una reserva, el usuario deberá seguir el procedimiento establecido en el sitio web, proporcionando la información solicitada de manera veraz y completa.</p>
              
              <p>Una vez completado el proceso de reserva y efectuado el pago correspondiente, el usuario recibirá una confirmación de su reserva por correo electrónico. Esta confirmación constituirá el documento acreditativo de la reserva.</p>
              
              <p>TravelExcursiones se reserva el derecho de rechazar cualquier reserva a su sola discreción, reembolsando al usuario el importe abonado en caso de que ya se hubiera efectuado el pago.</p>
              
              <p>Los precios indicados en el sitio web incluyen el IVA y cualquier otro impuesto aplicable, salvo que se indique lo contrario. Los precios pueden ser modificados en cualquier momento, pero los cambios no afectarán a las reservas ya confirmadas.</p>
            `}
          />

          {/* Política de cancelaciones */}
          <SeccionTerminos
            id="cancelaciones"
            titulo="4. Política de Cancelaciones y Reembolsos"
            contenido={`
              <p>El usuario podrá cancelar su reserva en cualquier momento, sujeto a las siguientes condiciones:</p>
              
              <ul class="list-disc pl-5 space-y-2 my-3">
                <li>Cancelaciones realizadas con más de 7 días de antelación a la fecha de la excursión: reembolso del 100% del importe abonado.</li>
                <li>Cancelaciones realizadas entre 3 y 7 días de antelación: reembolso del 50% del importe abonado.</li>
                <li>Cancelaciones realizadas con menos de 3 días de antelación: no se realizará reembolso alguno.</li>
              </ul>
              
              <p>TravelExcursiones se reserva el derecho de cancelar cualquier excursión por causas de fuerza mayor, condiciones meteorológicas adversas o no alcanzar el número mínimo de participantes. En estos casos, se ofrecerá al usuario la posibilidad de cambiar la fecha de la excursión o recibir un reembolso completo del importe abonado.</p>
              
              <p>Las solicitudes de cancelación deberán realizarse por escrito, enviando un correo electrónico a la dirección indicada en la confirmación de la reserva.</p>
            `}
          />

          {/* Responsabilidades */}
          <SeccionTerminos
            id="responsabilidades"
            titulo="5. Responsabilidades y Limitaciones"
            contenido={`
              <p>TravelExcursiones se compromete a prestar los servicios con la máxima diligencia y profesionalidad, garantizando la calidad y seguridad de los mismos.</p>
              
              <p>El usuario se compromete a seguir las instrucciones de los guías y personal de TravelExcursiones durante las excursiones, así como a respetar las normas de seguridad y comportamiento establecidas.</p>
              
              <p>TravelExcursiones no será responsable de los daños o perjuicios que puedan derivarse del incumplimiento por parte del usuario de las instrucciones dadas o de las normas de seguridad establecidas.</p>
              
              <p>TravelExcursiones recomienda a todos los usuarios que contraten un seguro de viaje que cubra posibles incidencias durante las excursiones.</p>
              
              <p>TravelExcursiones no será responsable de los retrasos o incumplimientos en la prestación de los servicios cuando estos se deban a causas de fuerza mayor, condiciones meteorológicas adversas u otras circunstancias ajenas a su control.</p>
            `}
          />

          {/* Propiedad intelectual */}
          <SeccionTerminos
            id="propiedad-intelectual"
            titulo="6. Propiedad Intelectual"
            contenido={`
              <p>Todos los contenidos del sitio web, incluyendo, sin limitación, textos, gráficos, imágenes, logotipos, iconos, software y cualquier otro material, son propiedad de TravelExcursiones o de sus proveedores de contenidos, y están protegidos por las leyes de propiedad intelectual e industrial.</p>
              
              <p>El usuario se compromete a no reproducir, copiar, distribuir, poner a disposición, comunicar públicamente, transformar o modificar dichos contenidos sin la autorización previa y por escrito de TravelExcursiones.</p>
              
              <p>El usuario podrá visualizar y obtener una copia privada temporal de los contenidos para su uso personal y privado en sus sistemas informáticos, siempre que no sea con la finalidad de desarrollar actividades de carácter comercial o profesional.</p>
            `}
          />

          {/* Privacidad */}
          <SeccionTerminos
            id="privacidad"
            titulo="7. Política de Privacidad"
            contenido={`
              <p>TravelExcursiones se compromete a proteger la privacidad de los usuarios del sitio web. La información personal que el usuario proporcione será tratada conforme a nuestra Política de Privacidad, que forma parte integrante de estos términos y condiciones.</p>
              
              <p>Al utilizar nuestro sitio web y contratar nuestros servicios, el usuario consiente el tratamiento de sus datos personales conforme a lo establecido en nuestra Política de Privacidad.</p>
              
              <p>Para más información sobre el tratamiento de sus datos personales, consulte nuestra <a href="/privacidad" class="text-blue-600 hover:underline">Política de Privacidad</a>.</p>
            `}
          />

          {/* Modificaciones */}
          <SeccionTerminos
            id="modificaciones"
            titulo="8. Modificaciones de los Términos"
            contenido={`
              <p>TravelExcursiones se reserva el derecho de modificar estos términos y condiciones en cualquier momento, publicando la versión actualizada en el sitio web. Las modificaciones entrarán en vigor desde su publicación.</p>
              
              <p>El uso continuado del sitio web o de los servicios después de la publicación de cualquier modificación constituirá la aceptación de dichas modificaciones por parte del usuario.</p>
              
              <p>Se recomienda a los usuarios que revisen periódicamente estos términos y condiciones para estar informados de cualquier cambio.</p>
            `}
          />

          {/* Ley aplicable */}
          <SeccionTerminos
            id="ley-aplicable"
            titulo="9. Ley Aplicable y Jurisdicción"
            contenido={`
              <p>Estos términos y condiciones se regirán e interpretarán de acuerdo con la legislación española.</p>
              
              <p>Para la resolución de cualquier controversia que pudiera surgir en relación con el uso del sitio web o la contratación de los servicios, las partes se someten a la jurisdicción de los Juzgados y Tribunales de la ciudad de Madrid, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.</p>
              
              <p>No obstante lo anterior, si el usuario tiene la condición de consumidor según la normativa aplicable, la competencia jurisdiccional corresponderá a los Juzgados y Tribunales del domicilio del usuario.</p>
            `}
          />
        </div>

        {/* CTA final */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            ¿Tienes alguna pregunta sobre nuestros términos?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de atención al cliente está disponible para resolver cualquier duda que puedas tener sobre
            nuestros términos y condiciones o servicios.
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
