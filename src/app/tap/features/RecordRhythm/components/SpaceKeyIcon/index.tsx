import styles from './style.module.scss';
interface SpaceKeyIconProps {
  fontsize: string;
}
export default function SpaceKeyIcon({ fontsize }: SpaceKeyIconProps) {
  return (
    <div
      className={styles.container}
      style={{
        fontSize: fontsize,
      }}
    >
      <p>SPACE</p>
    </div>
  );
}
