import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowLeft, Gamepad2, Info } from 'lucide-react';
import gamesData from './data/games.json';

const games = gamesData;

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSelectedGame(null)}
          >
            <div className="bg-neutral-900 p-1.5 rounded-lg">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Unblocked Games</h1>
          </div>
          
          <nav className="flex items-center gap-4 text-sm font-medium text-neutral-500">
            <button className="hover:text-neutral-900 transition-colors">Games</button>
            <button className="hover:text-neutral-900 transition-colors">Categories</button>
            <button className="hover:text-neutral-900 transition-colors">About</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-extrabold mb-3">Popular Games</h2>
                <p className="text-neutral-500 max-w-xl mx-auto">
                  Hand-picked selection of classic and modern games to play directly in your browser.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                  <motion.div
                    key={game.id}
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden bg-neutral-100">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-colors duration-300 flex items-center justify-center">
                        <button 
                          onClick={() => setSelectedGame(game)}
                          className="bg-white text-neutral-900 p-3 rounded-full opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg"
                        >
                          <Play className="w-6 h-6 fill-current" />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-1">{game.title}</h3>
                      <p className="text-neutral-500 text-sm line-clamp-2 mb-4">{game.description}</p>
                      <button 
                        onClick={() => setSelectedGame(game)}
                        className="w-full py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-semibold hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
                      >
                        Play Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Catalog
                </button>
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold">{selectedGame.title}</h2>
                  <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl shadow-neutral-300/50">
                <iframe 
                  src={selectedGame.iframeUrl}
                  title={selectedGame.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                />
              </div>

              <div className="bg-white p-8 rounded-3xl border border-neutral-200">
                <h3 className="text-2xl font-bold mb-4">About {selectedGame.title}</h3>
                <p className="text-neutral-600 leading-relaxed max-w-3xl">
                  {selectedGame.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="mt-8 pt-8 border-t border-neutral-100 flex flex-wrap gap-2">
                  {['Classic', 'Puzzle', 'Action', 'Fun'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-neutral-400 text-sm">
            © 2026 Unblocked Games. Built with elegance and performance.
          </p>
        </div>
      </footer>
    </div>
  );
}
