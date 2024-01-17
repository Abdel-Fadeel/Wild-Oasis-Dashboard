import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import useEditCabin from './useEditCabin';
import useCreateCabin from './useCreateCabin';
import { Cabin } from '../../utils/types';

const FormButtonsRow = styled.div`
  padding: 1.2rem 0 0;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

type CreateCabinFormProps = {
  cabinToEdit?: Cabin;
  onCloseModal?: () => void;
};

function CreateCabinForm({ cabinToEdit, onCloseModal }: CreateCabinFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: cabinToEdit,
  });
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const id = cabinToEdit?.id;
  const isEditSession = Boolean(id);

  function onSubmit(data: FieldValues) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (!isEditSession)
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

    if (isEditSession && id)
      editCabin(
        {
          newCabin: {
            ...data,
            image,
          },
          id,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Cabin name' error={errors.name?.message as string}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          accept='image/*'
          {...register('image', {
            required: id ? false : 'This field is required',
          })}
        />
      </FormRow>
      <FormButtonsRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormButtonsRow>
    </Form>
  );
}

export default CreateCabinForm;
