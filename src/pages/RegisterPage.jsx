import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
import { TextField, FormError, SubmitButton } from '../components/auth/AuthForm';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setFormError(null);
    if (password.length < 8) {
      setFormError('Password must be at least 8 characters.');
      return;
    }
    setSubmitting(true);
    try {
      await register({ name, email, password });
      navigate('/', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Failed to create your account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading={
        <>
          Join
          <br />
          <span className="text-[var(--color-text-muted)]">SMARTAI</span>
        </>
      }
      tagline={
        <>
          Set up your kitchen,
          <br />
          in minutes.
        </>
      }
    >
      <h2 className="font-serif text-2xl font-bold text-[var(--color-text)] sm:text-3xl">Create account</h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">Start your SMARTAI Refrigerator journey.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <TextField
          id="register-name"
          label="Full name"
          icon={User}
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <TextField
          id="register-email"
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
          id="register-password"
          label="Password"
          icon={Lock}
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />

        <FormError>{formError}</FormError>

        <SubmitButton loading={submitting} loadingLabel="Creating account…">
          Create account
        </SubmitButton>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--color-text-muted)]">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-[var(--color-primary)] hover:opacity-80">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}