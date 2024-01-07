import supabase from './supabase';
import { Settings } from '../utils/types';

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    throw new Error('Settings could not be loaded');
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSettings(newSettings: { [key: string]: number }) {
  const { error } = await supabase
    .from('settings')
    .update(newSettings)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  if (error) {
    throw new Error('Settings could not be updated');
  }
}
