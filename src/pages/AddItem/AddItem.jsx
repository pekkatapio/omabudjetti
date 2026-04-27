import ItemForm from '../../components/ItemForm'
import styles from './AddItem.module.scss'

function AddItem(props) {

  return (
    <div>
      <h2>Uuden merkinnän lisääminen</h2>
      <ItemForm />
    </div>
  )

}

export default AddItem