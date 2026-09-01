import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Feedback';
import { authService } from '../../services/authService';

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{password?: string;confirm?: string;}>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (password.length < 8) next.password = 'Use at least 8 characters';
    if (confirm !== password) next.confirm = 'Passwords do not match';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    await authService.resetPassword(password);
    setLoading(false);
    setDone(true);
    window.setTimeout(() => navigate('/login'), 1600);
  };

  return (
    <div>
      <h1 className="text-[26px] font-bold tracking-tight text-leaf-900">Reset password</h1>
      <p className="mt-1.5 text-sm leading-6 text-earth-600">Choose a new password for your platform account.</p>

      {done ?
      <Alert variant="success" title="Password updated" className="mt-6">
          Redirecting you to the sign-in screen…
        </Alert> :

      <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
          <Input
          label="New password"
          type="password"
          required
          autoComplete="new-password"
          icon={<LockIcon className="h-4 w-4" aria-hidden="true" />}
          hint="At least 8 characters."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password} />
        
          <Input
          label="Confirm new password"
          type="password"
          required
          autoComplete="new-password"
          icon={<LockIcon className="h-4 w-4" aria-hidden="true" />}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm} />
        
          <Button type="submit" size="lg" fullWidth loading={loading}>
            Update password
          </Button>
        </form>
      }

      <p className="mt-6 text-[13px] text-earth-600">
        <Link to="/login" className="font-semibold text-leaf-700 hover:text-leaf-900">
          Return to sign in
        </Link>
      </p>
    </div>);

}