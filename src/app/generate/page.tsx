import Blocks from "./_components/Blocks";
import CodeSelector from "./_components/CodeSelector";
import Controller from "./_components/Controller";
import Piano from "./_components/Piano";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <main className={styles.main}>
      <Piano />
      <Blocks />
      <CodeSelector />
      <Controller />
    </main>
  );
}
