import AppRouter from '../../router/AppRouter'
import { useState } from 'react'
import testdata from './testdata.js'

function App() {

  // Sovelluksen merkintädata, joka välitetään eteenpäin reitittäjälle.
  const [data, setData] = useState(testdata)

  // Käsittelee ja tallentaa lomakkeelle syötetyistä
  // tiedoista uuden rivin tai muokkaa olemassaolevaa.
  const handleItemSubmit = (newitem) => {
    let copy = data.slice()
    copy.push(newitem)
    copy.sort( (a,b) => {
      const aDate = new Date(a.paymentDate)
      const bDate = new Date(b.paymentDate)
      return bDate - aDate
    })
    setData(copy)
  }

  return (
    <>
      <AppRouter data={data} onItemSubmit={handleItemSubmit} />
    </>
  )
}

export default App