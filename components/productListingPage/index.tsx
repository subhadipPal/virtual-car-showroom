import { memo } from 'react'
import { Record } from '../../typings'
import OfferTile from '../common/OfferTile'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles<Theme>(
  (theme: Theme) =>
    createStyles({
      offerTileContainer: {
        margin: 'auto 200px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        paddingTop: '20px',
        gap: '20px',
      }
    }),
)

const PLP = ({ records }: {records: Record[]}) => {
  const {offerTileContainer} = useStyles()

  return (
    <div className={offerTileContainer}>
      { records.map((record) => (
        <div key={record.offerID}>
          <OfferTile record={record}/>
        </div>
      ))}
    </div>
  )
}

export default memo(PLP)