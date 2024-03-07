import * as React from "react";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

import Modal from "react-bootstrap/Modal";

import { FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { FaEye } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchDrugsThunk,
  fetchDrugThunk,
  deleteDrugThunk,
  updateDrugThunk,
  fetchUnitThunk,
  searchDrugsThunk,
} from "../../store/features/Inventory/pharmacySlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, Controller } from "react-hook-form";

import DeleteModal from "../Modal/DeleteModal";
import EditModal from "../Modal/EditModal";
import DrugDetails from "../Pharm/DrugDetails";

import { capitalizeAll } from "../../Utils/helpers";
import { capitalizeFL } from "../../Utils/helpers";
import { capitalizeAllFL } from "../../Utils/helpers";

import TablePagination from "@mui/material/TablePagination";

import CreatableSelect from "react-select/creatable";

// eslint-disable-next-line react/prop-types
const DrugList = () => {
  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedDrug, setDeletedDrug] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedDrug, setEditedDrug] = useState(null);

  const { register, setValue, handleSubmit, control } = useForm();

  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useDispatch();
  const drugs = useSelector((state) => state.pharmacy.drugs);

  const unitOfPricing = useSelector((state) => state.pharmacy.unitOfPricing);

  // fetching all drugs
  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      dispatch(fetchDrugsThunk());
    }
  }, [search, dispatch]);

  // function for handling search
  const handleSearch = async (query) => {
    dispatch(searchDrugsThunk(query));
  };

  // function for showing drug modal
  const showDrugDetails = async (drug) => {
    dispatch(fetchDrugThunk(drug));
    setShowModal(true);
  };

  // function for the edit icon
  const editDrug = async (drug) => {
    try {
      setShowFormModal(true);

      setValue("_id", drug._id);
      setValue("drug_name", drug.drug_name);
      setValue("description", drug.description);
      setValue("drug_code", drug.drug_code);
      setValue("unit_of_pricing", drug.unit_of_pricing);
      setValue("price", drug.price);
    } catch (error) {
      console.error(error);
    }
  }; 

  // functon for the edit form
  const editSubmit = async (drug) => {
    setEditedDrug(drug);

    setShowEditModal(true);
    setShowFormModal(false);
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
      setRowsPerPage(drugs.length);
    }
  };

  //  function for the editing a drug
  const confirmEdit = async () => {
    try {
      // Make sure the update operation is completed before fetching units
      await dispatch(updateDrugThunk(editedDrug));
      await dispatch(fetchUnitThunk());

      toast.success("Drug updated successfully");
      setShowFormModal(false);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update drug");
    }
  };

  // function for the delete icon
  const deletedrug = async (drug) => {
    setShowDeleteModal(true);
    setDeletedDrug(drug);
  };

  // function for deleting a drug
  const confirmDelete = async () => {
    try {
      // Make sure the delete operation is completed before fetching units
      await dispatch(deleteDrugThunk(deletedDrug._id));
      await dispatch(fetchUnitThunk());

      toast.success("Drug deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete drug");
    }
  };

  // handle uppercase
  const handleUppercase = (e) => {
    e.target.value = capitalizeAll(e.target.value);
  };

  // handle FL
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

      {/* Search bar */}
      <div className="container text-end pb-3 px-4">
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
          <table className="rounded">
            <thead>
              <tr className="text-muted rounded">
                <th>Drug Name</th>
                <th>Description</th>
                <th>Drug Code</th>
                <th>Unit of Pricing</th>
                <th>Price (GH&cent;)</th>
                <th>Action</th>
              </tr>
            </thead>
            {drugs.length > 0 ? (
              <tbody>
                {drugs
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((drug) => (
                    <tr key={drug._id}>
                      <td
                        className="drug"
                        title={drug.drug_name}
                        style={{ width: "20%" }}
                      >
                        {drug.drug_name}
                      </td>
                      <td
                        className="drug"
                        title={drug.description}
                        style={{ width: "32%" }}
                      >
                        {drug.description}
                      </td>
                      <td
                        className="drug"
                        title={drug.drug_code}
                        style={{ width: "15%" }}
                      >
                        {drug.drug_code}
                      </td>
                      <td
                        className="drug"
                        title={drug.unit_of_pricing}
                        style={{ width: "15%" }}
                      >
                        {drug.unit_of_pricing}
                      </td>
                      <td
                        className="drug"
                        title={drug.price}
                        style={{ width: "15%" }}
                      >
                        {drug.price}
                      </td>
                      <td className="drug" style={{ width: "20%" }}>
                        <span
                          onClick={() => showDrugDetails(drug._id)}
                          className="material-symbols-outlined"
                          title="View details"
                        >
                          <FaEye />
                        </span>
                        <span
                          className="material-symbols-outlined px-3"
                          title="update"
                          onClick={() => editDrug(drug)}
                        >
                          <TiPencil />
                        </span>
                        <span
                          onClick={() => deletedrug(drug)}
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
                    No drugs found
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
        count={drugs.length}
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
            <h1>Edit Drug</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(editSubmit)}
            encType="multipart/form-data"
          >
            <div className="formControl">
              <label htmlFor="drugName">Drug Name</label>
              <input
                type="text"
                name="drugName"
                id="drugName"
                autoComplete="off"
                onInput={handleCapitalizeAllFL}
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
                  editedDrug
                    ? {
                        value: editedDrug.unit_of_pricing,
                        label: editedDrug.unit_of_pricing,
                        count: 0,
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
              <label htmlFor="price">Price (GH&cent;)</label>
              <input
                type="number"
                name="price"
                id="price"
                step="any"
                autoComplete="off"
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

      {/* Product details */}
      <DrugDetails open={showModal} handleClose={() => setShowModal(false)} />

      <DeleteModal
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={confirmDelete}
      />

      <EditModal
        open={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleEdit={confirmEdit}
      />
    </>
  );
};

export default DrugList;
