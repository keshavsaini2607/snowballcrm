import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TableFilterState {
   tableInstance: any;
   allColumns: any;
   showOnlyRow: any[];
}

const initialState: TableFilterState = {
   tableInstance: undefined,
   allColumns: null,
   showOnlyRow: [],
};

export const tableFilterSlice = createSlice({
   name: "tableFilter",
   initialState,
   reducers: {
      updateTableInstance: (state, action: PayloadAction<any>) => {
         state.tableInstance = action.payload;
      },
      setAllColumns: (state, action: PayloadAction<any>) => {
         state.allColumns = action.payload;
      },
      setShowOnlyRow: (state, action: PayloadAction<any>) => {
         const alreadyExists = state.showOnlyRow.find(
            (column) => column.user_id === action.payload.user_id
         );
         if (!alreadyExists) {
            state.showOnlyRow = [...state.showOnlyRow, action.payload];
         } else {
            state.showOnlyRow = state.showOnlyRow.filter(
               (column) => column.user_id !== action.payload.user_id
            );
         }
      },
   },
});

// Action creators are generated for each case reducer function
export const { updateTableInstance, setAllColumns, setShowOnlyRow } =
   tableFilterSlice.actions;

export default tableFilterSlice.reducer;
