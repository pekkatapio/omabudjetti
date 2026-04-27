import styles from './Items.module.scss'
import { FloatingButton } from '../../shared/ui/buttons'
import Item from '../../components/Item'
import { useLoaderData } from 'react-router'

/**
 * Items-näkymäkomponentti.
 *
 * Hakee item-datan React Routerin loaderin kautta ja
 * renderöi sen Item-komponentteina listaksi.
 * Näkymä sisältää myös kelluvan toimintopainikkeen.
 *
 * @returns {JSX.Element}
 */
function Items() {

  // Haetaan loader-funktion palauttama data.
  const data = useLoaderData()

  // Muodostetaan Item-komponenttien lista datasta,
  // jokaiselle Itemille annetaan yksilöllinen key.
  const items = data.map(item => <Item key={item.id} data={item} />)

  return (
    <div className={styles.items}>
      { items }
      <FloatingButton secondary>+</FloatingButton>
    </div>
  )
}

export default Items