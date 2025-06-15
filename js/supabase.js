// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient('https://ykxhmcoptziubsnsogws.supabase.co/', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreGhtY29wdHppdWJzbnNvZ3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNDE1MTQsImV4cCI6MjA2NDcxNzUxNH0.UbzJQQA4nGp4NAkf5-5DWwg2egPNY5fW7RAXnYhKMRQ');

// Optional (testing) — fetch from Supabase to check
async function fetchDataFromSupabase() {
    console.log("Fetching data from Supabase...");
    try {
        const { data, error } = await supabase
            .from('user')
            .select('*')

        if (error) {
            throw error;
        }
        console.log("Fetched data:", data);
    } catch (error) {
        console.error("Error fetching from Supabase:", error);
    }
}

fetchDataFromSupabase();
