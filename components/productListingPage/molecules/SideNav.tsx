import { useContext } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Filter from '../atoms/Filter'
import { filters, getRespectiveFilterValues } from '../../../utils'
import { OfferDataContext } from '../../../context'
import { Record } from '../../../typings'

interface ISideNav {
  isOpen: boolean
  toggleSideNav: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

export default function SideNav({ isOpen, toggleSideNav }: ISideNav) {
  const { offers } = useContext(OfferDataContext)

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleSideNav(false)}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {filters.map((filter) => (
            <ListItem key={filter} disablePadding>
              <Filter
                title={filter as keyof Record}
                values={getRespectiveFilterValues(
                  filter as keyof Record,
                  offers
                )}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
