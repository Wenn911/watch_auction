import { Navbar } from '$/containers/Navbar'

import { useTelegram } from '../hooks/useTelegram'

function App() {
  const { showAlert, closeApp, isTelegram, theme } = useTelegram()

  return (
    <div className="container">
      {isTelegram ? 
          (<Navbar />)
        : (
            <div className="warning">
              <h2>⚠️ Это приложение предназначено для запуска в Telegram</h2>
              <p>Откройте приложение через Telegram бота для полного функционала</p>
            </div>
          )}
    </div>
  )
}

export default App