import { RouterProvider } from 'react-router'

import { Provider } from 'react-redux'

import { router } from '$/router'

import { Provider as ChakraProvider } from './ChakraProvider'
import { store } from './store'

export const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  )
}

export default App