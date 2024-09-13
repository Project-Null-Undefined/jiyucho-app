import { HighlightedSection } from '@/app/tap/features/RecordRhythm/types';
import styles from './style.module.scss';

type HighlightedSectionsProps = {
  highlightedSections: HighlightedSection[];
};

export default function HighlightedSections({ highlightedSections }: HighlightedSectionsProps) {
  return highlightedSections.map((section, index) => (
    <div
      key={index}
      className={styles.highlightedSection}
      style={{
        left: `${section.start}%`,
        width: `${section.end - section.start}%`,
      }}
    />
  ));
}
