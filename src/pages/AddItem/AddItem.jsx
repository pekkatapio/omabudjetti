import ItemForm from '../../components/ItemForm'
import styles from './AddItem.module.scss'

function AddItem(props) {

  return (
    <div className={styles.additem}>
      <h2>Uuden merkinnän lisääminen</h2>
      <ItemForm onItemSubmit={props.onItemSubmit}
                typelist={props.typelist} />
    </div>
  )

}

export default AddItem