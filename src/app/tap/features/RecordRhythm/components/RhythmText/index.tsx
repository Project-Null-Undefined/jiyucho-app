import styles from "./style.module.scss";
import SpaceKeyIcon from "@/app/tap/features/RecordRhythm/components/SpaceKeyIcon";

type RhythmTextProps = {
  text: string;
  fontsize: string;
};
export default function RhythmText({ text, fontsize }: RhythmTextProps) {
  return (
    <>
      <div
        className={styles.container}
        style={{
          fontSize: fontsize,
        }}
      >
        <text>{text}</text>
        <SpaceKeyIcon fontsize={fontsize} />
      </div>
    </>
  );
}
