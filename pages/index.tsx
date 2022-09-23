import type { NextPage } from 'next'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { Layout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui'

const HomePage: NextPage = () => {

  return (
    <Layout title='Home - OpenJira'>

      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 } > 
        {/* xs es para definir el tamaño de columnas en grid, y sx es un extented style */}
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pendientes' />

            <CardContent>
              {/* Agregar una nueva entrada */}
              <NewEntry />
              <EntryList status='pending' />
            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card  sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='En progreso' />

            <CardContent>
              {/* Agregar una nueva entrada */}
              <EntryList status='in-progress' />
            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card  sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completadas' />

            <CardContent>
              {/* Agregar una nueva entrada */}
              <EntryList status='finished' />
            </CardContent>

          </Card>
        </Grid>

      </Grid>

    </Layout>
  )
}
export default HomePage
