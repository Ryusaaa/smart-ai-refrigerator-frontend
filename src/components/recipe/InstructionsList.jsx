export default function InstructionsList({ instructions = [] }) {
  return (
    <div className="space-y-4">
      {instructions.map((step, idx) => (
        <div key={idx} className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold text-sm border border-[var(--color-primary)]/20">
              {idx + 1}
            </div>
          </div>
          <p className="text-[var(--color-text)] pt-1 leading-relaxed text-sm sm:text-base">{step}</p>
        </div>
      ))}
    </div>
  );
}
