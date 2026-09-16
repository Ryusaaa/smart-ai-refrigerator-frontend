import { Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, onClick }) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const id = recipe.id || recipe._id;

  const content = (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer" onClick={onClick ? () => onClick(recipe) : undefined}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{recipe.title}</h3>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{recipe.description}</p>
      
      <div className="flex flex-wrap gap-2 items-center text-sm mb-4">
        <div className="flex items-center text-gray-500 bg-gray-50 px-2 py-1 rounded">
          <Clock className="w-4 h-4 mr-1" />
          <span>{recipe.cookingTime} min</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${difficultyColors[recipe.difficulty] || 'bg-gray-100 text-gray-800'}`}>
          {recipe.difficulty}
        </span>
        {recipe.recommendationScore && (
          <div className="flex items-center text-primary-600 bg-primary-50 px-2 py-1 rounded font-medium">
            <BarChart2 className="w-4 h-4 mr-1" />
            <span>{recipe.recommendationScore}% Match</span>
          </div>
        )}
      </div>
    </div>
  );

  if (onClick) return content;
  return <Link to={`/recipes/${id}`} className="block h-full">{content}</Link>;
}
