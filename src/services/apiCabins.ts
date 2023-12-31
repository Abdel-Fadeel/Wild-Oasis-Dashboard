import { Cabin } from '../utils/types';
import supabase from './supabase';

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error.message);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}
