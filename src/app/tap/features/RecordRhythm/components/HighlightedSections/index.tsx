import { HighlightedSection } from '@/app/tap/features/RecordRhythm/types';
import styles from './style.module.scss';

interface HighlightedSectionsProps {
  highlightedSections: HighlightedSection[];
}

export default function HighlightedSections({ highlightedSections }: HighlightedSectionsProps) {
  return highlightedSections.map((section, index) => (
    <div
      className={styles.highlightedSection}
      key={index}
      style={{
        left: `${section.start}%`,
        width: `${section.end - section.start}%`,
      }}
    />
  ));
}
