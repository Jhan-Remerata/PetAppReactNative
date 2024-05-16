import React, { createContext, useState, useEffect } from 'react';
import { retrieveData, storeData } from '../hooks/kv-store'; // Adjust the import path as necessary

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isAppointmentAccepted, setIsAppointmentAccepted] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await retrieveData('userNotifications') || [];
      setNotificationCount(notifications.length);
    };

    fetchNotifications();
  }, []);

  const clearNotifications = async () => {
    await storeData('userNotifications', []); // Clear notifications in storage
    setNotificationCount(0); // Update state to reflect cleared notifications
  };

  return (
    <NotificationContext.Provider value={{ isAppointmentAccepted, setIsAppointmentAccepted, notificationCount, setNotificationCount, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
