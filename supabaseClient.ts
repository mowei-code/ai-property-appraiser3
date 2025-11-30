import { createClient } from '@supabase/supabase-js';

// 輔助函式：安全地讀取環境變數 (支援 Vite 與 Node.js/Electron 環境)
const getEnvVar = (key: string): string | undefined => {
  try {
    // 優先檢查 Vite 的 import.meta.env
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {
    // 忽略存取錯誤
  }

  try {
    // 後備檢查 Node.js 的 process.env
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key];
    }
  } catch (e) {
    // 忽略存取錯誤
  }
  
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// 檢查是否已設定 Supabase 環境變數
export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL';

if (!isSupabaseConfigured) {
  console.warn('Supabase credentials not found or invalid. App will run in local-only mode with limited functionality.');
}

// 建立 Client，若未設定則使用佔位符以防報錯，但在 AuthContext 中會被擋下
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createClient('https://placeholder.supabase.co', 'placeholder');