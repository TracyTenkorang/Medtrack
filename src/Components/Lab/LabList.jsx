import * as React from "react";
import { useState, useEffect } from "react";

import { FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { FaEye } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { LuSlidersHorizontal } from "react-icons/lu";

import Modal from "react-bootstrap/Modal";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchLabsThunk,
  fetchLabThunk,
  deleteLabThunk,
  updateLabThunk,
  fetchLabTypeThunk,
  searchLabsThunk,
} from "../../store/features/Inventory/labSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";

import EditModal from "../Modal/EditModal";
import DeleteModal from "../Modal/DeleteModal";
import LabDetails from "../Lab/LabDetails";

import { capitalizeAllFL } from "../../Utils/helpers";
import { capitalizeAll } from "../../Utils/helpers";

import TablePagination from "@mui/material/TablePagination";

import CreatableSelect from "react-select/creatable";

const LabList = () => {
  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedLabItem, setDeletedLabItem] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedLabItem, setEditedLabItem] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [selectedLabType, setSelectedLabType] = useState("");

  const dispatch = useDispatch();
  const labs = useSelector((state) => state.laboratory.labs);
  const labType = useSelector((state) => state.laboratory.labs);

  const { register, setValue, handleSubmit, control } = useForm();

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      dispatch(fetchLabsThunk());
    }
  }, [search, dispatch]);

  // function for handling search
  const handleSearch = async (query) => {
    dispatch(searchLabsThunk(query));
  };

  // function for the edit icon
  const editLab = async (lab) => {
    try {
      setShowFormModal(true);

      dispatch(fetchLabThunk(lab._id));
      setValue("_id", lab._id);
      setValue("lab_item", lab.lab_item);
      setValue("lab_type", lab.lab_type);
      setValue("category", lab.category);
      setValue("sub_category", lab.sub_category);
      setValue("code", lab.code);
      setValue("price", lab.price);
    } catch (error) {
      console.error(error);
    }
  };

  // functon for the edit form
  const editSubmit = async (lab) => {
    setEditedLabItem(lab);

    setShowEditModal(true);
    setShowFormModal(false);
  };

  //  function for the editing a lab
  const confirmEdit = async () => {
    try {
      // Make sure the update operation is completed before fetching units
      await dispatch(updateLabThunk(editedLabItem));
      await dispatch(fetchLabTypeThunk());

      toast.success("Lab item updated successfully");
      setShowFormModal(false);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update lab item");
    }
  };

  // function for the delete icon
  const deleteLab = async (lab) => {
    setShowDeleteModal(true);
    setDeletedLabItem(lab);
  };

  // function for deleting a lab
  const confirmDelete = async () => {
    try {
      // Make sure the delete operation is completed before fetching units
      await dispatch(deleteLabThunk(deletedLabItem._id));
      await dispatch(fetchLabTypeThunk());

      toast.success("Drug deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete drug");
    }
  };

  // function for showing lab modal
  const showLabDetails = async (labId) => {
    dispatch(fetchLabThunk(labId._id));
    setShowModal(true);
  };

  // function for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);

    // If the selected option is -1 (All), set the page to 0
    // and rows per page to the total number of items
    if (newRowsPerPage === -1) {
      setPage(0);
      setRowsPerPage(labs.length);
    }
  };

  // handle all FL
  const handleCapitalizeAllFL = (e) => {
    e.target.value = capitalizeAllFL(e.target.value);
  };

  // handle uppercase
  const handleUppercase = (e) => {
    e.target.value = capitalizeAll(e.target.value);
  };

  // function for the filter
  const handleLabTypeSelect = (labType) => {
    setSelectedLabType(labType);

    // Fetch labs based on the selected lab type
    dispatch(fetchLabTypeThunk(labType));
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

      {/* Search bar */}
      <div className="container d-flex justify-content-between pb-3 px-4">
        <span>
          <LuSlidersHorizontal onClick={() => setIsExpand(!isExpand)}  role="button"/>
          {isExpand && (
            <div className="lab-filter-dropdown">
              <label htmlFor="labTypeFilter">Lab Type:</label>
              <select
                id="labTypeFilter"
                onChange={(e) => handleLabTypeSelect(e.target.value)}
                value={selectedLabType}
              >
                <option value="">All</option>
                <option value="Radiology">Radiology</option>
                <option value="Laboratory">Laboratory</option>
              </select>
            </div>
          )}
        </span>
        <span className="search text-dark border border-dark rounded button">
          <BiSearch onClick={() => setIsExpanded(!isExpanded)} role="button" />
          {isExpanded && (
            <input
              className="search-input search-expanded"
              type="search"
              placeholder="Search keyword"
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </span>
      </div>

      {/* Product list */}
      <div className="container">
        <div className="table-container bg-white">
          <table>
            <thead>
              <tr className="text-muted">
                <th>Lab Item</th>
                <th>Lab Type</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Code</th>
                <th>Price (GH&cent;)</th>
                <th>Action</th>
              </tr>
            </thead>
            {labs.length > 0 ? (
              <tbody>
                {labs
                  .filter((lab) => {
                    if (!selectedLabType) {
                      return true;
                    }
                    return lab.lab_type === selectedLabType;
                  })
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((lab) => (
                    <tr key={lab._id}>
                      <td className="lab">{lab.lab_item}</td>
                      <td
                        className="lab"
                        title="Click on the lab item to view full details."
                      >
                        {lab.lab_type}
                      </td>
                      <td
                        className="lab"
                        title="Click on the lab item to view full details."
                      >
                        {lab.category}
                      </td>
                      <td
                        className="lab"
                        title="Click on the lab item to view full details."
                      >
                        {lab.sub_category}
                      </td>
                      <td
                        className="lab"
                        title="Click on the lab item to view full details."
                      >
                        {lab.code}
                      </td>
                      <td
                        className="lab"
                        title="Click on the lab item to view full details."
                      >
                        {lab.price}
                      </td>
                      <td className="text-center">
                        <span
                          onClick={() => showLabDetails(lab)}
                          className="material-symbols-outlined"
                          title="View details"
                        >
                          <FaEye />
                        </span>
                        <span
                          className="material-symbols-outlined px-2"
                          title="update"
                          onClick={() => editLab(lab)}
                        >
                          <TiPencil />
                        </span>
                        <span
                          onClick={() => deleteLab(lab)}
                          className="material-symbols-outlined text-danger"
                          title="delete"
                        >
                          <FaRegTrashAlt />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td className="text-center" colSpan="6">
                    No lab items found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Table Pagination */}
      <TablePagination
        component="div"
        count={labs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
      />

      {/* Form to edit product */}
      <Modal
        size="lg"
        show={showFormModal}
        backdrop="static"
        onHide={() => setShowFormModal(false)}
        aria-labelledby="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal">
            <h1>Edit Lab Item</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(editSubmit)}
            encType="multipart/form-data"
          >
            <div className="formControl">
              <label htmlFor="labItem">Lab Item</label>
              <input
                type="text"
                name="labItem"
                id="labItem"
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
                  editedLabItem
                    ? {
                        value: editedLabItem.category,
                        label: editedLabItem.category,
                      }
                    : null
                }
                render={({ field: { onChange, value } }) => (
                  <CreatableSelect
                  className="edit-select"
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
                  editedLabItem
                    ? {
                        value: editedLabItem.sub_category,
                        label: editedLabItem.sub_category,
                      }
                    : null
                }
                render={({ field: { onChange, value } }) => (
                  <CreatableSelect
                  className="edit-select"
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
                {...register("price", { required: true })}
              />
            </div>

            <div className="formControl">
              <button type="submit" >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <EditModal
        open={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleEdit={confirmEdit}
      />

      <DeleteModal
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={confirmDelete}
      />

      <LabDetails open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default LabList;
