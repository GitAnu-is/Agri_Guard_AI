import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, MailIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Feedback';
import { authService } from '../../services/authService';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    setError(null);
    setLoading(true);
    await authService.requestPasswordReset(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <div>
      <Link to="/login" className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-earth-600 hover:text-leaf-800">
        <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Back to sign in
      </Link>

      <h1 className="text-[26px] font-bold tracking-tight text-leaf-900">Forgot password</h1>
      <p className="mt-1.5 text-sm leading-6 text-earth-600">
        Enter the email registered with the platform and we will send a reset link. In this demo no email is actually dispatched.
      </p>

      {sent ?
      <div className="mt-6 space-y-4">
          <Alert variant="success" title="Reset link sent">
            If <span className="font-semibold">{email}</span> exists in the directory, a reset link has been sent. Continue to the reset screen
            to complete the demo flow.
          </Alert>
          <Link
          to="/reset-password"
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-leaf-700 text-[15px] font-medium text-white transition-colors duration-150 ease-out hover:bg-leaf-800">
          
            Continue to reset password
          </Link>
        </div> :

      <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
          <Input
          label="Email"
          type="email"
          required
          placeholder="you@example.lk"
          icon={<MailIcon className="h-4 w-4" aria-hidden="true" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error ?? undefined} />
        
          <Button type="submit" size="lg" fullWidth loading={loading}>
            Send reset link
          </Button>
        </form>
      }
    </div>);

}