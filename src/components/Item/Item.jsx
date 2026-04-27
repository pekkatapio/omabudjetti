import { MdNavigateNext } from 'react-icons/md'
import styles from './Item.module.scss'

function Item({data, ...props}) {

  // Käytettävä lokaaliasetus päivämäärän muotoiluun.
  const locale = "fi-FI"

  // Muodostetaan maksupäivä Date-oliosta ja muotoillaan se käyttäjän
  // lokaalin mukaan.
  const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale)

  return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>{data.type}</div>
        <div className={styles.item_amount}>{data.amount} €</div>
        <div className={styles.item_date}>{paymentDate}</div>
        <div className={styles.item_timespan}>{data.periodStart} - {data.periodEnd}</div>
        <div className={styles.item_receiver}>{data.receiver}</div>
        <div className={styles.item_average}>? €/kk</div>
      </div>
      <div className={styles.item_edit}>
        <MdNavigateNext />
      </div>
    </div>
  )

}

export default Item