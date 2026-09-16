export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${isUser ? 'bg-primary-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
        <p className="whitespace-pre-wrap leading-relaxed text-sm">{content}</p>
      </div>
    </div>
  );
}
