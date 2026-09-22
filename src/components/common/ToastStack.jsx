import Toast from './Toast';

export default function ToastStack({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-stack pointer-events-none fixed inset-x-4 top-4 z-[70] flex flex-col items-center gap-3 sm:inset-x-auto sm:right-5 sm:items-end">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}