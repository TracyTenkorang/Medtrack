import { Chart } from "react-google-charts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabTypeThunk } from "../../store/features/Inventory/labSlice";

const LabChart = () => {
  const dispatch = useDispatch();
  const labType = useSelector((state) => state.laboratory.labType);

  useEffect(() => {
    dispatch(fetchLabTypeThunk());
  }, [dispatch]);

  const data = Object.entries(labType).map(([label, value]) => [
    label,
    value,
  ]);

  const options = {
    is3D: true,
  };

  // Add the header for the columns
  const dataWithHeader = [["LabType", "Count"], ...data];

  return (
    <>
      <div className="container">
        <div className="stats">
        <h4 className="text-center">Lab Type Distribution</h4>
          <Chart
            chartType="PieChart"
            data={dataWithHeader}
            options={options}
            width={800}
            height={450}
          />
        </div>
      </div>
    </>
  );
};

export default LabChart;
