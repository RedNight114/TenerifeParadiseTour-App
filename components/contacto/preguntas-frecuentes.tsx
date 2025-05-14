import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PreguntasFrecuentes() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Preguntas frecuentes</CardTitle>
        <CardDescription>Respuestas a las dudas más comunes sobre nuestros servicios.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">¿Cómo puedo reservar una excursión?</AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Puedes reservar nuestras excursiones directamente en nuestra página web seleccionando la excursión que te
              interese y haciendo clic en el botón "Reservar". También puedes llamarnos por teléfono o enviarnos un
              email con tus datos y preferencias.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">¿Cuál es la política de cancelación?</AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Puedes cancelar tu reserva hasta 48 horas antes de la excursión con un reembolso completo. Las
              cancelaciones realizadas entre 48 y 24 horas antes tendrán un cargo del 50%. Las cancelaciones con menos
              de 24 horas de antelación no son reembolsables.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">¿Qué debo llevar a las excursiones?</AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Recomendamos llevar ropa y calzado cómodo, protección solar, agua y una pequeña mochila para tus
              pertenencias. Dependiendo de la excursión específica, te enviaremos recomendaciones adicionales en el
              email de confirmación.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">¿Las excursiones son adecuadas para niños?</AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              La mayoría de nuestras excursiones son aptas para todas las edades, pero algunas pueden tener
              restricciones. En la descripción de cada excursión encontrarás información específica sobre la edad mínima
              recomendada y la dificultad.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">¿Ofrecen descuentos para grupos?</AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Sí, ofrecemos descuentos especiales para grupos a partir de 10 personas. Contacta con nuestro equipo de
              reservas para obtener un presupuesto personalizado para tu grupo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
