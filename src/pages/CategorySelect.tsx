import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { categories } from '@/app/categories';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import styles from './CategorySelect.module.css';

export function CategorySelect() {
  const navigate = useNavigate();
  const { get, tap } = useMotionControls();

  return (
    <div className={styles.list}>
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          type="button"
          className={styles.card}
          style={{ background: category.gradient }}
          {...get('card', index * 0.06)}
          {...tap}
          onClick={() => navigate(`/category/${category.id}`)}
        >
          <span className={styles.glow} />

          <span className={styles.iconTile}>
            <category.Icon className={styles.icon} />
          </span>

          <span className={styles.body}>
            <span className={`${styles.title} type-title`}>{category.title}</span>
            <span className={styles.subtitle}>{category.subtitle}</span>
          </span>

          {category.stub ? (
            <span className={styles.stub}>скоро</span>
          ) : (
            <span className={styles.arrow}>
              <ArrowRightIcon className={styles.arrowIcon} />
            </span>
          )}
        </motion.button>
      ))}

      <p className={styles.hint}>
        Выберите категорию, чтобы посмотреть интерфейс модуля.
      </p>
    </div>
  );
}
