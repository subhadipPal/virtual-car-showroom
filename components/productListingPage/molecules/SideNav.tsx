import { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Filter from '../atoms/Filter';
import { filters, getRespectiveFilterValues } from '../../../utils'
import { OfferDataContext } from '../../../context';
import { Record } from '../../../typings';

interface ISideNav {
  isOpen: boolean,
  toggleSideNav: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

export default function SideNav({ isOpen, toggleSideNav }: ISideNav) {
  const { offers, toggleFilteredOffers } = useContext(OfferDataContext)


  return (
    <>
      <Drawer
        anchor='left'
        open={isOpen}
        onClose={toggleSideNav(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            {filters.map((filter, index) => (
              <ListItem key={filter} disablePadding>
                <Filter 
                title={filter as keyof Record} 
                values={getRespectiveFilterValues(filter as keyof Record, offers)}
                offers={offers}
                handleApplyFilter={toggleFilteredOffers}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}