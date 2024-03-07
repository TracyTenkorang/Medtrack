import Navbar from "../Components/Navbar";
import AddLab from "../Components/Lab/AddLab";
import LabChart from "../Components/Lab/LabChart";
import LabList from "../Components/Lab/LabList";
import Sidebar from "../Components/Sidebar";

const Lab = () => {
  return (
    <>
      <Navbar />

      <div className="wrapper">
        <Sidebar />

        <div className="main container">
          <div className="section pt-5">
            <div className="">
            <AddLab />
            </div>
            <div>
            <LabChart />
            </div>
          </div>

          <div className="py-5">
            <LabList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lab;
