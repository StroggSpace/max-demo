import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button, Flex, IconButton, Typography } from '@maxhub/max-ui';

import { Card, Chip, Progress, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { getCartCount, getCartTotal, useSalesStore } from '@/store/sales';
import styles from './CartTab.module.css';

export function CartTab() {
  useSectionScenario(scenarios['sales-cart']);
  const navigate = useNavigate();
  const { get } = useMotionControls();

  const products = useSalesStore((s) => s.products);
  const cart = useSalesStore((s) => s.cart);
  const promoApplied = useSalesStore((s) => s.promoApplied);
  const order = useSalesStore((s) => s.order);
  const addToCart = useSalesStore((s) => s.addToCart);
  const decrementItem = useSalesStore((s) => s.decrementItem);
  const removeFromCart = useSalesStore((s) => s.removeFromCart);
  const applyPromo = useSalesStore((s) => s.applyPromo);
  const placeOrder = useSalesStore((s) => s.placeOrder);
  const resetShop = useSalesStore((s) => s.resetShop);

  const cartCount = useSalesStore(getCartCount);
  const total = useSalesStore(getCartTotal);
  const discount = promoApplied ? Math.round(total * 0.1) : 0;

  if (order) {
    return (
      <div className={styles.page}>
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
              <Button
                size="small"
                mode="secondary"
                onClick={() => {
                  resetShop();
                  navigate('/category/sales/shop');
                }}
              >
                Вернуться в витрину
              </Button>
            </Flex>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Корзина пуста" emptyText="Добавьте товары из витрины.">
        {cart.length ? (
          <>
            <Card>
              <Flex direction="column" align="stretch" gap={12}>
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <div className={styles.item} key={item.productId}>
                      <span className={styles.emoji}>{product.emoji}</span>

                      <div className={styles.itemBody}>
                        <div className={styles.itemTitle}>{product.title}</div>
                        <div className={styles.itemPrice}>
                          {(product.price * item.qty).toLocaleString('ru-RU')} ₽
                        </div>
                      </div>

                      <div className={styles.qty}>
                        <IconButton
                          size="small"
                          mode="secondary"
                          aria-label="Убрать одну"
                          onClick={() => decrementItem(item.productId)}
                        >
                          <MinusIcon style={{ width: 16, height: 16 }} />
                        </IconButton>
                        <span className={styles.qtyValue}>{item.qty}</span>
                        <IconButton
                          size="small"
                          mode="secondary"
                          aria-label="Добавить одну"
                          onClick={() => addToCart(item.productId)}
                        >
                          <PlusIcon style={{ width: 16, height: 16 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          mode="tertiary"
                          aria-label="Удалить товар"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <TrashIcon style={{ width: 16, height: 16 }} />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}

                <div className={styles.divider} />

                {promoApplied ? (
                  <Flex justify="space-between" align="center">
                    <Chip tone="success">START10 · −10%</Chip>
                    <span className={styles.total}>−{discount.toLocaleString('ru-RU')} ₽</span>
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
                  <Flex direction="column" gap={2}>
                    <Typography.Body variant="small" className={styles.muted}>
                      {cartCount} товара
                    </Typography.Body>
                    <Typography.Title variant="small-strong">Итого</Typography.Title>
                  </Flex>
                  <span className={styles.total}>
                    {(total - discount).toLocaleString('ru-RU')} ₽
                  </span>
                </Flex>

                <Progress value={promoApplied ? 100 : 0} height="s" />

                <Button mode="primary" stretched onClick={placeOrder}>
                  Оформить заявку
                </Button>
              </Flex>
            </Card>

            <Button
              size="small"
              mode="tertiary"
              stretched
              onClick={() => navigate('/category/sales/shop')}
            >
              Продолжить покупки
            </Button>
          </>
        ) : (
          <Card>
            <Flex direction="column" align="center" gap={10}>
              <span className={styles.emptyIcon}>
                <ShoppingCartIcon className={styles.emptyGlyph} />
              </span>
              <Typography.Title variant="medium-strong">Корзина пуста</Typography.Title>
              <Typography.Body variant="small" className={styles.muted}>
                Добавьте товары из витрины — промокод применим в корзине.
              </Typography.Body>
              <Button size="small" onClick={() => navigate('/category/sales/shop')}>
                Перейти в витрину
              </Button>
            </Flex>
          </Card>
        )}
      </StateGate>
    </div>
  );
}
