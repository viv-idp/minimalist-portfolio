import React from 'react';
import { portfolioData } from '../data.ts';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 flex items-center gap-3">
            <span className="text-brand-500 font-mono text-2xl">04.</span> Education & Certifications
          </h2>
          <div className="w-20 h-1 bg-brand-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-200 mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-brand-400" />
              Certifications
            </h3>
            <div className="space-y-6">
              {portfolioData.certifications.map((cert, index) => (
                <div key={index} className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-brand-500/30 transition-colors relative group">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-100 mb-2">{cert.name}</h4>
                      <p className="text-slate-400">{cert.issuer}</p>
                    </div>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-400 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <div className="mt-4 inline-block px-3 py-1 rounded-md bg-slate-900 text-brand-400 text-sm font-mono border border-slate-700">
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-200 mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-blue-400" />
              Education
            </h3>
            <div className="space-y-6">
              {portfolioData.education.map((edu, index) => (
                <div key={index} className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                  <h4 className="text-lg font-bold text-slate-100 mb-2">{edu.degree}</h4>
                  <p className="text-slate-400 mb-4">{edu.institution}</p>
                  <div className="inline-block px-3 py-1 rounded-md bg-slate-900 text-blue-400 text-sm font-mono border border-slate-700">
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};