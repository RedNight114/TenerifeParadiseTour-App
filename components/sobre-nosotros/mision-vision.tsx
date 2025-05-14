import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Compass, Heart, Globe, Shield, Target, Eye, Sparkles } from "lucide-react"

export function MisionVision() {
  const valores = [
    {
      icon: Compass,
      title: "Autenticidad",
      description: "Creamos experiencias genuinas que reflejan la esencia de cada destino.",
    },
    {
      icon: Heart,
      title: "Pasión",
      description: "Amamos lo que hacemos y lo transmitimos en cada excursión.",
    },
    {
      icon: Globe,
      title: "Sostenibilidad",
      description: "Nos comprometemos con el turismo responsable y el respeto al medio ambiente.",
    },
    {
      icon: Shield,
      title: "Seguridad",
      description: "La seguridad de nuestros clientes es nuestra prioridad número uno.",
    },
  ]

  return (
    <section id="mision-vision" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-muted"></div>
        <h2 className="text-3xl font-bold text-center">Misión, Visión y Valores</h2>
        <div className="h-px flex-1 bg-muted"></div>
      </div>

      <Tabs defaultValue="mision" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="mision" className="text-base">
            <Target className="mr-2 h-4 w-4" />
            Misión
          </TabsTrigger>
          <TabsTrigger value="vision" className="text-base">
            <Eye className="mr-2 h-4 w-4" />
            Visión
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mision" className="mt-0">
          <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6 p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
                  <p className="text-muted-foreground">
                    Crear experiencias turísticas memorables que conecten a las personas con la cultura, historia y
                    naturaleza de los destinos que visitan, promoviendo un turismo sostenible y respetuoso con las
                    comunidades locales.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <Sparkles className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Diseñar excursiones únicas que revelen la auténtica esencia de cada lugar
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Sparkles className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Ofrecer un servicio personalizado y de alta calidad a cada cliente
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Sparkles className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Contribuir positivamente a las comunidades y entornos que visitamos
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vision" className="mt-0">
          <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6 p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-4">Nuestra Visión</h3>
                  <p className="text-muted-foreground">
                    Ser reconocidos como la empresa líder en experiencias turísticas de calidad en Europa, destacando
                    por nuestro compromiso con la innovación, la sostenibilidad y la excelencia en el servicio al
                    cliente.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <Sparkles className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Expandir nuestra presencia a nuevos destinos manteniendo nuestra filosofía
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Sparkles className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Liderar la transformación digital en el sector de excursiones turísticas
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Sparkles className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Establecer nuevos estándares de sostenibilidad en la industria del turismo
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-8 text-center">Nuestros Valores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valores.map((valor, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow group">
              <CardContent className="pt-6 p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <valor.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{valor.title}</h4>
                <p className="text-sm text-muted-foreground">{valor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
