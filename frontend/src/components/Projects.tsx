// src/Projects.jsx
import  { useEffect } from 'react';
import { projectsArray } from '../config';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { projectsState, projectsLatexState } from '../atom';
import ThemeAwareInput from './ThemeAwareInput';

const Projects = () => {
    const setProjectsAtom = useSetRecoilState(projectsLatexState);
    const [projects, setProjects] = useRecoilState(projectsState);

    
    const handleSubmit = () => {
        let finalLatex = `\%-----------PROJECTS-----------
        \\section{Projects}
        \\resumeSubHeadingListStart`;
        const selectedProjects = projects.filter(proj => proj.selected);
        selectedProjects.forEach(proj => {
            finalLatex += `\n    \\resumeProjectHeading
            {\\textbf{${proj.name}} $|$ \\emph{${proj.tech}}}
              {${proj.years}} \n    \\resumeItemListStart`;
            proj.points.filter(point => point.selected).forEach(point => {
                const cleanedText = point.text.replace(/^\*\*\s*/, '');
                finalLatex += `\n      \\resumeItem {${cleanedText.replace(/%/g, '\\%')}}`;
                console.log(point.text);
            });
            finalLatex += `\n    \\resumeItemListEnd`;
        });
        finalLatex += `\n  \\resumeSubHeadingListEnd`;
        console.log(finalLatex);
        setProjectsAtom(finalLatex);
    };

    useEffect(() => {
        const newProjects = projectsArray.map((proj, index) => ({
            id: index + 1,
            name: proj?.name || '',
            tech: proj?.tech?.join(', ') || '',
            years: proj?.years || '',
            points: proj?.points?.map((text, idx) => ({ id: idx + 1, text, selected: true })) || [],
            selected: true
        }));

        setProjects(newProjects);

    }, []);
    
    useEffect(() => {
        if (projects.length > 0) {
          console.log("useEffect - Projects state updated");
          handleSubmit();
        }
    }, [projects]);

    const handleSelect = (id: number) => {
        setProjects(projects.map(proj =>
            proj.id === id ? { ...proj, selected: !proj.selected } : proj
        ));
    };

    const handleChange = (id: number, key: string, value: string) => {
        setProjects(projects.map(proj =>
            proj.id === id ? { ...proj, [key]: value } : proj
        ));
    };

    const handlePointChange = (projId: number, pointId: number, value: string) => {
        setProjects(projects.map(proj =>
            proj.id === projId ? {
                ...proj,
                points: proj.points.map(point =>
                    point.id === pointId ? { ...point, text: value } : point
                )
            } : proj
        ));
    };

    const handlePointSelect = (projId: number, pointId: number) => {
        setProjects(projects.map(proj =>
            proj.id === projId ? {
                ...proj,
                points: proj.points.map(point =>
                    point.id === pointId ? { ...point, selected: !point.selected } : point
                )
            } : proj
        ));
    };

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h3 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--theme-text-primary)' }}
                >
                    Projects
                </h3>
                <button 
                    className="font-medium py-2 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-white hover:bg-gradient-to-r hover:from-[var(--theme-primary)] hover:to-[var(--theme-accent)]" 
                    style={{
                        backgroundColor: 'var(--theme-primary)'
                    }}
                    onClick={handleSubmit}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Projects
                </button>
            </div>

            <div className='space-y-4'>
                {projects.map((proj, index) => (
                    <div 
                        key={index} 
                        className='rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'
                        style={{
                            backgroundColor: 'var(--theme-card-bg)',
                            borderColor: 'var(--theme-border)'
                        }}
                    >
                        <div className='p-6 space-y-4'>
                            {/* Header with checkbox */}
                            <div 
                                className='flex items-center gap-3 pb-3 border-b'
                                style={{ borderColor: 'var(--theme-border)' }}
                            >
                                <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        checked={proj.selected}
                                        onChange={() => handleSelect(proj.id)}
                                        className='w-4 h-4 rounded focus:ring-2'
                                        style={{
                                            color: 'var(--theme-primary)',
                                            backgroundColor: 'var(--theme-input-bg)',
                                            borderColor: 'var(--theme-border)',
                                            '--tw-ring-color': 'var(--theme-focus-ring)'
                                        } as React.CSSProperties}
                                    />
                                    <label 
                                        className='ml-2 text-sm font-medium'
                                        style={{ color: 'var(--theme-text-secondary)' }}
                                    >
                                        {proj.selected ? 'Include in resume' : 'Exclude from resume'}
                                    </label>
                                </div>
                            </div>
                            
                            {/* Project Details */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <ThemeAwareInput
                                    label="Project Name"
                                    value={proj.name}
                                    onChange={(e) => handleChange(proj.id, 'name', e.target.value)}
                                    placeholder="e.g., E-commerce Platform"
                                />
                                
                                <ThemeAwareInput
                                    label="Technologies"
                                    value={proj.tech}
                                    onChange={(e) => handleChange(proj.id, 'tech', e.target.value)}
                                    placeholder="React, Node.js, MongoDB"
                                />
                                
                                <ThemeAwareInput
                                    label="Year"
                                    value={proj.years}
                                    onChange={(e) => handleChange(proj.id, 'years', e.target.value)}
                                    placeholder="2023"
                                />
                            </div>
                            
                            {/* Project Points */}
                            <div className='space-y-4'>
                                <h4 
                                    className='text-md font-medium border-b pb-2'
                                    style={{ 
                                        color: 'var(--theme-text-primary)',
                                        borderColor: 'var(--theme-border)'
                                    }}
                                >
                                    Project Details & Achievements
                                </h4>
                                <div className='space-y-3'>
                                    {proj.points.map(point => (
                                        <div 
                                            key={point.id} 
                                            className='flex items-start gap-3 p-3 rounded-lg'
                                            style={{ backgroundColor: 'var(--theme-input-bg)' }}
                                        >
                                            <div className='flex items-center mt-1'>
                                                <input
                                                    type="checkbox"
                                                    checked={point.selected}
                                                    onChange={() => handlePointSelect(proj.id, point.id)}
                                                    className='w-4 h-4 rounded focus:ring-2'
                                                    style={{
                                                        color: 'var(--theme-primary)',
                                                        backgroundColor: 'var(--theme-card-bg)',
                                                        borderColor: 'var(--theme-border)',
                                                        '--tw-ring-color': 'var(--theme-focus-ring)'
                                                    } as React.CSSProperties}
                                                />
                                            </div>
                                            <textarea
                                                className='flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:border-transparent transition-all duration-200 text-sm resize-none'
                                                style={{
                                                    backgroundColor: 'var(--theme-card-bg)',
                                                    borderColor: 'var(--theme-border)',
                                                    color: 'var(--theme-text-primary)',
                                                    fontSize: '0.875rem',
                                                    lineHeight: '1.25rem',
                                                    '--tw-ring-color': 'var(--theme-focus-ring)'
                                                } as React.CSSProperties}
                                                value={point.text}
                                                onChange={(e) => handlePointChange(proj.id, point.id, e.target.value)}
                                                placeholder="Describe the project feature or achievement..."
                                                rows={2}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
