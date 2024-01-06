import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createCabin } from '../../services/apiCabins';
import styled from 'styled-components';

const FormButtonsRow = styled.div`
  padding: 1.2rem 0 0;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: FieldValues) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin name' error={errors.name?.message as string}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        name='maxCapacity'
        error={errors.maxCapacity?.message as string}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Regular price'
        name='regularPrice'
        error={errors.regularPrice?.message as string}
      >
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label='Discount'
        name='discount'
        error={errors.discount?.message as string}
      >
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        name='description'
        error={errors.description?.message as string}
      >
        <Textarea
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label='Cabin photo'
        name='image'
        error={errors.image?.message as string}
      >
        <FileInput
          id='image'
          disabled={isCreating}
          accept='image/*'
          {...register('image')}
        />
      </FormRow>
      <FormButtonsRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new cabin</Button>
      </FormButtonsRow>
    </Form>
  );
}

export default CreateCabinForm;
