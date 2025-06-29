import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { educationState , educationLatexState} from '../atom.ts';
import { eduArray } from '../config';
import ThemeAwareInput from './ThemeAwareInput';

const Edu = () => {
    const setEduAtom = useSetRecoilState(educationLatexState);
    const [education, setEducation] = useRecoilState(educationState);
    
    useEffect(() => {
        const newEducation = eduArray.map((edu, index) => ({
                id: index + 1,
                uni: edu.uni,
                city: edu.city,
                degree: edu.degree,
                year: edu.year,
                selected: true
              }));
              console.log(newEducation);
              setEducation(newEducation)
              console.log("useeffect");
            }, []);

    useEffect(() => {
                if (education.length > 0) {
                  console.log("useEffect - Education state updated");
                  handleSubmit();
                }
    }, [education]);
    

    const handleSelect = (id: number) => {
        setEducation(education.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const handleChange = (id: number, key: string, value: string) => {
        setEducation(education.map(item =>
            item.id === id ? { ...item, [key]: value } : item
        ));
    };

    const handleSubmit = () => {
        let finalLatex = `\%-----------EDUCATION-----------
        \\section{Education}
        \\resumeSubHeadingListStart`
        const selectedEducation = education.filter(item => item.selected);
        console.log("filter",education,selectedEducation);
        selectedEducation.forEach(item => {
            finalLatex += `\n    \\resumeSubheading
              {${item.uni}}{${item.city}}{${item.degree}}{${item.year}}`
        });
        finalLatex += `\n  \\resumeSubHeadingListEnd`
        console.log(finalLatex);
        setEduAtom(finalLatex);
    };

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h3 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--theme-text-primary)' }}
                >
                    Education Details
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
                    Update Education
                </button>
            </div>

            <div className='space-y-4'>
                {education.map((item, index) => (
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
                                    label="University/Institution"
                                    value={item.uni}
                                    onChange={(e) => handleChange(item.id, 'uni', e.target.value)}
                                    placeholder="Enter university name"
                                />
                                
                                <ThemeAwareInput
                                    label="City"
                                    value={item.city}
                                    onChange={(e) => handleChange(item.id, 'city', e.target.value)}
                                    placeholder="Enter city"
                                />
                                
                                <ThemeAwareInput
                                    label="Degree"
                                    value={item.degree}
                                    onChange={(e) => handleChange(item.id, 'degree', e.target.value)}
                                    placeholder="e.g., Bachelor of Science in Computer Science"
                                />
                                
                                <ThemeAwareInput
                                    label="Year"
                                    value={item.year}
                                    onChange={(e) => handleChange(item.id, 'year', e.target.value)}
                                    placeholder="e.g., 2020-2024"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Edu;

