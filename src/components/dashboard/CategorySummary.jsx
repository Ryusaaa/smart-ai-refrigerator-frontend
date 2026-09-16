export default function CategorySummary({ categories = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Inventory by Category</h3>
      </div>
      <div className="p-6">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No categories to display.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                <span className="text-gray-700 font-medium">{cat.name}</span>
                <span className="bg-primary-100 text-primary-700 py-1 px-2 rounded-full text-xs font-bold">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
