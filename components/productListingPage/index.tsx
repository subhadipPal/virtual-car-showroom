import { memo, useContext, useState } from 'react'
import { Record } from '../../typings'
import OfferTile from './molecules/OfferTile'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { LazyLoad } from 'react-observer-api'
import SideNav from './molecules/SideNav'
import HeaderToolbar from './molecules/HeaderToolbar'
import { OfferDataContext } from '../../context'

const useStyles = makeStyles<Theme>(
  (theme: Theme) =>
    createStyles({
      offerTileContainer: {
        margin: 'auto 100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        padding: '20px 0',
        gap: '30px',
        [theme.breakpoints.down('lg')]: {
          gridTemplateColumns: 'repeat(2, 1fr)',
          margin: 'auto 50px',
        },
        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: '1fr',
          margin: 20
        },
      }
    }),
)

const PLP = () => {
  const { offerTileContainer } = useStyles()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { offers: allOffers, filteredOffers } = useContext(OfferDataContext);
  let updatedOffers = allOffers
  if (filteredOffers) {
    updatedOffers = filteredOffers
  }

  const toggleSideNav =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setIsSideNavOpen(open);
      };

  return (
    <div>
      <HeaderToolbar toggleSideNav={toggleSideNav} />
      <div className={offerTileContainer}>
        <SideNav isOpen={isSideNavOpen} toggleSideNav={toggleSideNav}></SideNav>
        {updatedOffers?.map((offerRec) => (
          <div key={offerRec.offerID} data-testid="card">
            <LazyLoad config={{ always: true }}>
              <OfferTile record={offerRec} />
            </LazyLoad>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(PLP)