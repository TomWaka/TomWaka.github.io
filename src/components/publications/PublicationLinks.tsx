import { Publication } from '@/types/publication';

export default function PublicationLinks({ publication }: { publication: Publication }) {
    const { url, doi, arxivId, code } = publication;
    const isArxivUrl = url && /^https?:\/\/(?:www\.)?arxiv\.org\//i.test(url);
    const linkClassName = 'text-accent hover:text-accent-dark break-words';

    return (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {url && !isArxivUrl && (
                <a href={url} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                    Publication
                </a>
            )}
            {doi && (
                <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                    DOI: {doi}
                </a>
            )}
            {arxivId && (
                <a href={`https://arxiv.org/abs/${arxivId}`} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                    arXiv:{arxivId}
                </a>
            )}
            {code && (
                <a href={code} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                    Code
                </a>
            )}
        </div>
    );
}
