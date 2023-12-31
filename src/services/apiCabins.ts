import { Cabin } from '../utils/types';
import supabase from './supabase';

// Get All Cabins
export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error.message);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

// Delete Cabin
export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('Cabin could not be deleted');
  }
}
