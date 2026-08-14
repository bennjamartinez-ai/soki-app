import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ==========================
     CARGAR PERFIL
  ========================== */

  async function loadProfile(userId) {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {

      console.error(error);

      return;

    }

    setProfile(data);

  }

  async function updateProfile(profileData) {

  if (!user) return;

  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw error;

  setProfile(data);

  return data;

}

  /* ==========================
     REGISTRO
  ========================== */

  async function register({

    email,

    password,

    full_name,

  }) {

    const { error } =
      await supabase.auth.signUp({

        email,

        password,

        options: {

          data: {

            full_name,

          },

        },

      });

    if (error) throw error;

  }

  /* ==========================
     LOGIN
  ========================== */

  async function login(

    email,

    password

  ) {

    const { error } =
      await supabase.auth.signInWithPassword({

        email,

        password,

      });

    if (error) throw error;

  }

  /* ==========================
     LOGOUT
  ========================== */

  async function logout() {

    await supabase.auth.signOut();

  }

  /* ==========================
     SESIÓN
  ========================== */

  useEffect(() => {

    async function initialize() {

      const {

        data: {

          session,

        },

      } =
        await supabase.auth.getSession();

      if (session?.user) {

        setUser(session.user);

        await loadProfile(

          session.user.id

        );

      }

      setLoading(false);

    }

    initialize();

    const {

      data: listener,

    } =
      supabase.auth.onAuthStateChange(

        async (

          _,

          session

        ) => {

          if (session?.user) {

            setUser(

              session.user

            );

            await loadProfile(

              session.user.id

            );

          } else {

            setUser(null);

            setProfile(null);

          }

        }

      );

    return () =>

      listener.subscription.unsubscribe();

  }, []);

  return (

    <AuthContext.Provider
  value={{

  user,

  profile,

  loading,

  login,

  logout,

  register,

  updateProfile,

  isAdmin:
    profile?.role === "admin",

  isWholesale:
    profile?.role === "wholesale",

  isCustomer:
    profile?.role === "customer",

}}
>

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(

    AuthContext

  );

}