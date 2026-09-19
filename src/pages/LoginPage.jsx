import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
import { TextField, FormError, SubmitButton } from '../components/auth/AuthForm';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setFormError(null);
    setSubmitting(true);
    try {
      await login({ email, password, remember });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading={
        <>
          SMARTAI
          <br />
          <span className="text-[var(--color-text-muted)]">Refrigerator</span>
        </>
      }
      tagline={
        <>
          Your refrigerator,
          <br />
          but smarter.
        </>
      }
    >
      <h2 className="font-serif text-2xl font-bold text-[var(--color-text)] sm:text-3xl">Welcome back</h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        Sign in to your SMARTAI Refrigerator account.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <TextField
          id="login-email"
          label="Email address"
          icon={Mail}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <TextField
          id="login-password"
          label="Password"
          icon={Lock}
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex cursor-pointer select-none items-center gap-2 text-[var(--color-text-muted)]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-primary)]"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setFormError('Password reset isn\u2019t available yet — please contact support.')}
            className="cursor-pointer font-semibold text-[var(--color-primary)] hover:opacity-80"
          >
            Forgot password?
          </button>
        </div>

        <FormError>{formError}</FormError>

        <SubmitButton loading={submitting} loadingLabel="Signing in…">
          Sign in
        </SubmitButton>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--color-text-muted)]">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-[var(--color-primary)] hover:opacity-80">
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}