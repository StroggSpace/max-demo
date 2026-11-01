import { motion } from 'motion/react';

import { categories } from '@/app/categories';
import { Card } from '@/shared/ui/kit';
import { useNavigate } from 'react-router-dom';
import styles from './CategorySelect.module.css';

export function CategorySelect() {
  const navigate = useNavigate();

  return (
    <div className={styles.list}>
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          type="button"
          className={styles.card}
          style={{ background: category.gradient }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 24 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/category/${category.id}`)}
        >
          <category.Icon className={styles.icon} />

          <div className={styles.cardBody}>
            <div className={styles.cardTitle}>{category.title}</div>
            <div className={styles.cardSubtitle}>{category.subtitle}</div>
          </div>

          {category.stub ? <span className={styles.stub}>скоро</span> : null}
        </motion.button>
      ))}

      <Card className={styles.hint}>
        <span>Выберите категорию, чтобы посмотреть интерфейс модуля.</span>
      </Card>
    </div>
  );
}
