import '@mantine/core/styles.css';
import { Box, MantineProvider, useMantineTheme } from '@mantine/core'
import { theme } from './theme'
import { MainPage } from './pages/MainPage'
import styles from './App.module.scss'

function AppContent() {
  const theme = useMantineTheme();
  
  return (
    <Box className={styles.mainPageBox} style={{ backgroundColor: theme.colors.appBackground[0] }}>
      <MainPage />
    </Box>
  )
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppContent />
    </MantineProvider>
  )
}

export default App
