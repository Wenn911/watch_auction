import React from 'react';
import { useTelegram } from '../hooks/useTelegram';
import './UserCard.css';

export const UserCard: React.FC = () => {
  const { user } = useTelegram();

  if (!user) {
    return <div className="user-card">Пользователь не найден</div>;
  }

  return (
    <div className="user-card">
      <h3>Информация о пользователе</h3>
      <div className="user-info">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Имя:</strong> {user.first_name}</p>
        {user.last_name && <p><strong>Фамилия:</strong> {user.last_name}</p>}
        {user.username && <p><strong>Username:</strong> @{user.username}</p>}
        {user.language_code && <p><strong>Язык:</strong> {user.language_code}</p>}
        {user.is_premium && <p><strong>Premium:</strong> ✅</p>}
      </div>
    </div>
  );
};