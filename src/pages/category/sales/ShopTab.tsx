import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { TicketIcon } from '@heroicons/react/24/outline';
import { Button, Flex, Grid, Typography } from '@maxhub/max-ui';

import { Card, Chip, Section, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { getCartCount, useSalesStore } from '@/store/sales';
import styles from './ShopTab.module.css';

export function ShopTab() {
  useSectionScenario(scenarios['sales-shop']);
  const navigate = useNavigate();
  const { get, tap } = useMotionControls();

  const products = useSalesStore((s) => s.products);
  const addToCart = useSalesStore((s) => s.addToCart);
  const cartCount = useSalesStore(getCartCount);

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Товаров пока нет" emptyText="Витрина появится к старту акции.">
        <Card className={styles.promoBanner}>
          <Flex align="center" gap={12}>
            <span className={styles.promoIcon}>
              <TicketIcon className={styles.promoGlyph} />
            </span>
            <div className={styles.promoBody}>
              <Typography.Title variant="small-strong">Скидка 10% на заказ</Typography.Title>
              <Typography.Body variant="small" className={styles.promoText}>
                Промокод START10 применяется в корзине
              </Typography.Body>
            </div>
          </Flex>
        </Card>

        <Section
          title="Витрина"
          after={
            cartCount > 0 ? (
              <Button
                size="small"
                mode="tertiary"
                onClick={() => navigate('/category/sales/cart')}
              >
                Корзина · {cartCount}
              </Button>
            ) : null
          }
        >
          <Grid cols={2} gap={8}>
            {products.map((product, index) => (
              <motion.div key={product.id} {...get('card', index * 0.04)} {...tap}>
                <Card className={styles.tile}>
                  <Flex direction="column" align="stretch" gap={6} className={styles.tileBody}>
                    <div className={styles.tileTop}>
                      <span className={styles.emoji}>{product.emoji}</span>
                      {product.badge ? <Chip tone="accent">{product.badge}</Chip> : null}
                    </div>

                    <Typography.Title variant="small-strong">{product.title}</Typography.Title>
                    <Typography.Body variant="small" className={styles.muted}>
                      {product.subtitle}
                    </Typography.Body>

                    <div className={styles.spacer} />

                    <div className={styles.priceRow}>
                      <span className={styles.price}>{product.price.toLocaleString('ru-RU')} ₽</span>
                      <Chip>{product.points} баллов</Chip>
                    </div>

                    <Button size="small" stretched onClick={() => addToCart(product.id)}>
                      В корзину
                    </Button>
                  </Flex>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Section>
      </StateGate>
    </div>
  );
}
