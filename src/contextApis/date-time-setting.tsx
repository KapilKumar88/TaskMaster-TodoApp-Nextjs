'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import moment from 'moment-timezone';

export type DateTimeSettingContextType = {
  formatDateTime: (date: Date) => string;
};

const DateTimeSettingContext = createContext<DateTimeSettingContextType | null>(
  null,
);

export const DateTimeSettingProvider = ({
  userTimezone,
  userDateTimeFormat,
  children,
}: {
  userTimezone: string;
  userDateTimeFormat: string;
  children: React.ReactNode;
}) => {
  const [timezone, setTimezone] = useState<string>(userTimezone);
  const [dateTimeFormat, setDateTimeFormat] =
    useState<string>(userDateTimeFormat);

  useEffect(() => {
    setTimezone(userTimezone);
    setDateTimeFormat(userDateTimeFormat);
  }, [userTimezone, userDateTimeFormat]);

  const formatDateTime = (date: Date) => {
    const formatted = moment(date).tz(timezone).format(dateTimeFormat);
    return formatted;
  };

  const value = useMemo(() => ({ formatDateTime }), [formatDateTime]);

  return (
    <DateTimeSettingContext.Provider value={value}>
      {children}
    </DateTimeSettingContext.Provider>
  );
};

export const useDateTimeSettingContext = (): DateTimeSettingContextType => {
  const context = useContext(DateTimeSettingContext);
  if (!context) {
    throw new Error(
      'useDateTimeSettingContext must be used within a DateTimeSettingProvider',
    );
  }
  return context;
};
