import Header from '../Header'
import Item from '../Item'
import Menu from '../Menu'
import styles from './App.module.scss'

function App() {

  return (
    <>
      <div className={styles.app}>
        <Header />
        <Item />
        <Item />
        <Item />
        <Item />
        <Menu />
      </div>
    </>
  )

}

export default App
