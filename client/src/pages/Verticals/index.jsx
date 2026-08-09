import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, FlaskConical, ArrowRight } from 'lucide-react';

const departments = [
  {
    slug: 'engineering',
    name: 'Engineering Department',
    subtitle: 'Product Building, Systems & Application Development',
    description:
      'Focused on building software products, systems engineering, and applied computing. Members collaborate on full-stack projects, developer tooling, and competitive programming.',
    Icon: Code2,
    groups: ['Software Engineering', 'Algorithms, Logic & Problem Solving'],
    color: 'from-blue-600 to-indigo-700',
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
  },
  {
    slug: 'research',
    name: 'Research Department',
    subtitle: 'Scientific Computing, AI & Security Research',
    description:
      'Dedicated to advancing scientific computing through AI research, cybersecurity investigation, and foundational computer science exploration. Members engage in paper reading, implementations, and publications.',
    Icon: FlaskConical,
    groups: ['Artificial Intelligence', 'Cyber Security', 'Core Computer Science'],
    color: 'from-violet-600 to-purple-700',
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
  },
];

export default function Verticals() {
  return (
    <div className="bg-bg-primary min-h-screen transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-bg-secondary border-b border-border-color">
        <div className="max-w-6xl mx-auto px-8 py-14">
          <span className="acm-tag">IIITU ACM</span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            Departments & Verticals
          </h1>
          <p className="mt-3 text-text-secondary text-sm max-w-lg leading-relaxed">
            Our chapter operates across two departments, each housing specialized interest groups led by student experts. Explore each division and its members.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-14 space-y-8">
        {departments.map(dept => (
          <Link
            key={dept.slug}
            to={`/verticals/${dept.slug}`}
            className="group block"
          >
            <div className={`border ${dept.border} ${dept.bg} rounded-2xl p-8 card-hover transition-all duration-300`}>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center flex-shrink-0`}>
                  <dept.Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-text-primary group-hover:text-acm-blue transition-colors">
                        {dept.name}
                      </h2>
                      <p className={`text-[11px] font-semibold uppercase tracking-wider mt-0.5 ${dept.accent}`}>
                        {dept.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-text-tertiary group-hover:text-acm-blue group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-2xl">
                    {dept.description}
                  </p>

                  {/* Interest Groups Preview */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {dept.groups.map(g => (
                      <span
                        key={g}
                        className="text-[11px] font-medium text-text-secondary bg-bg-elevated border border-border-color rounded-full px-3 py-1"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
