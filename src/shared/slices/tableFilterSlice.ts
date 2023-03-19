import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TableFilterState {
  tableInstance: any;
  allColumns: any;
}

const initialState: TableFilterState = {
  tableInstance: undefined,
  allColumns: null
}

export const tableFilterSlice = createSlice({
  name: 'tableFilter',
  initialState,
  reducers: {
    updateTableInstance: (state, action: PayloadAction<any>) => {
      state.tableInstance = action.payload
    },
    setAllColumns: (state, action: PayloadAction<any>) => {
      state.allColumns = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateTableInstance, setAllColumns } = tableFilterSlice.actions

export default tableFilterSlice.reducer