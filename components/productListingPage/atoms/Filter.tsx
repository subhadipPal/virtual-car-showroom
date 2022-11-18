import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { getFilteredRecords } from '../../../utils'
import { OfferDataContext } from '../../../context'
import { AppContext } from '../../../context/appContext'

interface IFilter {
  title: string
  values: string[]
}

export default function Filter({ title, values }: IFilter) {
  const { offers, toggleFilteredOffers, appliedFilters, updateAppliedFilters } =
    useContext(OfferDataContext)

  const { toggleAppliedFilters: toggleAppAppliedFilters } =
    useContext(AppContext)

  const [value, setValue] = useState(appliedFilters?.[title])

  useEffect(() => {
    const filteredRecords = getFilteredRecords(appliedFilters, offers)
    toggleFilteredOffers?.(filteredRecords)
  }, [appliedFilters, offers, toggleFilteredOffers])

  const handleChange = (event: SelectChangeEvent) => {
    const filterVal = event.target.value as string
    setValue(filterVal)
    updateAppliedFilters?.({
      ...appliedFilters,
      [title]: filterVal
    })
    toggleAppAppliedFilters?.({
      ...appliedFilters,
      [title]: filterVal
    })
  }

  return (
    <Box sx={{ width: '80%', margin: '10px' }}>
      <FormControl fullWidth>
        <InputLabel>{title.toUpperCase()}</InputLabel>
        <Select value={value} label={title} onChange={handleChange}>
          {values.map((val) => (
            <MenuItem key={val} value={val}>
              {`${val}`.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
