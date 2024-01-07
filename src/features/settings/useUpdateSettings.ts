import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSettings } from '../../services/apiSettings';

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success('Successfully updated settings');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSettings: mutate, isUpdating };
}

export default useUpdateSettings;
