"use client"

export default function ParentProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Progression des enfants</h1>
        <p className="text-gray-400 mt-1">Suivez l'évolution et les progrès de vos enfants</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Placeholder for progress content */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Aya Koné</h3>
          <p className="text-gray-400">Progression en cours de développement...</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Kwame Koné</h3>
          <p className="text-gray-400">Progression en cours de développement...</p>
        </div>
      </div>
    </div>
  )
}
