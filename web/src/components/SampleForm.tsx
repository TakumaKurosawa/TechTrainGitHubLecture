import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  min-height: 100px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background: #4dabf7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background: #339af0;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SampleForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    alert('Form submitted successfully!');
    reset();
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <h3>Sample Form (React Hook Form + Zod)</h3>
      
      <div>
        <Input
          {...register('name')}
          placeholder="Your name"
          type="text"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div>
        <Input
          {...register('email')}
          placeholder="Your email"
          type="email"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div>
        <TextArea
          {...register('message')}
          placeholder="Your message"
        />
        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      </div>

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </SubmitButton>
    </FormContainer>
  );
};

export default SampleForm;