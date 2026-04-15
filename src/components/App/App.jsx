import { ButtonContainer, FloatingButton } from '../../shared/ui/buttons'
import Content from '../Content'
import Header from '../Header'
import Items from '../../pages/Items'
import Menu from '../Menu'
import styles from './App.module.scss'

function App() {

  return (
    <>
      <ButtonContainer>
      <div className={styles.app}>
        <Header />
        <Content>
          <Items />
        </Content>
        <Menu />
      </div>
      </ButtonContainer>
    </>
  )

}

export default App
