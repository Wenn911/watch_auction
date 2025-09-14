import React, { useState } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { UserCard } from './components/UserCard';
import { Button } from './components/Button';
import { ThemeToggle } from './components/ThemeToggle';
import './App.css';

function App() {
  const { showAlert, closeApp, isTelegram, theme } = useTelegram();
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    showAlert(`Счётчик: ${count + 1}`);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>Telegram Mini App</h1>
        
        {isTelegram ? (
          <>
            <UserCard />
            
            <div className="counter-section">
              <h2>Счётчик: {count}</h2>
              <div className="buttons-group">
                <Button onClick={handleIncrement} variant="primary">
                  Увеличить
                </Button>
                <Button onClick={handleDecrement} variant="secondary">
                  Уменьшить
                </Button>
              </div>
            </div>

            <ThemeToggle />

            <div className="actions">
              <Button onClick={closeApp} variant="secondary">
                Закрыть приложение
              </Button>
            </div>
          </>
        ) : (
          <div className="warning">
            <h2>⚠️ Это приложение предназначено для запуска в Telegram</h2>
            <p>Откройте приложение через Telegram бота для полного функционала</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;