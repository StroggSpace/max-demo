import { motion } from 'motion/react';
import { Typography } from '@maxhub/max-ui';

import type { Category } from '@/app/categories';
import styles from './StubCategory.module.css';

export function StubCategory({ category }: { category: Category }) {
  return (
    <motion.div
      className={styles.card}
      style={{ background: category.gradient }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <category.Icon className={styles.icon} />
      <Typography.Title variant="medium-strong">{category.title}</Typography.Title>
      <Typography.Body variant="small" className={styles.text}>
        Модуль скоро появится. Сейчас можно посмотреть категорию
        «Удержание / геймификация».
      </Typography.Body>
    </motion.div>
  );
}
