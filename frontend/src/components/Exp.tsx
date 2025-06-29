import { useEffect } from 'react';
import { expArray } from '../config';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { experienceState, experienceLatexState } from '../atom';
import ThemeAwareInput from './ThemeAwareInput';

const Exp = () => {
    const setExperienceAtom = useSetRecoilState(experienceLatexState);
    const [experience, setExperience] = useRecoilState(experienceState);

    const handleSubmit = () => {
        let finalLatex = `\%-----------EXPERIENCE-----------
        \\section{Experience}
        \\resumeSubHeadingListStart`;
        const selectedExperience = experience.filter(item => item.selected);
        selectedExperience.forEach(item => {
            console.log(item);
            finalLatex += `\n    \\resumeSubheading
              {${item.role}}{${item.years}}{${item.company}}{${item.loc}}
              \n    \\resumeItemListStart
              `;

            item.points.filter(point => point.selected).forEach(point => {
                const cleanedText = point.text.replace(/^\*\*\s*/, '');
                finalLatex += `\n      \\resumeItem {${cleanedText.replace(/%/g, '\\%')}}`;
                console.log(point.text);
            });

            finalLatex += `\n    \\resumeItemListEnd`;
        });
        finalLatex += `\n  \\resumeSubHeadingListEnd`;
        console.log(finalLatex);
        setExperienceAtom(finalLatex);
    };

    useEffect(() => {
        const newExperience = expArray.map((exp, index) => ({
            id: index + 1,
            role: exp.role,
            company: exp.company,
            years: exp.years,
            loc: exp.loc,
            points: exp.points.map((text, idx) => ({ id: idx + 1, text, selected: true })),
            selected: true
        }));
        console.log(newExperience);
        setExperience(newExperience)
    }, []);

    useEffect(() => {
        if (experience.length > 0) {
            console.log("useEffect - Experience state updated");
            handleSubmit();
        }
    }, [experience]);

    const handleSelect = (id: number) => {
        setExperience(experience.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const handleChange = (id: number, key: string, value: string) => {
        setExperience(experience.map(item =>
            item.id === id ? { ...item, [key]: value } : item
        ));
    };

    const handlePointChange = (expId: number, pointId: number) => {
        setExperience(experience.map(item =>
            item.id === expId ? {
                ...item,
                points: item.points.map(point =>
                    point.id === pointId ? { ...point, selected: !point.selected } : point
                )
            } : item
        ));
    };

    const handlePointInputChange = (expId: number, pointId: number, value: string) => {
        setExperience(experience.map(item =>
            item.id === expId ? {
                ...item,
                points: item.points.map(point =>
                    point.id === pointId ? { ...point, text: value } : point
                )
            } : item
        ));
    };

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h3 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--theme-text-primary)' }}
                >
                    Experience Details
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
                    Update Experience
                </button>
            </div>

            <div className='space-y-4'>
                {experience.map((item, index) => (
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
                                        checked={item.selected}
                                        onChange={() => handleSelect(item.id)}
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
                                        {item.selected ? 'Include in resume' : 'Exclude from resume'}
                                    </label>
                                </div>
                            </div>
                            
                            {/* Form fields */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <ThemeAwareInput
                                    label="Job Title/Role"
                                    value={item.role}
                                    onChange={(e) => handleChange(item.id, 'role', e.target.value)}
                                    placeholder="e.g., Software Engineer"
                                />
                                
                                <ThemeAwareInput
                                    label="Company"
                                    value={item.company}
                                    onChange={(e) => handleChange(item.id, 'company', e.target.value)}
                                    placeholder="Enter company name"
                                />
                                
                                <ThemeAwareInput
                                    label="Location"
                                    value={item.loc}
                                    onChange={(e) => handleChange(item.id, 'loc', e.target.value)}
                                    placeholder="e.g., San Francisco, CA"
                                />
                                
                                <ThemeAwareInput
                                    label="Duration"
                                    value={item.years}
                                    onChange={(e) => handleChange(item.id, 'year', e.target.value)}
                                    placeholder="e.g., 2020-2023"
                                />
                            </div>
                            
                            {/* Experience Points */}
                            <div className='space-y-4'>
                                <h4 
                                    className='text-md font-medium border-b pb-2'
                                    style={{ 
                                        color: 'var(--theme-text-primary)',
                                        borderColor: 'var(--theme-border)'
                                    }}
                                >
                                    Key Achievements & Responsibilities
                                </h4>
                                <div className='space-y-3'>
                                    {item.points.map(point => (
                                        <div 
                                            key={point.id} 
                                            className='flex items-start gap-3 p-3 rounded-lg'
                                            style={{ backgroundColor: 'var(--theme-input-bg)' }}
                                        >
                                            <div className='flex items-center mt-1'>
                                                <input
                                                    type="checkbox"
                                                    checked={point.selected}
                                                    onChange={() => handlePointChange(item.id, point.id)}
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
                                                onChange={(e) => handlePointInputChange(item.id, point.id, e.target.value)}
                                                placeholder="Describe your achievement or responsibility..."
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

export default Exp;

