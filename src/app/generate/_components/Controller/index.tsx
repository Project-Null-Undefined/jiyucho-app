'use client';

import IonIcon from '@reacticons/ionicons';
import styles from './index.module.scss';
import IconButton from '@/components/share/IconButton';

export default function Controller() {
  return (
    <section className={styles.controller}>
      <div className={styles.group}>
        <IconButton
          onClick={() => console.log('clicked')}
          icon={<IonIcon name="return-up-back-outline" size="large" />}
        />
        <IconButton
          onClick={() => console.log('clicked')}
          icon={<IonIcon name="return-down-forward-outline" size="large" />}
        />
      </div>

      <div className={styles.group}>
        <IconButton onClick={() => console.log('clicked')} icon={<IonIcon name="play-back-outline" size="large" />} />
        <IconButton
          onClick={() => console.log('clicked')}
          icon={<IonIcon name="play-skip-back-outline" size="large" />}
        />
        <IconButton onClick={() => console.log('clicked')} icon={<IonIcon name="play-outline" size="large" />} />
        <IconButton
          onClick={() => console.log('clicked')}
          icon={<IonIcon name="play-skip-forward-outline" size="large" />}
        />
        <IconButton
          onClick={() => console.log('clicked')}
          icon={<IonIcon name="play-forward-outline" size="large" />}
        />
      </div>

      <div className={styles.group}>
        <IconButton onClick={() => console.log('clicked')} icon={<IonIcon name="save-outline" size="large" />} />
        <IconButton onClick={() => console.log('clicked')} icon={<IonIcon name="share-outline" size="large" />} />
      </div>
    </section>
  );
}
