import { motion } from 'motion/react';
import { CheckCircleIcon, TicketIcon } from '@heroicons/react/24/outline';
import { Button, Flex, Grid, Typography } from '@maxhub/max-ui';

import { Card, Chip, Section, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { getCartCount, getCartTotal, useSalesStore } from '@/store/sales';
import styles from './ShopTab.module.css';

export function ShopTab() {
  useSectionScenario(scenarios['sales-shop']);
  const { get, tap } = useMotionControls();

  const products = useSalesStore((s) => s.products);
  const cart = useSalesStore((s) => s.cart);
  const promoApplied = useSalesStore((s) => s.promoApplied);
  const order = useSalesStore((s) => s.order);
  const addToCart = useSalesStore((s) => s.addToCart);
  const applyPromo = useSalesStore((s) => s.applyPromo);
  const placeOrder = useSalesStore((s) => s.placeOrder);
  const resetShop = useSalesStore((s) => s.resetShop);

  const cartCount = useSalesStore(getCartCount);
  const total = useSalesStore(getCartTotal);
  const discount = promoApplied ? Math.round(total * 0.1) : 0;

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Товаров пока нет" emptyText="Витрина появится к старту акции.">
        {order ? (
          <motion.div {...get('pop')}>
            <Card>
              <Flex direction="column" align="center" gap={8}>
                <span className={styles.successIcon}>
                  <CheckCircleIcon className={styles.successGlyph} />
                </span>
                <Typography.Title variant="medium-strong">Заявка принята</Typography.Title>
                <Typography.Body variant="small" className={styles.muted}>
                  Номер {order.number}. Сумма {order.total.toLocaleString('ru-RU')} ₽
                  {order.discount ? `, скидка ${order.discount.toLocaleString('ru-RU')} ₽` : ''}
                </Typography.Body>
                <Button size="small" mode="secondary" onClick={resetShop}>
                  Новый заказ
                </Button>
              </Flex>
            </Card>
          </motion.div>
        ) : (
          <>
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

            <Section title="Витрина">
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
                          <span className={styles.price}>
                            {product.price.toLocaleString('ru-RU')} ₽
                          </span>
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

            {cart.length ? (
              <Section title="Корзина" after={`${cartCount} шт.`}>
                <Card>
                  <Flex direction="column" gap={10}>
                    {cart.map((item) => {
                      const product = products.find((p) => p.id === item.productId);
                      if (!product) return null;
                      return (
                        <Flex justify="space-between" key={item.productId} gap={12}>
                          <span className={styles.cartTitle}>
                            {product.title} × {item.qty}
                          </span>
                          <span className={styles.cartPrice}>
                            {(product.price * item.qty).toLocaleString('ru-RU')} ₽
                          </span>
                        </Flex>
                      );
                    })}

                    <div className={styles.divider} />

                    {promoApplied ? (
                      <Flex justify="space-between" align="center">
                        <Chip tone="success">START10 · −10%</Chip>
                        <span className={styles.cartPrice}>−{discount.toLocaleString('ru-RU')} ₽</span>
                      </Flex>
                    ) : (
                      <Button
                        size="small"
                        mode="secondary"
                        stretched
                        onClick={() => applyPromo('START10')}
                      >
                        Применить промокод START10
                      </Button>
                    )}

                    <Flex justify="space-between" align="center">
                      <Typography.Title variant="small-strong">Итого</Typography.Title>
                      <span className={styles.total}>
                        {(total - discount).toLocaleString('ru-RU')} ₽
                      </span>
                    </Flex>

                    <Button mode="primary" stretched onClick={placeOrder}>
                      Оформить заявку
                    </Button>
                  </Flex>
                </Card>
              </Section>
            ) : null}
          </>
        )}
      </StateGate>
    </div>
  );
}
