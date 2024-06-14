import React, {FC} from 'react'
import Calendar from 'react-calendar'
import {Box, CSObject} from '@effortless-ui'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'

import {Dropdown} from '@/app/components/ui'
import {theme} from '@/app/styles'

export interface IDatepickerProps {
  onChange(value: [Date, Date]): void
  value?: [Date, Date]
}

const reactCalendarStyles: CSObject = {
  '.react-calendar': {
    width: 300,
    maxWidth: '100%',
    background: theme.color.white,
    'button:enabled': {
      cursor: 'pointer',
    },
    '*:disabled': {
      opacity: 0.5,
    },
  },
  '.react-calendar__navigation': {
    display: 'flex',
    mb: theme.spacing.s,
    button: {
      p: 0,
      border: 'none',
      transition: 'color 200ms',
    },
    'button:enabled:hover': {
      color: theme.color.primary,
    },
  },
  '.react-calendar__month-view__weekdays': {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: theme.font.size.small,
  },
  '.react-calendar__month-view__weekdays__weekday': {
    py: theme.spacing.xs,
  },
  '.react-calendar__month-view__days__day--weekend': {
    color: theme.color.error,
  },
  '.react-calendar__month-view__days__day--neighboringMonth, .react-calendar__decade-view__years__year--neighboringDecade, .react-calendar__century-view__decades__decade--neighboringCentury':
    {
      color: theme.color.faded,
    },
  '.react-calendar__year-view .react-calendar__tile, .react-calendar__decade-view .react-calendar__tile, .react-calendar__century-view .react-calendar__tile':
    {},
  '.react-calendar__tile': {
    maxWidth: '100%',
    p: theme.spacing.xs,
    background: 'transparent',
    textAlign: 'center',
    fontSize: theme.font.size.small,
    transition: 'color 100ms, background-color 100ms, border-color 100ms',
    border: '1px solid',
    borderColor: theme.color.white,
    '&:enabled:hover': {
      color: theme.color.primary,
    },
  },
  '.react-calendar__tile--now': {
    borderColor: theme.color.text,
    borderRadius: theme.radii.s,
    ':enabled:hover': {
      borderColor: theme.color.primary,
    },
  },
  '.react-calendar__tile--active, .react-calendar--selectRange .react-calendar__tile--hover': {
    color: theme.color.white,
    borderColor: theme.color.text,
    backgroundColor: theme.color.text,
    '&:enabled:hover': {
      color: theme.color.white,
      borderColor: theme.color.text,
    },
  },
  '.react-calendar__tile--range, .react-calendar__tile--hover': {
    borderRadius: 0,
  },
  '.react-calendar__tile--rangeStart': {
    borderStartStartRadius: theme.radii.s,
    borderEndStartRadius: theme.radii.s,
  },
  '.react-calendar__tile--rangeEnd': {
    borderStartEndRadius: theme.radii.s,
    borderEndEndRadius: theme.radii.s,
  },
  '.react-calendar__tile--hoverStart': {
    borderStartStartRadius: theme.radii.s,
    borderEndStartRadius: theme.radii.s,
    borderStartEndRadius: 0,
    borderEndEndRadius: 0,
  },
  '.react-calendar__tile--hoverEnd': {
    borderStartStartRadius: 0,
    borderEndStartRadius: 0,
    borderStartEndRadius: theme.radii.s,
    borderEndEndRadius: theme.radii.s,
  },
  '.react-calendar__tile--hoverBothEnds': {
    borderStartStartRadius: theme.radii.s,
    borderEndStartRadius: theme.radii.s,
    borderStartEndRadius: theme.radii.s,
    borderEndEndRadius: theme.radii.s,
  },
}

export const Datepicker: FC<IDatepickerProps> = ({onChange, value}) => {
  return (
    <Dropdown label="Data">
      {() => (
        <Box cs={reactCalendarStyles}>
          <Calendar
            onChange={(_value) => {
              if (_value) onChange(_value as [Date, Date])
            }}
            value={value ?? null}
            locale="pl"
            selectRange
            nextLabel={<IconChevronRight size={24} stroke={1.5} />}
            next2Label={null}
            prevLabel={<IconChevronLeft size={24} stroke={1.5} />}
            prev2Label={null}
          />
        </Box>
      )}
    </Dropdown>
  )
}
