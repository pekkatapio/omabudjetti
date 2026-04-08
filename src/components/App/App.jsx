import Item from '../Item'
import styles from './App.module.scss'

function App() {

  return (
    <>
      <div className={styles.app}>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  )

}

export default App
