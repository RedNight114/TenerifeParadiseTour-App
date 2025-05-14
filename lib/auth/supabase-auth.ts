import { getSupabaseClient } from "../supabase-config"

// Tipos para el usuario
export type UserSession = {
  id: string
  email: string
  name: string | null
  role: string
  avatar_url: string | null
}

// Obtener el cliente de Supabase
const supabase = getSupabaseClient()

// Función para obtener la sesión actual
export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error("Error al obtener la sesión:", error.message)
    return null
  }

  return session
}

// Función para obtener el usuario actual
export async function getCurrentUser(): Promise<UserSession | null> {
  const session = await getCurrentSession()

  if (!session?.user) {
    return null
  }

  // Obtener datos adicionales del usuario desde la tabla de perfiles
  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (error) {
    console.error("Error al obtener el perfil del usuario:", error.message)
  }

  return {
    id: session.user.id,
    email: session.user.email || "",
    name: profile?.name || session.user.user_metadata?.name || null,
    role: profile?.role || "user",
    avatar_url: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
  }
}

// Función para iniciar sesión con email y contraseña
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Función para registrar un nuevo usuario
export async function signUpWithEmail(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  // Si el registro es exitoso, crear un perfil para el usuario
  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      name,
      email,
      role: "user",
      created_at: new Date().toISOString(),
    })
  }

  return data
}

// Función para cerrar sesión
export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  return true
}

// Función para enviar un enlace de restablecimiento de contraseña
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    throw new Error(error.message)
  }

  return true
}

// Función para actualizar la contraseña
export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return true
}

// Función para actualizar el perfil del usuario
export async function updateProfile(profile: Partial<UserSession>) {
  const session = await getCurrentSession()

  if (!session?.user) {
    throw new Error("No hay sesión activa")
  }

  // Actualizar los metadatos del usuario
  const { error: userError } = await supabase.auth.updateUser({
    data: {
      name: profile.name,
    },
  })

  if (userError) {
    throw new Error(userError.message)
  }

  // Actualizar el perfil en la tabla de perfiles
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      name: profile.name,
      avatar_url: profile.avatar_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", session.user.id)

  if (profileError) {
    throw new Error(profileError.message)
  }

  return true
}

// Función para subir un avatar
export async function uploadAvatar(file: File) {
  const session = await getCurrentSession()

  if (!session?.user) {
    throw new Error("No hay sesión activa")
  }

  const fileExt = file.name.split(".").pop()
  const fileName = `${session.user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `avatars/${fileName}`

  // Subir el archivo
  const { error: uploadError } = await supabase.storage.from("profiles").upload(filePath, file)

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  // Obtener la URL pública
  const { data } = supabase.storage.from("profiles").getPublicUrl(filePath)

  // Actualizar el perfil con la nueva URL
  await updateProfile({
    avatar_url: data.publicUrl,
  })

  return data.publicUrl
}

// Función para verificar si el usuario tiene un rol específico
export async function hasRole(role: string): Promise<boolean> {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  return user.role === role
}
