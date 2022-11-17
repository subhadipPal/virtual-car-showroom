import { createRef, memo, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react'
import OfferTile from './molecules/OfferTile'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import SideNav from './molecules/SideNav'
import HeaderToolbar from './molecules/HeaderToolbar'
import { OfferDataContext } from '../../context'
import useLazyLoad from "../../hooks/useLazyLoad";

const NUM_PER_PAGE = 6

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
      },
      tileHidden: {
        opacity: 0
      },
      tileVisible: {
        transform: 'translateX(0)',
        opacity: 1
      }
    }),
)

const PLP = () => {
  const { offerTileContainer, tileHidden, tileVisible } = useStyles()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { offers: allOffers, filteredOffers, redirectToPDP } = useContext(OfferDataContext);
  const [updatedOffers, setUpdatedOffers] = useState(allOffers)
  const [localLoadingState, setLoadingState] = useState(true)
  
  useEffect(() => {
    if(filteredOffers){
      setUpdatedOffers(filteredOffers)
      setLoadingState(false)
    }
  }, [filteredOffers])

  const triggerRef = useRef(null)
  // @ts-ignore:next-line
  const onGrabData = (currentPage) => {
    return new Promise((resolve) => {
      if(localLoadingState){
        setTimeout(() => {
          const data = updatedOffers?.slice(
            (currentPage - 1) * NUM_PER_PAGE,
            NUM_PER_PAGE * currentPage
          );
          resolve(data);
        }, 1);
      }
    });
  };
  
  // @ts-ignore:next-line
  let { data, loading } = useLazyLoad({ triggerRef, onGrabData });

  if(filteredOffers){
    data = filteredOffers
    loading = false
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
      <div>
        <SideNav isOpen={isSideNavOpen} toggleSideNav={toggleSideNav}></SideNav>
        <section className={offerTileContainer}>
          {/* @ts-ignore:next-line */}
          {data?.map((offerRec, index) => {
            return (
              <div key={offerRec.offerID}
                data-testid="card"
                id={offerRec.offerID}
                onClick={() => redirectToPDP?.(offerRec.offerID)}>
                <OfferTile record={offerRec} />
              </div>
            )
          })}
          <div ref={triggerRef} className={loading ? tileVisible: tileHidden}>
            Loading data...
          </div>
        </section>
      </div>
    </div>
  )
}

export default memo(PLP)