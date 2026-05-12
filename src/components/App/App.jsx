import AppRouter from '../../router/AppRouter'
import { useState } from 'react'
import useLocalStorage from '../../shared/hooks/uselocalstorage'

/**
 * Sovelluksen juurikomponentti.
 *
 * Komponentti hallitsee budjettisovelluksen keskeistä tilaa ja
 * välittää datan sekä käsittelijäfunktiot `AppRouter`-komponentille.
 *
 * Tallennettavat tiedot:
 * - `data`: sovelluksen budjettimerkinnät
 * - `typelist`: sovelluksen kulutyypit
 *
 * Komponentin vastuulla on:
 * - hakea ja tallentaa merkintädata
 * - hakea ja tallentaa kulutyypit
 * - lisätä uusia merkintöjä tai päivittää olemassa olevia
 * - poistaa merkintöjä id:n perusteella
 * - lisätä uusia kulutyyppejä ja järjestää ne aakkosjärjestykseen
 * - järjestää merkinnät maksupäivän mukaan siten, että uusin näkyy ensin
 *
 * @returns {JSX.Element} Sovelluksen reitityksestä vastaava `AppRouter`-komponentti,
 * jolle välitetään data, kulutyypit sekä käsittelijäfunktiot propsien kautta.
 */
function App() {

  // Sovelluksen merkintädata, joka välitetään eteenpäin reitittäjälle.
  const [data, setData] = useLocalStorage('omabudjetti-data',[])

  // Sovelluksen kulutyypit, jotka välitetään eteenpäin reitittäjälle.
  const [typelist, setTypelist] = useLocalStorage('omabudjetti-typelist',[])

  // Poistaa rivin sovelluksen datasta id:n perusteella.
  const handleItemDelete = (id) => {

    // Tehdään kopio nykyisestä datasta.
    let copy = data.slice()

    // Suodatetaan pois se rivi, jonka id vastaa poistettavaa id:tä.
    copy = copy.filter(item => item.id !== id)

    // Päivitetään state suodatetulla datalla.
    setData(copy)

  }

  // Käsittelee ja tallentaa lomakkeelle syötetyistä
  // tiedoista uuden rivin tai muokkaa olemassaolevaa.
  const handleItemSubmit = (newitem) => {

     // Luodaan kopio nykyisestä datasta, jotta statea ei muuteta suoraan.
    let copy = data.slice()

    // Etsitään merkintää, jolla on sama id kuin tallennettavalla merkinnällä.
    const index = copy.findIndex(item => item.id === newitem.id)
    if (index >= 0) {
      // Jos rivi löytyi taulukosta, kyseessä on muokkaus →
      // korvataan vanha uudella
      copy[index] = newitem
    } else {
      // Jos riviä ei löytynyt, kyseessä on lisäys.
      copy.push(newitem)
    }

    // Järjestetään rivit maksupäivän mukaan (uusin ensin)
    copy.sort( (a,b) => {
      const aDate = new Date(a.paymentDate)
      const bDate = new Date(b.paymentDate)
      return bDate - aDate
    })

    // Päivitetään sovelluksen state uudella, käsitellyllä datalla.
    setData(copy)
  }

  // Käsittelee uuden tyypin lisäyksen, lisää annetun
  // type-arvon typelist-taulukkoon, järjestää listan
  // ja päivittää staten.
  const handleTypeSubmit = (type) => {
    let copy = typelist.slice()
    copy.push(type)
    copy.sort()
    setTypelist(copy)
  }

  return (
    <>
      <AppRouter data={data}
                 typelist={typelist}
                 onItemSubmit={handleItemSubmit}
                 onItemDelete={handleItemDelete}
                 onTypeSubmit={handleTypeSubmit} />
    </>
  )
}

export default App