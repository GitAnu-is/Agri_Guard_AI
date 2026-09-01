import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Feedback';
import { districts, userRoles } from '../../data/mockUsers';
import { authService } from '../../services/authService';
import { useApp } from '../../contexts/AppContext';
import type { UserRole } from '../../types';

const schema = z.object({
  fullName: z.string().min(3, 'Enter your full name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().regex(/^[+0-9\s-]{9,15}$/, 'Enter a valid phone number'),
  role: z.string().min(1, 'Select your role'),
  district: z.string().min(1, 'Select your district'),
  location: z.string().min(2, 'Enter your farming location')
});

type FormValues = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const { signIn } = useApp();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '', role: 'Farmer', district: 'Gampaha', location: '' }
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const user = await authService.register({ ...values, role: values.role as UserRole });
      signIn(user);
      navigate('/profile-setup', { replace: true });
    } catch {
      setError('Registration failed against the mock service. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-[26px] font-bold tracking-tight text-leaf-900">Create your account</h1>
      <p className="mt-1.5 text-sm leading-6 text-earth-600">
        Your role determines which modules and decision-support outputs appear on your dashboard.
      </p>

      {error &&
      <Alert variant="danger" className="mt-5">
          {error}
        </Alert>
      }

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="Full name" required placeholder="Nimal Perera" error={errors.fullName?.message} {...register('fullName')} />
        <Input label="Email" type="email" required placeholder="you@example.lk" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" required placeholder="+94 71 234 5678" error={errors.phone?.message} {...register('phone')} />
        <Select
          label="User role"
          required
          options={userRoles.map((r) => ({ value: r, label: r }))}
          error={errors.role?.message}
          {...register('role')} />
        
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="District"
            required
            options={districts.map((d) => ({ value: d, label: d }))}
            error={errors.district?.message}
            {...register('district')} />
          
          <Input label="Farming location" required placeholder="Meewitiya" error={errors.location?.message} {...register('location')} />
        </div>

        <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-[13px] text-earth-600">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-leaf-700 hover:text-leaf-900">
          Sign in
        </Link>
      </p>
    </div>);

}