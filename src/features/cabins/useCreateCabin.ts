import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UseFormReset } from 'react-hook-form';

import { createEditCabin } from '../../services/apiCabins';
import { Cabin } from '../../utils/types';

function useCreateCabin(reset: UseFormReset<Cabin>) {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Successfully created cabin');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { createCabin, isCreating };
}

export default useCreateCabin;
