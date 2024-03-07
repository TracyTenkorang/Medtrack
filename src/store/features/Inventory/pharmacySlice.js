import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  drugs: [],
  drug: [],
  unitOfPricing: [],
  loading: false,
  error: null,
};

// add a drug
export const addDrugThunk = createAsyncThunk(
  "drugs/addDrug",
  async (drugs, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8081/pharm/v1/drug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drug_name: drugs.drug_name,
          description: drugs.description,
          drug_code: drugs.drug_code,
          unit_of_pricing: drugs.unit_of_pricing,
          price: drugs.price,
        }),
      });
      const data = await response.json(drugs);

      if (response.status === 400) {
        return thunkAPI.rejectWithValue(data.message);
      }

      if (response.status === 500) {
        return thunkAPI.rejectWithValue(data.message);
      }


      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// fetch all drugs
export const fetchDrugsThunk = createAsyncThunk(
  "drugs/allDrugs",
  async (drugs, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8081/pharm/v1/drugs");
      const data = await response.json(drugs);

      const sortedData = data.sort((a, b) =>
        a.drug_name.localeCompare(b.drug_name)
      );
      return sortedData;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// get unit of pricing
export const fetchUnitThunk = createAsyncThunk(
  "drugs/allUnits",
  async (units, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:8081/pharm/v1/unit-of-pricing"
      );
      const data = await response.json(units);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// fetch a single drug
export const fetchDrugThunk = createAsyncThunk(
  "drugs/aDrug",
  async (drug, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8081/pharm/v1/drug/${drug}`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete a drug
export const deleteDrugThunk = createAsyncThunk(
  "drugs/deleteDrug",
  async (drug, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8081/pharm/v1/drug/${drug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // eslint-disable-next-line no-unused-vars
      const deleteDrug = await response.json();
      return drug;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// update a drug
export const updateDrugThunk = createAsyncThunk(
  "drugs/updateDrug",
  async (drug, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8081/pharm/v1/drug/${drug._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drug_name: drug.drug_name,
            description: drug.description,
            drug_code: drug.drug_code,
            unit_of_pricing: drug.unit_of_pricing,
            price: drug.price,
          }),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// search drugs
export const searchDrugsThunk = createAsyncThunk(
  "drugs/searchDrugs",
  async (search, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8081/pharm/v1/search-drugs?search=${search}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const pharmacySlice = createSlice({
  name: "drugs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // adding a drug
      .addCase(addDrugThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDrugThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drugs.push(action.payload);
      })
      .addCase(addDrugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetching all drugs
      .addCase(fetchDrugsThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchDrugsThunk.fulfilled, (state, action) => {
        state.loading = true;
        state.drugs = action.payload;
      })
      .addCase(fetchDrugsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetching unit of pricing
      .addCase(fetchUnitThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchUnitThunk.fulfilled, (state, action) => {
        state.loading = true;
        state.unitOfPricing = action.payload;
      })
      .addCase(fetchUnitThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // //fetching a single drug
      .addCase(fetchDrugThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchDrugThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drug = action.payload;
      })
      .addCase(fetchDrugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // deleting a drug
      .addCase(deleteDrugThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(deleteDrugThunk.fulfilled, (state, action) => {
        state.loading = true;
        state.drugs = state.drugs.filter((drug) => drug._id !== action.payload);
      })
      .addCase(deleteDrugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // updating a drug
      .addCase(updateDrugThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDrugThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drugs = state.drugs.map((drug) =>
          drug._id === action.payload._id ? action.payload : drug
        );
      })
      .addCase(updateDrugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // search drugs
      .addCase(searchDrugsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchDrugsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drugs = action.payload;
      })
      .addCase(searchDrugsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Search failed";
      });
  },
});

export default pharmacySlice.reducer;
