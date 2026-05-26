'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { CardItem, CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li>{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dark"
        />
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
};

function getYear(item: CardItem): string {
    return item.date?.match(/\b(20\d{2})\b/)?.[1] || 'Other';
}

function itemHasTag(item: CardItem, tag: string): boolean {
    return item.tags?.includes(tag) || false;
}

const monthOrder: Record<string, number> = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
};

function getDateSortValue(item: CardItem): number {
    const year = Number(getYear(item));
    const month = item.date?.match(/[A-Za-z]+/)?.[0]?.toLowerCase();
    const monthValue = month ? monthOrder[month] || 1 : 1;
    return (Number.isFinite(year) ? year : 0) * 100 + monthValue;
}

function sortByDateDescending(items: CardItem[]): CardItem[] {
    return [...items].sort((a, b) => getDateSortValue(b) - getDateSortValue(a));
}

function groupByYear(items: CardItem[]): Array<[string, CardItem[]]> {
    const grouped = items.reduce<Record<string, CardItem[]>>((acc, item) => {
        const year = getYear(item);
        acc[year] = acc[year] || [];
        acc[year].push(item);
        return acc;
    }, {});

    return Object.entries(grouped).sort(([a], [b]) => {
        if (a === 'Other') return 1;
        if (b === 'Other') return -1;
        return Number(b) - Number(a);
    });
}

function renderItem(item: CardItem, index: number, embedded: boolean) {
    return (
        <li key={`${item.title}-${item.date || index}`} className="py-4 first:pt-0">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h4 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary leading-snug`}>
                    {item.title}
                </h4>
                {item.date && (
                    <span className="text-sm text-neutral-500 dark:text-neutral-500 sm:ml-4 sm:shrink-0">
                        {item.date}
                    </span>
                )}
            </div>
            {item.subtitle && (
                <p className="text-sm text-accent mt-1">
                    {item.subtitle}
                </p>
            )}
            {item.content && (
                <div className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed mt-2">
                    <ReactMarkdown components={markdownComponents}>
                        {item.content}
                    </ReactMarkdown>
                </div>
            )}
        </li>
    );
}

function SimpleList({ items, embedded }: { items: CardItem[]; embedded: boolean }) {
    return (
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {items.map((item, index) => renderItem(item, index, embedded))}
        </ul>
    );
}

function TalksList({ items, embedded }: { items: CardItem[]; embedded: boolean }) {
    return (
        <div className="space-y-7">
            {groupByYear(sortByDateDescending(items)).map(([year, yearItems]) => (
                <section key={year}>
                    <h2 className="text-base font-semibold text-neutral-500 dark:text-neutral-500 mb-2">
                        {year}
                    </h2>
                    <SimpleList items={sortByDateDescending(yearItems)} embedded={embedded} />
                </section>
            ))}
        </div>
    );
}

function AwardsGrantsList({ items, embedded }: { items: CardItem[]; embedded: boolean }) {
    const grants = items.filter((item) => itemHasTag(item, 'Grant') || itemHasTag(item, 'Fellowship'));
    const awards = items.filter((item) => itemHasTag(item, 'Award'));
    const sections = [
        { title: 'Grants & Fellowships', items: grants },
        { title: 'Awards', items: awards },
    ].filter((section) => section.items.length > 0);

    return (
        <div className="space-y-10">
            {sections.map((section) => (
                <section key={section.title}>
                    <h2 className={`${embedded ? "text-xl" : "text-2xl"} font-serif font-bold text-primary mb-3`}>
                        {section.title}
                    </h2>
                    <SimpleList items={section.items} embedded={embedded} />
                </section>
            ))}
        </div>
    );
}

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const isTalksPage = config.title === 'Talks';
    const isAwardsPage = config.title === 'Awards & Grants';

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={embedded ? "mb-5" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-3xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {isTalksPage ? (
                <TalksList items={config.items} embedded={embedded} />
            ) : isAwardsPage ? (
                <AwardsGrantsList items={config.items} embedded={embedded} />
            ) : (
                <SimpleList items={config.items} embedded={embedded} />
            )}
        </motion.div>
    );
}
