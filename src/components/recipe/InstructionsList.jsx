export default function InstructionsList({ instructions = [] }) {
  return (
    <div className="space-y-4">
      {instructions.map((step, idx) => (
        <div key={idx} className="flex">
          <div className="flex-shrink-0 mr-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">
              {idx + 1}
            </div>
          </div>
          <p className="text-gray-700 pt-1 leading-relaxed">{step}</p>
        </div>
      ))}
    </div>
  );
}
