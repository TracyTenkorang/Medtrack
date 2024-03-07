import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  labs: [],
  lab: [],
  labType: [],
  loading: false,
  error: null,
};

// add a lab
export const addlabThunk = createAsyncThunk("labs/addLab", async (labs, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:8081/lab/v1/lab", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lab_item: labs.lab_item,
        lab_type: labs.lab_type,
        category: labs.category,
        sub_category: labs.sub_category,
        code: labs.code,
        price: labs.price,
      }),
    });
    const data = await response.json(labs);

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
});

// fetching all labs by lab type
export const fetchLabsByTypeThunk = createAsyncThunk("labs/getLabsByType", async (labType, thunkAPI ) => {
    try {
      const response = await fetch("http://localhost:8081/lab/v1/getlabType", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lab_type: labType,
        }),
      });

      if (response.status === 400) {
        return thunkAPI.rejectWithValue(data.message);
      }

      if (response.status === 500) {
        return thunkAPI.rejectWithValue(data.message);
      }

      const data = await response.json();

      const labsByType = data.map((lab) => ({
        category: lab.category,
        categories: lab.categories || [],
      }));
      
      return labsByType;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// fetch all labs
export const fetchLabsThunk = createAsyncThunk("labs/allLabs", async (labs, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:8081/lab/v1/labs");
    const data = await response.json(labs);

    
    const sortedData = data.sort((a, b) =>
    a.lab_item.localeCompare(b.lab_item)
  );

    return sortedData;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// get lab type
export const fetchLabTypeThunk = createAsyncThunk(
  "labs/allLabType",
  async (labType, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8081/lab/v1/labType");
      const data = await response.json(labType);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// fetch a single lab
export const fetchLabThunk = createAsyncThunk("labs/allLab", async (lab, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:8081/lab/v1/lab/${lab}`);
    // eslint-disable-next-line no-unused-vars
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// delete a lab
export const deleteLabThunk = createAsyncThunk("labs/deleteLab", async (id, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:8081/lab/v1/lab/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // eslint-disable-next-line no-unused-vars
    const deleteLab = await response.json();
    return id;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// update a lab
export const updateLabThunk = createAsyncThunk("labs/updateLab", async (lab, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8081/lab/v1/lab/${lab._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lab_item: lab.lab_item,
            lab_type: lab.lab_type,
            category: lab.category,
            sub_category: lab.sub_category,
            code: lab.code,
            price: lab.price,
          }),
        }
      );
      const labUpdate = await response.json();
      return labUpdate;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// search labs
export const searchLabsThunk = createAsyncThunk(
  "labs/searchLabs",
  async (search, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8081/lab/v1/search-labs?search=${search}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const labSlice = createSlice({
  name: "labs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // adding a lab
      .addCase(addlabThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addlabThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.labs.push(action.payload);
      })
      .addCase(addlabThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetching all labs
      .addCase(fetchLabsThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchLabsThunk.fulfilled, (state, action) => {
        state.loading = true;
        state.labs = action.payload;
      })
      .addCase(fetchLabsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetching all labs by lab type
      .addCase(fetchLabsByTypeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLabsByTypeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.labs = action.payload;
      })
      .addCase(fetchLabsByTypeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // //fetching a single lab
      .addCase(fetchLabThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchLabThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.labs = state.labs.map((lab) =>
          lab._id === action.payload._id ? action.payload : lab
        );
        state.lab = action.payload;
      })
      .addCase(fetchLabThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetching lab type
      .addCase(fetchLabTypeThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchLabTypeThunk.fulfilled, (state, action) => {
        state.loading = true;
        state.labType = action.payload;
      })
      .addCase(fetchLabTypeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // deleting a lab
      .addCase(deleteLabThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(deleteLabThunk.fulfilled, (state, action) => {
        state.loading = true;
        state.labs = state.labs.filter((lab) => lab._id !== action.payload);
      })
      .addCase(deleteLabThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // updating a lab
      .addCase(updateLabThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLabThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.labs = state.labs.map((lab) =>
          lab._id === action.payload._id ? action.payload : lab
        );
      })
      .addCase(updateLabThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // search labs
      .addCase(searchLabsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchLabsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.labs = action.payload;
      })
      .addCase(searchLabsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Search failed";
      })
  },
});

export default labSlice.reducer;
