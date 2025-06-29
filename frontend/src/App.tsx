import { ChevronDownIcon } from '@heroicons/react/20/solid'
import JobDescription from './components/JobDescription';
import { useState } from 'react';
import Edu from './components/Edu';
import Exp from './components/Exp';
import Projects from './components/Projects';
import Tech from './components/Tech';
import { useRecoilValue } from 'recoil';
import { keywordsAtom } from './atom';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [eduVisible, setEduVisible] = useState(true);
  const [expVisible, setExpVisible] = useState(true);
  const [projVisible, setProjVisible] = useState(true);
  const [techVisible, setTechVisible] = useState(true);
  const keyword = useRecoilValue(keywordsAtom);
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)' }}>
      {/* Header */}
      <div 
        className="shadow-lg"
        style={{
          backgroundColor: 'var(--theme-primary)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className='text-center text-4xl font-bold text-white tracking-tight'>
                AI Resume Editor
              </h1>
              <p className="text-center text-white/90 mt-2 text-lg">
                Create professional resumes with AI assistance
              </p>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Panel - Form Sections */}
          <div className='flex-1 space-y-6'>
            <JobDescription />
            
            {/* Education Section */}
            <div 
              className="rounded-xl shadow-lg border overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--theme-card-bg)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <button 
                className="flex items-center gap-3 text-left font-semibold text-lg p-6 w-full text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)]" 
                style={{
                  backgroundColor: 'var(--theme-primary)'
                }}
                onClick={() => setEduVisible(!eduVisible)}
              >
                <ChevronDownIcon className={`${eduVisible ? 'transform rotate-180' : ''} w-5 h-5 transition-transform duration-200`} />
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Education
                </span>
              </button>
              {eduVisible && (
                <div className="p-6" style={{ backgroundColor: 'var(--theme-background)' }}>
                  <Edu />
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div 
              className="rounded-xl shadow-lg border overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--theme-card-bg)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <button 
                className="flex items-center gap-3 text-left font-semibold text-lg p-6 w-full text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)]" 
                style={{
                  backgroundColor: 'var(--theme-primary)'
                }}
                onClick={() => setExpVisible(!expVisible)}
              >
                <ChevronDownIcon className={`${expVisible ? 'transform rotate-180' : ''} w-5 h-5 transition-transform duration-200`} />
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Experience
                </span>
              </button>
              {expVisible && (
                <div className="p-6" style={{ backgroundColor: 'var(--theme-background)' }}>
                  <Exp />
                </div>
              )}
            </div>

            {/* Projects Section */}
            <div 
              className="rounded-xl shadow-lg border overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--theme-card-bg)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <button 
                className="flex items-center gap-3 text-left font-semibold text-lg p-6 w-full text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)]" 
                style={{
                  backgroundColor: 'var(--theme-primary)'
                }}
                onClick={() => setProjVisible(!projVisible)}
              >
                <ChevronDownIcon className={`${projVisible ? 'transform rotate-180' : ''} w-5 h-5 transition-transform duration-200`} />
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Projects
                </span>
              </button>
              {projVisible && (
                <div className="p-6" style={{ backgroundColor: 'var(--theme-background)' }}>
                  <Projects />
                </div>
              )}
            </div>

            {/* Technologies Section */}
            <div 
              className="rounded-xl shadow-lg border overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--theme-card-bg)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <button 
                className="flex items-center gap-3 text-left font-semibold text-lg p-6 w-full text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)]" 
                style={{
                  backgroundColor: 'var(--theme-primary)'
                }}
                onClick={() => setTechVisible(!techVisible)}
              >
                <ChevronDownIcon className={`${techVisible ? 'transform rotate-180' : ''} w-5 h-5 transition-transform duration-200`} />
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Technologies
                </span>
              </button>
              {techVisible && (
                <div className="p-6" style={{ backgroundColor: 'var(--theme-background)' }}>
                  <Tech />
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Keywords */}
          <div className='lg:w-80'>
            <div 
              className="rounded-xl shadow-lg border p-6 sticky top-8 transition-all duration-300"
              style={{
                backgroundColor: 'var(--theme-card-bg)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <h3 
                className="text-lg font-semibold mb-4 flex items-center gap-2"
                style={{ color: 'var(--theme-text-primary)' }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                ></div>
                Generated Keywords
              </h3>
              <div className='space-y-2 max-h-96 overflow-y-auto'>
                {keyword.length > 0 ? (
                  keyword.map((k, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        background: `linear-gradient(to right, var(--theme-primary)/20, var(--theme-accent)/20)`,
                        border: `1px solid var(--theme-primary)/30`,
                        color: 'var(--theme-text-primary)'
                      }}
                    >
                      {k}
                    </div>
                  ))
                ) : (
                  <div 
                    className="text-sm italic text-center py-8"
                    style={{ color: 'var(--theme-text-secondary)' }}
                  >
                    Generate keywords to see them here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
