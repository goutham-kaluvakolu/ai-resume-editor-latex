import  { SetStateAction, useState } from 'react';
import axios from 'axios';
import { backendUrl, backendUrlGenKey } from '../links';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { experienceState, projectsState, experienceLatexState, educationLatexState, projectsLatexState, techLatexState, keywordsAtom } from '../atom';
import { latexTex } from '../config';

const JobDescription = () => {
  const [expArray, setExpArray] = useRecoilState(experienceState);
  const [projectsArray, setProjectsArray] = useRecoilState(projectsState);
  const explatex = useRecoilValue(experienceLatexState);
  const educationLatex = useRecoilValue(educationLatexState);
  const projectsLatex = useRecoilValue(projectsLatexState);
  const techLatex = useRecoilValue(techLatexState);
  const [jobDescription, setJobDescription] = useState('');
  const [aiGeneratedDescription, setAiGeneratedDescription] = useState('');
  const [copyLatex, setCopyLatex] = useState("");
  const  setKeywords = useSetRecoilState(keywordsAtom);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [copyState, setCopyState] = useState("copy");

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setJobDescription(event.target.value);
  };

  const handleAIClick = async () => {
    setLoadingAi(true);
    try {
      const response = await axios.post(backendUrl, {
        description: jobDescription,
        resume: {
          // first filter out the points and the items based on selected or not
         exp: expArray.filter(exp => exp.selected).map(exp => ({
            role: exp.role,
            company: exp.company,
            years: exp.years,
            loc: exp.loc,
            points: exp.points.filter(point => point.selected)
         })),
         projectsArray: projectsArray.filter(proj => proj.selected).map(proj => ({
          name: proj.name,
          tech: proj.tech,
          years: proj.years,
          points: proj.points.filter(point => point.selected)
         }))
        
        }
      });
      setAiGeneratedDescription(response.data.generatedDescription);
      const res = response.data.generatedDescription;
      const newExp = res.expArray.map((exp: { role: string; company: string; years: string; loc: string; points: string[]; }, index: number) => ({
        id: index + 1,
        role: exp.role,
        company: exp.company,
        years: exp.years,
        loc: exp.loc,
        points: exp.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
        selected: true
      }))
      setExpArray(newExp);
      const newProjects = res.projectsArray.map((proj: { name: string; tech: string; years: string; points: string[]; }, index: number) => ({
        id: index + 1,
        name: proj.name,
        tech: proj.tech,
        years: proj.years,
        points: proj.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
        selected: true
      }))
      console.log(newProjects);
      setProjectsArray(newProjects);
      setLoadingAi(false);
    } catch (error) {
      console.error('Error fetching AI-generated description:', error);
    }
  };

  const handleAIClickForLatex = async () => {
    const templatex = latexTex
    try {
      let body = templatex + educationLatex + explatex + projectsLatex + techLatex + `
       \\end{document}`;
      console.log(body);
      setCopyLatex(body);
    } catch (error) {
      console.error('Error fetching AI-generated description:', error);
    }
  };

  const handleGenKeywords = async () => {
    setLoadingKeywords(true);
    try {
      const response = await axios.post(backendUrlGenKey, {
        description: jobDescription
      });
      setKeywords(response.data.keywords);
      setLoadingKeywords(false);
    } catch (error) {
      console.error('Error fetching AI-generated description:', error);
    }
  };

  const handleCopyLatex = async () => {
    try {
      // First generate the LaTeX if it hasn't been generated yet
      if (!copyLatex) {
        await handleAIClickForLatex();
      }
      
      // Wait a moment for the state to update
      setTimeout(async () => {
        try {
          const currentLatex = copyLatex || (latexTex + educationLatex + explatex + projectsLatex + techLatex + `\n\\end{document}`);
          
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(currentLatex);
            setCopyState("copied");
            setTimeout(() => {
              setCopyState("copy");
            }, 2000);
          } else {
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement("textarea");
            textArea.value = currentLatex;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
            setCopyState("copied");
            setTimeout(() => {
              setCopyState("copy");
            }, 2000);
          }
        } catch (error) {
          console.error('Error copying to clipboard:', error);
          alert('Failed to copy LaTeX to clipboard. Please try again.');
        }
      }, 100);
    } catch (error) {
      console.error('Error generating LaTeX:', error);
      alert('Failed to generate LaTeX. Please try again.');
    }
  };


  return (
    <div className='w-full'>
      <div 
        className='rounded-xl shadow-lg border overflow-hidden transition-all duration-300'
        style={{
          backgroundColor: 'var(--theme-card-bg)',
          borderColor: 'var(--theme-border)'
        }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4"
          style={{
            backgroundColor: 'var(--theme-primary)'
          }}
        >
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Job Description
          </h2>
          <p className="text-white/90 text-sm mt-1">Enter the job description to generate tailored resume content</p>
        </div>

        <div className='p-6 space-y-6'>
          {/* Textarea */}
          <div className='w-full'>
            <textarea
              value={jobDescription}
              onChange={handleInputChange}
              placeholder="Paste the job description here to get AI-powered resume suggestions..."
              rows={8}
              className='w-full p-4 rounded-lg resize-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm'
              style={{
                backgroundColor: 'var(--theme-input-bg)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text-primary)',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                '--tw-ring-color': 'var(--theme-focus-ring)'
              } as React.CSSProperties}
            />
          </div>

          {/* AI Generated Description */}
          {aiGeneratedDescription && (
            <div 
              className='mt-6 p-4 rounded-lg'
              style={{
                background: `linear-gradient(to right, var(--theme-accent)/10, var(--theme-primary)/10)`,
                border: `1px solid var(--theme-accent)/20`
              }}
            >
              <h3 
                className='text-lg font-semibold mb-2 flex items-center gap-2'
                style={{ color: 'var(--theme-text-primary)' }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                ></div>
                AI Generated Content
              </h3>
              <p 
                className="text-sm"
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                Your resume has been updated with AI-generated content based on the job description.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              <button 
                className='flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-lg transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)]' 
                style={{
                  backgroundColor: 'var(--theme-primary)'
                }}
                onClick={handleAIClick}
                disabled={loadingAi}
              >
                {loadingAi ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate AI Content
                  </>
                )}
              </button>
              
              <button 
                className='flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-lg transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)]' 
                style={{
                  backgroundColor: 'var(--theme-primary)'
                }}
                onClick={handleAIClickForLatex}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate LaTeX
              </button>
              
              <button 
                className='flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-lg transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)]' 
                style={{
                  backgroundColor: 'var(--theme-primary)'
                }}
                onClick={handleGenKeywords}
                disabled={loadingKeywords}
              >
                {loadingKeywords ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Generate Keywords
                  </>
                )}
              </button>
            </div>

            {/* Copy LaTeX Button */}
            <button 
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold text-lg rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)] ${
                !copyLatex && !educationLatex && !explatex && !projectsLatex && !techLatex ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{
                backgroundColor: 'var(--theme-primary)'
              }}
              onClick={handleCopyLatex}
              disabled={!copyLatex && !educationLatex && !explatex && !projectsLatex && !techLatex}
            >
              {copyState === "copy" ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {!copyLatex && !educationLatex && !explatex && !projectsLatex && !techLatex 
                    ? 'Generate LaTeX First' 
                    : 'Copy LaTeX to Clipboard'
                  }
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied Successfully!
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;

