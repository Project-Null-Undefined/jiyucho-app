import Blocks from "./_components/Blocks";
import CodeSelector from "./_components/CodeSelector";
import Controller from "./_components/Controller";
import Piano from "./_components/Piano";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.piano_area}>
        <Piano />
        <Blocks />
      </div>
      <CodeSelector />
      <Controller />
    </main>
  );
}
