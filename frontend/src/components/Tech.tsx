import React, { useEffect, useState } from 'react';
import { techObject } from '../config'; // Importing the techObject from config file
import { techLatexState } from '../atom';
import { useSetRecoilState } from 'recoil';

type TechObject = {
    [category: string]: string[];
};

type TechCategory = {
    name: string;
    checked: boolean;
};

type ProcessedTechObject = {
    [category: string]: TechCategory[];
};

const preprocessTechObject = (techObject: TechObject): ProcessedTechObject => {
    const processedObject: ProcessedTechObject = {};
    Object.keys(techObject).forEach((category) => {
        processedObject[category] = techObject[category].map((tech) => ({
            name: tech.toString(), // Convert tech to string here
            checked: true
        }));
    });
    return processedObject;
};

const TechConfigEditor: React.FC = () => {
    const setTechLatexAtom = useSetRecoilState(techLatexState);
    const allTechnologies = techObject['all'] || [];
    const [technologies, setTechnologies] = useState<ProcessedTechObject>(preprocessTechObject(techObject));
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('languages');

    useEffect(() => {
        handleSubmit();
    }, []); // This effect runs only once, similar to componentDidMount

    const handleCheckboxChange = (category: string, index: number) => {
        const newTechnologies = { ...technologies };
        newTechnologies[category][index].checked = !newTechnologies[category][index].checked;
        setTechnologies(newTechnologies);
    };

    const handleInputChange = (category: string, index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTechnologies = { ...technologies };
        newTechnologies[category][index].name = event.target.value;
        setTechnologies(newTechnologies);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSelect = (techName: string) => {
        const newTechnologies = { ...technologies };
        if (selectedCategory) {
            newTechnologies[selectedCategory] = [
                ...newTechnologies[selectedCategory],
                { name: techName, checked: true }
            ];
            setTechnologies(newTechnologies);
        }
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setDropdown(!dropdown);
    };

    const handleSubmit = () => {
        let finalLatex = `\%-----------PROGRAMMING SKILLS-----------
        \\section{Technical Skills}
        \\begin{itemize}[leftmargin=0.15in, label={}]
        \\small{
        \\item{`;

        Object.keys(technologies).forEach((category) => {
            if (category === 'all') return;
            finalLatex += `\n\\textbf{${category}}{: `;
            technologies[category].filter((tech) => tech.checked).forEach((tech) => {
                finalLatex += ` ${tech.name}, `;
            });
            finalLatex += `} \\\\`;
        });
        finalLatex += ` }}
        \\end{itemize}`;
        
        setTechLatexAtom(finalLatex);
    };

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h3 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--theme-text-primary)' }}
                >
                    Technical Skills
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
                    Update Skills
                </button>
            </div>

            {/* Search and Add Section */}
            <div 
                className='rounded-lg border shadow-sm p-6'
                style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    borderColor: 'var(--theme-border)'
                }}
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Category Dropdown */}
                    <div className='space-y-2'>
                        <label 
                            className='block text-sm font-medium'
                            style={{ color: 'var(--theme-text-primary)' }}
                        >
                            Category
                        </label>
                        <div className='relative'>
                            <button 
                                onClick={() => setDropdown(!dropdown)} 
                                className="w-full flex items-center justify-between px-3 py-2 border rounded-md focus:ring-2 focus:border-transparent transition-all duration-200"
                                style={{
                                    backgroundColor: 'var(--theme-input-bg)',
                                    borderColor: 'var(--theme-border)',
                                    color: 'var(--theme-text-primary)',
                                    '--tw-ring-color': 'var(--theme-focus-ring)'
                                } as React.CSSProperties}
                            >
                                <span className="capitalize">{selectedCategory}</span>
                                <svg className={`w-4 h-4 transition-transform duration-200 ${dropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {dropdown && (
                                <div 
                                    className="absolute z-10 w-full mt-1 border rounded-md shadow-lg"
                                    style={{
                                        backgroundColor: 'var(--theme-card-bg)',
                                        borderColor: 'var(--theme-border)'
                                    }}
                                >
                                    <ul className="py-1">
                                        {Object.keys(techObject).map((category) => (
                                            <li key={category}>
                                                <button
                                                    className="w-full text-left px-3 py-2 hover:transition-colors duration-150 capitalize"
                                                    style={{
                                                        color: 'var(--theme-text-primary)',
                                                        '&:hover': {
                                                            backgroundColor: 'var(--theme-input-bg)'
                                                        }
                                                    } as React.CSSProperties}
                                                    onClick={() => handleCategorySelect(category)}
                                                >
                                                    {category}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Search */}
                    <div className='space-y-2'>
                        <label 
                            className='block text-sm font-medium'
                            style={{ color: 'var(--theme-text-primary)' }}
                        >
                            Search & Add Technology
                        </label>
                        <div className='relative'>
                            <input
                                type="text"
                                placeholder="Search technologies..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:border-transparent transition-all duration-200"
                                style={{
                                    backgroundColor: 'var(--theme-input-bg)',
                                    borderColor: 'var(--theme-border)',
                                    color: 'var(--theme-text-primary)',
                                    '--tw-ring-color': 'var(--theme-focus-ring)'
                                } as React.CSSProperties}
                            />
                            {searchTerm.length > 0 && (
                                <div 
                                    className="absolute z-10 w-full mt-1 border rounded-md shadow-lg max-h-48 overflow-y-auto"
                                    style={{
                                        backgroundColor: 'var(--theme-card-bg)',
                                        borderColor: 'var(--theme-border)'
                                    }}
                                >
                                    <ul className="py-1">
                                        {allTechnologies
                                            .filter((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((tech) => (
                                                <li key={tech}>
                                                    <button
                                                        className="w-full text-left px-3 py-2 hover:transition-colors duration-150"
                                                        style={{
                                                            color: 'var(--theme-text-primary)',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--theme-input-bg)'
                                                            }
                                                        } as React.CSSProperties}
                                                        onClick={() => handleSelect(tech)}
                                                    >
                                                        {tech}
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Technology Categories */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Object.keys(techObject).map((category) => (
                    <div 
                        key={category} 
                        className="rounded-lg border shadow-sm overflow-hidden"
                        style={{
                            backgroundColor: 'var(--theme-card-bg)',
                            borderColor: 'var(--theme-border)'
                        }}
                    >
                        <div 
                            className="px-4 py-3"
                            style={{
                                backgroundColor: 'var(--theme-primary)'
                            }}
                        >
                            <h3 
                                className="text-lg font-semibold text-white capitalize text-center"
                                style={{ color: 'var(--theme-text-on-primary)' }}
                            >
                                {category}
                            </h3>
                        </div>
                        <div className='p-4 space-y-3'>
                            {technologies[category].map((tech, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:transition-colors duration-150"
                                    style={{
                                        backgroundColor: 'var(--theme-input-bg)',
                                        '&:hover': {
                                            backgroundColor: 'var(--theme-card-bg)'
                                        }
                                    } as React.CSSProperties}
                                >
                                    <input
                                        type="checkbox"
                                        checked={tech.checked || false}
                                        onChange={() => handleCheckboxChange(category, index)}
                                        className="w-4 h-4 rounded focus:ring-2"
                                        style={{
                                            color: 'var(--theme-primary)',
                                            backgroundColor: 'var(--theme-card-bg)',
                                            borderColor: 'var(--theme-border)',
                                            '--tw-ring-color': 'var(--theme-focus-ring)'
                                        } as React.CSSProperties}
                                    />
                                    <input
                                        type="text"
                                        value={tech.name}
                                        onChange={(e) => handleInputChange(category, index, e)}
                                        className="flex-1 px-2 py-1 border rounded focus:ring-2 focus:border-transparent transition-all duration-200 text-sm"
                                        style={{
                                            backgroundColor: 'var(--theme-card-bg)',
                                            borderColor: 'var(--theme-border)',
                                            color: 'var(--theme-text-primary)',
                                            fontSize: '0.875rem',
                                            lineHeight: '1.25rem',
                                            '--tw-ring-color': 'var(--theme-focus-ring)'
                                        } as React.CSSProperties}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechConfigEditor;
