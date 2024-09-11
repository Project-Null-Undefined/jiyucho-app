"use client";

import { useState, useEffect } from "react";
import RhythmBar from "@/app/tap/components/RhythmBar";
import styles from "./style.module.scss";
export default function MainPage() {
  // useStateフックを使って状態変数 `push_space_key` と、それを更新する関数 `setPushSpaceKey` を定義
  const [pushSpaceKey, setPushSpaceKey] = useState(false);

  const handleKeyDownSpace = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setPushSpaceKey(true);
      console.log("Space");
    }
  };

  const handleKeyUpSpace = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setPushSpaceKey(false);
      console.log("Space released");
    }
  };

  // useEffectでキーボードイベントを監視
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownSpace);
    window.addEventListener("keyup", handleKeyUpSpace);

    // クリーンアップ関数でイベントリスナーを削除
    return () => {
      window.removeEventListener("keydown", handleKeyDownSpace);
      window.removeEventListener("keyup", handleKeyUpSpace);
    };
  }, []);

  return (
    <>
      <div className={styles.rhythmBar}>
        <RhythmBar duration={10} highlight={pushSpaceKey} barWidth={70} />
      </div>
    </>
  );
}
