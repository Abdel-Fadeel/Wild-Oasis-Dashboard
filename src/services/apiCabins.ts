import supabase, { supabaseUrl } from './supabase';
import { FieldValues } from 'react-hook-form';
import { Cabin } from '../utils/types';

// Get All Cabins
export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

// Create/Edit New Cabin
export async function createEditCabin(
  newCabin: FieldValues,
  id?: number
): Promise<void> {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. Create/Edit cabin
  let query;
  // A) Create
  if (!id)
    query = supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);
  // B) Edit
  else
    query = supabase
      .from('cabins')
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);

  const { data, error } = await query.select().single<{ id: number }>();

  if (error) {
    throw new Error(`Cabin could not be ${!id ? 'created' : 'edited'}`);
  }

  // 2. Upload image
  if (hasImagePath) return;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      `Cabin image could not be uploaded and the cabin was not ${
        !id ? 'created' : 'edited'
      }`
    );
  }
}

// Delete Cabin
export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('Cabin could not be deleted');
  }
}
