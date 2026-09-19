import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import RouteProgressBar from './components/layout/RouteProgressBar'
import PageTransition from './components/layout/PageTransition'
import ProtectedRoute from './components/layout/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import RefrigeratorPage from './pages/RefrigeratorPage'
import IngredientDetailPage from './pages/IngredientDetailPage'
import RecipeGeneratorPage from './pages/RecipeGeneratorPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import ChatPage from './pages/ChatPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <>
      <RouteProgressBar />
      <Routes>
        {/* Public auth routes — no sidebar/topbar, own full-bleed background */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Everything else requires a signed-in user */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="*"
            element={
              <Layout>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/refrigerator" element={<RefrigeratorPage />} />
                    <Route path="/refrigerator/:id" element={<IngredientDetailPage />} />
                    <Route path="/recipes" element={<RecipeGeneratorPage />} />
                    <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </PageTransition>
              </Layout>
            }
          />
        </Route>
      </Routes>
    </>
  )
}
export default App