import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  // Crear un cliente de Supabase para el middleware
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req: request, res })

    // Verificar si hay una sesión activa
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Error de autenticación en middleware:", error.message)
      // Continuar con la solicitud, pero registrar el error
      return res
    }

    // Obtener la ruta actual
    const path = request.nextUrl.pathname

    // Rutas protegidas que requieren autenticación
    if (path.startsWith("/dashboard")) {
      // Si no hay sesión, redirigir al login
      if (!session) {
        const redirectUrl = new URL("/login", request.url)
        redirectUrl.searchParams.set("redirect", path)
        return NextResponse.redirect(redirectUrl)
      }

      // Si hay sesión, verificar el rol para rutas específicas
      if (path.startsWith("/dashboard/admin")) {
        try {
          // Obtener el perfil del usuario para verificar el rol
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single()

          if (profileError) {
            console.error("Error al obtener perfil en middleware:", profileError.message)
            // Si hay error al obtener el perfil, redirigir por seguridad
            return NextResponse.redirect(new URL("/dashboard", request.url))
          }

          // Si no es administrador, redirigir al dashboard general
          if (!profile || profile.role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", request.url))
          }
        } catch (error) {
          console.error("Error inesperado en middleware:", error)
          // Si hay error, redirigir por seguridad
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      }
    }

    // Rutas de autenticación (redirigir si ya está autenticado)
    if ((path === "/login" || path === "/register") && session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return res
  } catch (error) {
    console.error("Error crítico en middleware:", error)
    // En caso de error crítico, permitir la solicitud pero registrar el error
    return res
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/reset-password"],
}
