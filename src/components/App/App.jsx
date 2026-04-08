import Header from '../Header'
import Item from '../Item'
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
      </div>
    </>
  )

}

export default App
