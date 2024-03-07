// import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

import {
  addlabThunk,
  fetchLabsByTypeThunk,
  fetchLabsThunk,
} from "../../store/features/Inventory/labSlice";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddModal from "../Modal/AddModal";

import CreatableSelect from "react-select/creatable";

import { capitalizeAllFL } from "../../Utils/helpers";
import { capitalizeAll } from "../../Utils/helpers";

const AddLab = () => {
  const { register, handleSubmit, getValues, reset, control } = useForm();
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLabItem, setAddLabItem] = useState(null);

  const dispatch = useDispatch();

  const labType = useSelector((state) => state.laboratory.labs);

  // function for the add form button
  const addSubmit = () => {
    const lab = getValues();
    setAddLabItem(lab);

    setShowAddModal(true);
  };

  //  function for the adding a lab item
  const confirmAdd = async () => {
    try {
      const result = await dispatch(addlabThunk(addLabItem));
      if (addlabThunk.fulfilled.match(result)) {
        await dispatch(fetchLabsByTypeThunk());
        await dispatch(fetchLabsThunk());
        setShowAddModal(false);
        setTimeout(() => {
          toast.success("Lab item added successfully");
        }, 0.003);
        reset();
      } else if (addlabThunk.rejected.match(result)) {
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

  // cancel adding lab item
  const handleClose = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    reset();
  };

  // handle all FL
  const handleCapitalizeAllFL = (e) => {
    e.target.value = capitalizeAllFL(e.target.value);
  };

  // handle uppercase
  const handleUppercase = (e) => {
    e.target.value = capitalizeAll(e.target.value);
  };

  // options for the category
  const options = Object.values(labType).reduce((acc, labs) => {
    const existingCategory = acc.find((item) => item.value === labs.category);

    if (existingCategory) {
      existingCategory.count += 1;
    } else {
      acc.push({
        label: labs.category,
        value: labs.category,
        count: 1,
      });
    }

    return acc;
  }, []);

  // options for the sub category
  const optionsSubCategory = Object.values(labType).reduce((acc, labs) => {
    const existingSubCategory = acc.find(
      (item) => item.value === labs.sub_category
    );

    if (existingSubCategory) {
      existingSubCategory.count += 1;
    } else {
      acc.push({
        label: labs.sub_category,
        value: labs.sub_category,
        count: 1,
      });
    }

    return acc;
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="container">
        <form onSubmit={handleSubmit(addSubmit)} encType="multipart/form-data">
          <div className="formControl">
            <label htmlFor="labItem">Lab Item</label>
            <input
              type="text"
              name="labItem"
              id="labItem"
              autoComplete="off"
              placeholder="Blood Test"
              onInput={handleCapitalizeAllFL}
              {...register("lab_item", { required: true })}
            />
          </div>
          <div className="formControl">
            <label htmlFor="labType">Lab Type</label>
            <select
              name="labType"
              id="labType"
              {...register("lab_type", { required: true })}
            >
              <option value="Select">Select lab type</option>
              <option value="Radiology">Radiology</option>
              <option value="Laboratory">Laboratory</option>
            </select>
          </div>
          <div className="formControl">
            <label htmlFor="category">Main Category</label>
            <Controller
              name="category"
              id="category"
              control={control}
              defaultValue={
                addLabItem
                  ? {
                      value: addLabItem.category,
                      label: addLabItem.category,
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
                  options={options.map((option) => ({
                    value: option.value,
                    label: `${option.label}`,
                    count: option.count,
                  }))}
                  value={
                    value ? { value: value, label: value, count: 0 } : null
                  }
                />
              )}
            />
          </div>
          <div className="formControl">
            <label htmlFor="subCategory">Sub Category</label>
            <Controller
              name="sub_category"
              id="sub_category"
              control={control}
              defaultValue={
                addLabItem
                  ? {
                      value: addLabItem.sub_category,
                      label: addLabItem.sub_category,
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
                  options={optionsSubCategory.map((option) => ({
                    value: option.value,
                    label: `${option.label}`,
                    count: option.count,
                  }))}
                  value={
                    value ? { value: value, label: value, count: 0 } : null
                  }
                />
              )}
            />
          </div>
          <div className="formControl">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              name="code"
              id="code"
              autoComplete="off"
              placeholder="BT123"
              onInput={handleUppercase}
              {...register("code", { required: true })}
            />
          </div>

          <div className="formControl">
            <label htmlFor="price" className="price">Price (GH&cent;)</label>
            <input
              type="number"
              name="price"
              id="price"
              autoComplete="off"
              placeholder="50.00"
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

export default AddLab;
