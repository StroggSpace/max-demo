import { motion } from 'motion/react';
import { CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button, Flex, Typography } from '@maxhub/max-ui';

import { Card, Chip, Section, StateGate } from '@/shared/ui/kit';
import { useMotionControls } from '@/shared/motion/useMotionControls';
import { useSectionScenario } from '@/features/scenario/useSectionScenario';
import { scenarios } from '@/scenarios';
import { useServiceStore } from '@/store/service';
import styles from './BookingTab.module.css';

export function BookingTab() {
  useSectionScenario(scenarios['service-booking']);
  const { get } = useMotionControls();

  const services = useServiceStore((s) => s.services);
  const specialists = useServiceStore((s) => s.specialists);
  const slots = useServiceStore((s) => s.slots);
  const booking = useServiceStore((s) => s.booking);
  const selectBooking = useServiceStore((s) => s.selectBooking);
  const confirmBooking = useServiceStore((s) => s.confirmBooking);
  const resetBooking = useServiceStore((s) => s.resetBooking);

  const ready = Boolean(booking.service && booking.specialist && booking.slot);

  if (booking.confirmed) {
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
                {booking.service} · {booking.specialist} · {booking.slot}
              </Typography.Body>
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
                Выберите услугу, специалиста и время
              </Typography.Body>
            </div>
          </Flex>
        </Card>

        <Section title="Услуга" after={booking.service ?? undefined}>
          <div className={styles.chips}>
            {services.map((service) => (
              <Button
                key={service}
                size="small"
                mode={booking.service === service ? 'primary' : 'secondary'}
                onClick={() => selectBooking({ service })}
              >
                {service}
              </Button>
            ))}
          </div>
        </Section>

        <Section title="Специалист" after={booking.specialist ?? undefined}>
          <div className={styles.chips}>
            {specialists.map((specialist) => (
              <Button
                key={specialist}
                size="small"
                mode={booking.specialist === specialist ? 'primary' : 'secondary'}
                onClick={() => selectBooking({ specialist })}
              >
                {specialist}
              </Button>
            ))}
          </div>
        </Section>

        <Section title="Время" after={booking.slot ?? undefined}>
          <div className={styles.slots}>
            {slots.map((slot) => (
              <Button
                key={slot}
                size="small"
                mode={booking.slot === slot ? 'primary' : 'secondary'}
                stretched
                onClick={() => selectBooking({ slot })}
              >
                {slot}
              </Button>
            ))}
          </div>
        </Section>

        <Button mode="primary" stretched disabled={!ready} onClick={confirmBooking}>
          Подтвердить запись
        </Button>
      </StateGate>
    </div>
  );
}
