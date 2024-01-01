import supabase from './supabase';
import { FieldValues } from 'react-hook-form';
import { Cabin } from '../utils/types';

// Get All Cabins
export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error.message);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

// Create New Cabin
export async function createCabin(newCabin: FieldValues): Promise<void> {
  const { error } = await supabase.from('cabins').insert([newCabin]);

  if (error) {
    console.error(error.message);
    throw new Error('Cabins could not be created');
  }
}

// Delete Cabin
export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('Cabin could not be deleted');
  }
}
