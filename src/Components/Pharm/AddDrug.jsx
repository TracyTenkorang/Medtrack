import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

import {
  addDrugThunk,
  fetchUnitThunk,
  fetchDrugsThunk,
} from "../../store/features/Inventory/pharmacySlice";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddModal from "../Modal/AddModal";

import { capitalizeAll } from "../../Utils/helpers";
import { capitalizeFL } from "../../Utils/helpers";
import { capitalizeAllFL } from "../../Utils/helpers";

import CreatableSelect from "react-select/creatable";

const AddDrug = () => {
  const { register, control, handleSubmit, getValues, reset } = useForm();

  const unitOfPricing = useSelector((state) => state.pharmacy.unitOfPricing);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addDrug, setAddDrug] = useState(null);

  const dispatch = useDispatch();

  // function for the drug form button
  const addSubmit = () => {
    const drug = getValues();
    setAddDrug(drug);

    setShowAddModal(true);
  };

  //  function for the adding a drug
  const confirmAdd = async () => {
    try {
      const result = await dispatch(addDrugThunk(addDrug));
      if (addDrugThunk.fulfilled.match(result)) {
        await dispatch(fetchUnitThunk());
        await dispatch(fetchDrugsThunk());
        setShowAddModal(false);
        setTimeout(() => {
          toast.success("Drug added successfully");
        }, 0.003);
        reset();
      } else if (addDrugThunk.rejected.match(result)) {
        setShowAddModal(false);
        setTimeout(() => {
          toast.error(result.payload);
        }, 0.003);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add drug");
    }
  };

  // cancel adding drug
  const handleClose = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    reset();
  };

  // handle uppercase
  const handleUppercase = (e) => {
    e.target.value = capitalizeAll(e.target.value);
  };

  // handle FLX
  const handleCapitalizeFL = (e) => {
    e.target.value = capitalizeFL(e.target.value);
  };

  // handle all FL
  const handleCapitalizeAllFL = (e) => {
    e.target.value = capitalizeAllFL(e.target.value);
  };

  const unitOfPricingArray = Object.entries(unitOfPricing).map(
    ([label, count]) => ({
      label,
      count,
    })
  );


  return (
    <>
      <ToastContainer />

      <div className="container">
        <form onSubmit={handleSubmit(addSubmit)} encType="multipart/form-data">
          <div className="formControl">
            <label htmlFor="drugName">Drug Name</label>
            <input
              type="text"
              name="drugName"
              id="drugName"
              autoComplete="off"
              onInput={handleCapitalizeAllFL}
              placeholder="Acetazolamide Tablet"
              {...register("drug_name", { required: true })}
            />
          </div>
          <div className="formControl">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              name="desc"
              id="desc"
              autoComplete="off"
              placeholder="It is a monocarboxylic acid anion resulting…"
              onInput={handleCapitalizeFL}
              {...register("description", { required: true })}
            />
          </div>
          <div className="formControl">
            <label htmlFor="drugCode">Drug Code</label>
            <input
              type="text"
              name="drugCode"
              id="drugCode"
              autoComplete="off"
              placeholder="ACETAZTA1"
              onInput={handleUppercase}
              {...register("drug_code", { required: true })}
            />
          </div>
          <div className="formControl">
            <label htmlFor="unitOfPricing">Unit of Pricing</label>
            <Controller
              name="unit_of_pricing"
              id="unit_of_pricing"
              control={control}
              defaultValue={
                addDrug
                  ? {
                      value: addDrug.unit_of_pricing,
                      label: addDrug.unit_of_pricing,
                      count: 0,
                    }
                  : null
              }
              render={({ field: { onChange, value } }) => (
                <CreatableSelect
                className="select"
                  isClearable
                  onChange={(selectedOption) => {
                    const selectedValue = selectedOption
                      ? selectedOption.value
                      : null;
                    onChange(selectedValue);
                  }}
                  options={unitOfPricingArray.map((option) => ({
                    value: option.label,
                    label: option.label,
                    count: option.count,
                  }))}
                  value={
                    value ? { value: value, label: value, count: 0 } : null
                  }
                  formatOptionLabel={(option) => (
                    <div>{capitalizeFL(option.label)}</div>
                  )}
                />
              )}
            />
          </div>

          <div className="formControl">
            <label htmlFor="price" className="price">
              Price (GH&cent;)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              min={0}
              step="any"
              autoComplete="off"
              placeholder="0.55"
              {...register("price", { required: true })}
            />
          </div>
          <div className="formControl">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>

      <AddModal
        open={showAddModal}
        handleClose={handleClose}
        handleAdd={confirmAdd}
      />
    </>
  );
};

export default AddDrug;
