// import { useState, useEffect } from "react";

// import Modal from "react-bootstrap/Modal";

// import { FaRegTrashAlt } from "react-icons/fa";
// import { TiPencil } from "react-icons/ti";
// import { FaEye } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDrugsThunk,
//   fetchDrugThunk,
//   deleteDrugThunk,
//   updateDrugThunk,
// } from "../store/features/pharmacy/pharmacySlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useForm } from "react-hook-form";
// import DeleteModal from "./Modals/DeleteModal"


// const DrugList = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);


//   // const handleShow = () => setShow(true);

//   const dispatch = useDispatch();
//   const drugs = useSelector((state) => state.pharmacy.drugs);
//   const drug = useSelector((state) => state.pharmacy.drug);

//   const { register, setValue, handleSubmit } = useForm();

//   // fetch request
//   useEffect(() => {
//       dispatch(fetchDrugsThunk());
//   }, [dispatch]);

//   // function for deleting a drug
//   const deletedrug = async (drug) => {
//     setShowDeleteModal(true);
//     dispatch(fetchDrugThunk(drug._id));
//     // try {
//     //   const confirmed = setShow(true);
//     //   if (confirmed) {
//     //     dispatch(deleteDrugThunk(drug));
//     //     toast.success("Drug deleted successfully");
//     //   }
//     // } catch (error) {
//     //   console.error(error);
//     //   toast.error("Failed to delete drug");
//     // }
//   };
//   const confirmDelete = async (drug) => {
//     try {
//       dispatch(deleteDrugThunk(drug._id));
//       toast.success("Drug deleted successfully");
//       setShowDeleteModal(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete drug");
//     }
//   };

//   // function for the edit button
//   const editDrug = async (drug) => {
//     try {
//       setShowFormModal(true);

//       dispatch(fetchDrugThunk(drug._id));

//       setValue("_id", drug._id);
//       setValue("drug_name", drug.drug_name);
//       setValue("description", drug.description);
//       setValue("drug_code", drug.drug_code);
//       setValue("unit_of_pricing", drug.unit_of_pricing);
//       setValue("price", drug.price);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // function for editing a drug
//   const editSubmit = (drug) => {
//     try {
//       const confirmed = confirm("Are you sure you want to update this drug");
//       if (confirmed) {
//         dispatch(updateDrugThunk(drug));

//         setShowFormModal(false);
//         toast.success("Drug updated successfully");
//       }
//       setShowFormModal(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update drug");
//     }
//   };

//   const showProductDetails = (drugId) => {
//     try {
//       console.log(drugId);
//       dispatch(fetchDrugThunk(drugId));
//       setShowModal(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />

//       {/* Product list */}
//       <div className="container">
//         <div className="table-container bg-white">
//           <table>
//             <thead>
//               <tr className="text-muted">
//                 <th>Drug Name</th>
//                 <th>Description</th>
//                 <th>Drug Code</th>
//                 <th>Unit of Pricing</th>
//                 <th>Price (GH&cent;)</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {drugs.map((drug) => (
//                 <tr key={drug._id}>
//                   <td className="drug" title={drug.drug_name} style={{ width: '20%' }}>
//                     {drug.drug_name}
//                   </td>
//                   <td className="drug" title={drug.description} style={{ width: '45%' }}>
//                     {drug.description}
//                   </td>
//                   <td className="drug" title={drug.drug_code} style={{ width: '10%' }}>
//                     {drug.drug_code}
//                   </td>
//                   <td className="drug" title={drug.unit_of_pricing} style={{ width: '10%' }}>
//                     {drug.unit_of_pricing}
//                   </td>
//                   <td className="drug" title={drug.price} style={{ width: '10%' }}>
//                     {drug.price}
//                   </td>
//                   <td className="drug" style={{ width: '17%' }}>
//                     <span
//                       onClick={() => showProductDetails(drug)}
//                       className="material-symbols-outlined"
//                       title="View details"
//                     >
//                       <FaEye />
//                     </span>
//                     <span
//                       className="material-symbols-outlined px-2"
//                       title="update"
//                       onClick={() => editDrug(drug)}
//                     >
//                       <TiPencil />
//                     </span>
//                     <span
//                       onClick={() => deletedrug(drug._id)}
//                       className="material-symbols-outlined text-danger"
//                       title="delete"
//                     >
//                       <FaRegTrashAlt />
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <DeleteModal
//         show={showDeleteModal}
//         handleClose={() => setShowDeleteModal(false)}
//         handleDelete={confirmDelete}
//       />

//       {/* Product details */}
//       <Modal
//         size="lg"
//         show={showModal}
//         backdrop="static"
//         onHide={() => setShowModal(false)}
//         aria-labelledby="modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="modal">
//             <h1>Product Details</h1>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="details">
//             <h4>Drug Name</h4>
//             <p>{drug.drug_name}</p>
//           </div>

//           <div className="details">
//             <h4>Description</h4>
//             <p>{drug.description}</p>
//           </div>
//           <div className="details">
//             <h4>Drug Code</h4>
//             <p>{drug.drug_code}</p>
//           </div>
//           <div className="details">
//             <h4>Unit of Pricing</h4>
//             <p>{drug.unit_of_pricing}</p>
//           </div>
//           <div className="details">
//             <h4>Price (Ghc)</h4>
//             <p>{drug.price}</p>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* Form to edit product */}
//       <Modal
//         size="lg"
//         show={showFormModal}
//         backdrop="static"
//         onHide={() => setShowFormModal(false)}
//         aria-labelledby="modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="modal">
//             <h1>Edit Drug</h1>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form
//             onSubmit={handleSubmit(editSubmit)}
//             encType="multipart/form-data"
//           >
//             <div className="formControl">
//               <label htmlFor="drugName">Drug Name</label>
//               <input
//                 type="text"
//                 name="drugName"
//                 id="drugName"
//                 {...register("drug_name", { required: true })}
//               />
//             </div>
//             <div className="formControl">
//               <label htmlFor="desc">Description</label>
//               <input
//                 type="text"
//                 name="desc"
//                 id="desc"
//                 {...register("description", { required: true })}
//               />
//             </div>
//             <div className="formControl">
//               <label htmlFor="drugCode">Drug Code</label>
//               <input
//                 type="text"
//                 name="drugCode"
//                 id="drugCode"
//                 {...register("drug_code", { required: true })}
//               />
//             </div>
//             <div className="formControl">
//               <label htmlFor="unitOfPricing">Unit of Pricing</label>
//               <input
//                 type="text"
//                 name="unitOfPricing"
//                 id="unitOfPricing"
//                 {...register("unit_of_pricing", { required: true })}
//               />
//             </div>
//             <div className="formControl">
//               <label htmlFor="price">Price (GH&cent;)</label>
//               <input
//                 type="number"
//                 name="price"
//                 id="price"
//                 step="any"
//                 {...register("price", { required: true })}
//               />
//             </div>

//             <button type="submit" className="editBtn">
//               Update
//             </button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default DrugList;


// import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// eslint-disable-next-line react/prop-types
const DeleteModal = ({ show, handleClose, handleDelete }) => {

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this drug?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
