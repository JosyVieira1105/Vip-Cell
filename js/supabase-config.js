// CONFIGURAÇÃO DO SUPABASE
// Substitua os dois valores abaixo pelos dados do SEU projeto Supabase.
// Use a Project URL e a chave publishable (ou anon/public, se o painel mostrar esse nome).
// Nunca coloque a Secret key ou a senha do banco neste arquivo.

const SUPABASE_URL = "COLE_AQUI_A_PROJECT_URL";
const SUPABASE_KEY = "COLE_AQUI_A_CHAVE_PUBLISHABLE";

let supabaseClient = null;

if (window.supabase && SUPABASE_URL !== "COLE_AQUI_A_PROJECT_URL" && SUPABASE_KEY !== "COLE_AQUI_A_CHAVE_PUBLISHABLE") {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Supabase conectado com sucesso!");
} else {
    console.log("Configure a URL e a chave Publishable do Supabase em js/supabase-config.js.");
}