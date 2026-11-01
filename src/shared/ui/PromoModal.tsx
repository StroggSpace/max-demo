import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Typography } from '@maxhub/max-ui';

import { Lottie } from '@/shared/ui/Lottie';
import { useDemoStore } from '@/store/demo';
import styles from './PromoModal.module.css';

export function PromoModal() {
  const activePromo = useDemoStore((s) => s.activePromo);
  const closePromo = useDemoStore((s) => s.closePromo);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!activePromo) return;
    try {
      await navigator.clipboard?.writeText(activePromo.code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AnimatePresence>
      {activePromo ? (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePromo}
        >
          <motion.div
            className={styles.sheet}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.confetti}>
              <Lottie src="/lottie/confetti.lottie" loop={false} />
            </div>

            <IconButton
              size="small"
              mode="secondary"
              className={styles.close}
              aria-label="Закрыть"
              onClick={() => {
                setCopied(false);
                closePromo();
              }}
            >
              <XMarkIcon style={{ width: 18, height: 18 }} />
            </IconButton>

            <Typography.Title variant="medium-strong" asChild>
              <h2 style={{ margin: 0 }}>Открыт промокод</h2>
            </Typography.Title>
            <Typography.Body variant="small" className={styles.description}>
              {activePromo.description}
            </Typography.Body>

            <div className={styles.code}>{activePromo.code}</div>

            <Button
              mode="primary"
              stretched
              iconAfter={copied ? <CheckIcon style={{ width: 18, height: 18 }} /> : undefined}
              onClick={copy}
            >
              {copied ? 'Скопировано' : 'Копировать'}
            </Button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
