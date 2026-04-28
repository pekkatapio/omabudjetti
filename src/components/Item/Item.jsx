import { Link } from 'react-router'
import { MdNavigateNext } from 'react-icons/md'
import styles from './Item.module.scss'

/**
 * Item‑komponentti vastaa yksittäisen tapahtuman näyttämisestä.
 *
 * Komponentti saa datan propsien kautta ja:
 * - muotoilee päivämäärät käyttäjän lokaalin (fi-FI) mukaisesti
 * - muotoilee rahasummat euromuotoon Intl.NumberFormat‑API:n avulla
 * - laskee tarvittaessa keskimääräisen kuukausisummaa ajanjakson perusteella
 *
 * @param {Object} props - Komponentin propsit
 * @param {Object} props.data - Yksittäisen itemin data
 * @returns {JSX.Element} Renderöity item‑näkymä
 */
function Item({data, ...props}) {

  // Käytettävä lokaaliasetus päivämäärän muotoiluun.
  const locale = "fi-FI"

  // Muodostetaan maksupäivä Date-oliosta ja muotoillaan se käyttäjän
  // lokaalin mukaan.
  const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale)

  // Luodaan NumberFormat-olio euromääräisten summien esittämiseen.
  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR'
  })

  // Muotoillaan rahasumma käyttäjän lokaalin mukaiseen valuuttamuotoon.
  const amount = numberFormat.format(data.amount)

  // Muuttujat keskimääräiselle määrälle ja ajanjaksolle.
  let average
  let period

  // Lasketaan arvot vain, jos sekä alku- että loppupäivä
  // ovat olemassa.
  if (data.periodStart && data.periodEnd) {

    // Muodostetaan Date-oliot ajanjakson alku- ja loppupäivistä.
    const periodStart = new Date(data.periodStart)
    const periodEnd = new Date(data.periodEnd)

    // Muotoillaan ajanjakso näytettävään merkkijonoon.
    period = periodStart.toLocaleDateString(locale) + " - " +
             periodEnd.toLocaleDateString(locale)

    // Lasketaan päivien määrä aikavälillä (millisekunneista päiviksi).
    const days = (periodEnd - periodStart) / (24*60*60*1000)

    // Lasketaan keskimääräinen kuukausisumma (30 päivän mukaan).
    average = numberFormat.format(data.amount / days * 30)
  }

  return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>{data.type}</div>
        <div className={styles.item_amount}>{amount}</div>
        <div className={styles.item_date}>{paymentDate}</div>
        <div className={styles.item_timespan}>{period}</div>
        <div className={styles.item_receiver}>{data.receiver}</div>
        <div className={styles.item_average}>{average ? average + "/kk" : ""}</div>
      </div>
      <div className={styles.item_edit}>
        <Link to={"/edit/" + data.id} viewTransition><MdNavigateNext /></Link>
      </div>
    </div>
  )

}

export default Item