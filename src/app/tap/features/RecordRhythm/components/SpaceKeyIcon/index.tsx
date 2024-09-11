import styles from "./style.module.scss";
type SpaceKeyIconProps = {
	fontsize: string;
  };
export default function SpaceKeyIcon({fontsize}:SpaceKeyIconProps) {
  return (
    <>
      <div
        className={styles.container}
		style={{
			fontSize:fontsize
		}}
      >
        <text>SPACE</text>
      </div>
    </>
  );
}
