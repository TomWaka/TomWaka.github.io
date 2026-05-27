'use client';

import { motion } from 'framer-motion';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import FormattedBibTeXText from './FormattedBibTeXText';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

function getVenue(pub: Publication): string {
    if (pub.journal) return `${pub.journal}, ${pub.year}`;
    if (pub.conference) return `${pub.conference}, ${pub.year}`;
    if (pub.type === 'preprint') return `Preprint, ${pub.year}`;
    return `${pub.year}`;
}

function getUrlLabel(url: string): string {
    if (url.includes('arxiv.org')) return 'arXiv';
    if (url.includes('github.com')) return 'Code';
    return 'Publication';
}

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    const publishedPapers = publications.filter((pub) => pub.type !== 'preprint');
    const preprints = publications.filter((pub) => pub.type === 'preprint');
    const sections = [
        { title: 'Published Papers', items: publishedPapers },
        { title: 'Preprints', items: preprints },
    ].filter((section) => section.items.length > 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={embedded ? "mb-5" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-3xl leading-relaxed`}>
                        {config.description}
                    </p>
                )}
            </div>

            <div className="space-y-10">
                {sections.map((section) => (
                    <section key={section.title}>
                        <h2 className={`${embedded ? "text-xl" : "text-2xl"} font-serif font-bold text-primary mb-3`}>
                            {section.title}
                        </h2>
                        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {section.items.map((pub) => (
                                <li key={pub.id} className="py-5 first:pt-0">
                                    <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary leading-snug mb-2`}>
                                        <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                    </h3>
                                    <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-700 dark:text-neutral-500 leading-relaxed mb-1`}>
                                        {pub.authors.map((author, idx) => (
                                            <span key={idx}>
                                                {author.name}
                                                {idx < pub.authors.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>
                                    <p className="text-sm text-accent dark:text-accent-light font-medium mb-2">
                                        {getVenue(pub)}
                                    </p>
                                    {pub.description && (
                                        <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed mb-2">
                                            {pub.description}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                        {pub.url && (
                                            <a
                                                href={pub.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-accent hover:text-accent-dark"
                                            >
                                                {getUrlLabel(pub.url)}
                                            </a>
                                        )}
                                        {pub.code && (
                                            <a
                                                href={pub.code}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-accent hover:text-accent-dark"
                                            >
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </motion.div>
    );
}
