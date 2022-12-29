import styles from "./LoadingScreen.module.css";

export default function LoadingScreen(props: any) {
  return (
    <div className={styles.container}>
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
