import { motion } from 'motion/react';
import { CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button, Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, Section, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useServiceStore } from '@/store/service';
import styles from './BookingTab.module.css';

const priceLabel = (price: number) =>
  price ? `${price.toLocaleString('ru-RU')} ₽` : 'бесплатно';

export function BookingTab() {
  useSectionScenario(scenarios['service-booking']);
  const { get } = useMotionControls();

  const services = useServiceStore((s) => s.services);
  const masters = useServiceStore((s) => s.masters);
  const booking = useServiceStore((s) => s.booking);
  const selectService = useServiceStore((s) => s.selectService);
  const selectMaster = useServiceStore((s) => s.selectMaster);
  const selectSlot = useServiceStore((s) => s.selectSlot);
  const confirmBooking = useServiceStore((s) => s.confirmBooking);
  const resetBooking = useServiceStore((s) => s.resetBooking);

  const service = services.find((item) => item.id === booking.serviceId) ?? null;
  const master = masters.find((item) => item.id === booking.masterId) ?? null;

  const availableMasters = booking.serviceId
    ? masters.filter((item) => item.services.includes(booking.serviceId as string))
    : [];
  const slots = master?.slots ?? [];
  const ready = Boolean(service && master && booking.slot);

  if (booking.confirmed && service && master && booking.slot) {
    return (
      <div className={styles.page}>
        <motion.div {...get('pop')}>
          <Card>
            <Flex direction="column" align="center" gap={8}>
              <span className={styles.successIcon}>
                <CheckCircleIcon className={styles.successGlyph} />
              </span>
              <Typography.Title variant="medium-strong">Вы записаны</Typography.Title>
              <Typography.Body variant="small" className={styles.muted}>
                {service.title} · {master.name} · {booking.slot}
              </Typography.Body>
              <Flex gap={6}>
                <Chip>{service.duration} мин</Chip>
                <Chip tone="accent">{priceLabel(service.price)}</Chip>
              </Flex>
              <Chip tone="success">Напомним за час в MAX</Chip>
              <Button size="small" mode="secondary" onClick={resetBooking}>
                Записаться ещё
              </Button>
            </Flex>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <StateGate emptyTitle="Запись недоступна" emptyText="Расписание появится позже.">
        <Card>
          <Flex align="center" gap={12}>
            <span className={styles.icon}>
              <CalendarDaysIcon className={styles.glyph} />
            </span>
            <div className={styles.intro}>
              <Typography.Title variant="medium-strong">Онлайн-запись</Typography.Title>
              <Typography.Body variant="small" className={styles.muted}>
                Услуга подбирает мастеров, мастер — свободное время
              </Typography.Body>
            </div>
          </Flex>
        </Card>

        <Section title="1. Услуга" after={service ? service.title : undefined}>
          <div className={styles.serviceGrid}>
            {services.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.serviceTile}
                data-selected={booking.serviceId === item.id ? 'true' : undefined}
                onClick={() => selectService(item.id)}
              >
                <span className={styles.serviceTitle}>{item.title}</span>
                <span className={styles.serviceMeta}>
                  {item.duration} мин · {priceLabel(item.price)}
                </span>
              </button>
            ))}
          </div>
        </Section>

        <Section title="2. Мастер" after={master ? master.name : undefined}>
          {booking.serviceId ? (
            <div className={styles.masters}>
              {availableMasters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.masterTile}
                  data-selected={booking.masterId === item.id ? 'true' : undefined}
                  onClick={() => selectMaster(item.id)}
                >
                  <span className={styles.avatar}>{item.name.slice(0, 1)}</span>
                  <span className={styles.masterBody}>
                    <span className={styles.masterName}>{item.name}</span>
                    <span className={styles.masterRole}>{item.role}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <Card className={styles.hintCard}>
              <Typography.Body variant="small" className={styles.muted}>
                Сначала выберите услугу — покажем только тех, кто её делает.
              </Typography.Body>
            </Card>
          )}
        </Section>

        <Section title="3. Время" after={booking.slot ?? undefined}>
          {master ? (
            <div className={styles.slots}>
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={styles.slot}
                  data-selected={booking.slot === slot ? 'true' : undefined}
                  onClick={() => selectSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <Card className={styles.hintCard}>
              <Typography.Body variant="small" className={styles.muted}>
                Выберите мастера — покажем его свободные окна.
              </Typography.Body>
            </Card>
          )}
        </Section>

        {service ? (
          <Card>
            <Flex direction="column" align="stretch" gap={10}>
              <Flex justify="space-between" gap={12}>
                <span className={styles.muted}>Услуга</span>
                <span className={styles.summaryValue}>{service.title}</span>
              </Flex>
              <Flex justify="space-between" gap={12}>
                <span className={styles.muted}>Мастер</span>
                <span className={styles.summaryValue}>{master ? master.name : 'не выбран'}</span>
              </Flex>
              <Flex justify="space-between" gap={12}>
                <span className={styles.muted}>Время</span>
                <span className={styles.summaryValue}>{booking.slot ?? 'не выбрано'}</span>
              </Flex>
              <Flex justify="space-between" gap={12}>
                <span className={styles.muted}>Стоимость</span>
                <span className={styles.summaryValue}>{priceLabel(service.price)}</span>
              </Flex>

              <Button mode="primary" stretched disabled={!ready} onClick={confirmBooking}>
                Подтвердить запись
              </Button>
            </Flex>
          </Card>
        ) : null}
      </StateGate>
    </div>
  );
}
