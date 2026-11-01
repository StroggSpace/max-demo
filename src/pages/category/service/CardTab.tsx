import { motion } from 'motion/react';
import { ArrowPathIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { QRCodeCanvas } from 'qrcode.react';
import { Button, Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, StateGate } from '@/shared/ui/kit';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useServiceStore } from '@/store/service';
import styles from './CardTab.module.css';

export function CardTab() {
  useSectionScenario(scenarios['service-card']);

  const card = useServiceStore((s) => s.card);
  const refreshToken = useServiceStore((s) => s.refreshToken);

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Карты пока нет" emptyText="Карта появится после регистрации в программе.">
        <div className={styles.card}>
          <span className={styles.cardGlow} />

          <Flex justify="space-between" align="center" className={styles.cardTop}>
            <span className={styles.cardLabel}>Карта лояльности</span>
            <Chip tone="accent">MAX</Chip>
          </Flex>

          <div className={styles.cardNumber}>{card.number}</div>

          <Flex justify="space-between" align="flex-end">
            <div>
              <div className={styles.cardCaption}>Баланс</div>
              <Typography.Title variant="large-strong">
                {card.balance.toLocaleString('ru-RU')} баллов
              </Typography.Title>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.cardCaption}>Действует до</div>
              <span className={styles.cardExpires}>{card.expires}</span>
            </div>
          </Flex>
        </div>

        <Card className={styles.qrCard}>
          <motion.div
            key={card.token}
            className={styles.qrTile}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <QRCodeCanvas
              value={card.token}
              size={188}
              level="M"
              bgColor="#ffffff"
              fgColor="#0d1220"
            />
          </motion.div>

          <Typography.Body variant="small" className={styles.hint}>
            Покажите код на кассе или в терминале — баллы спишутся автоматически.
          </Typography.Body>

          <Button
            size="small"
            mode="secondary"
            stretched
            iconBefore={<ArrowPathIcon style={{ width: 18, height: 18 }} />}
            onClick={refreshToken}
          >
            Обновить код
          </Button>
        </Card>

        <Card>
          <Flex align="center" gap={12}>
            <span className={styles.tipIcon}>
              <QrCodeIcon className={styles.tipGlyph} />
            </span>
            <div className={styles.tipBody}>
              <Typography.Title variant="small-strong">Код обновляется автоматически</Typography.Title>
              <Typography.Body variant="small" className={styles.tipText}>
                Каждые несколько секунд — так безопаснее, если скриншот попадёт не туда.
              </Typography.Body>
            </div>
          </Flex>
        </Card>
      </StateGate>
    </div>
  );
}
