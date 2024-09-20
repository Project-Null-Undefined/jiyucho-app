import styles from './page.module.scss';

export default function MainPage() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <img alt="logo" src="/images/logo.svg" />
        <a href="/draw">start</a>
      </div>
    </main>
  );
}
