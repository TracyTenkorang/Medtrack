import { Chart } from "react-google-charts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnitThunk } from "../../store/features/Inventory/pharmacySlice";

const PharmChart = () => {
  const dispatch = useDispatch();
  const unitOfPricing = useSelector((state) => state.pharmacy.unitOfPricing);

  useEffect(() => {
    dispatch(fetchUnitThunk());
  }, [dispatch]);

  const data = Object.entries(unitOfPricing).map(([label, value]) => [
    label,
    value,
  ]);

  const options = {
    is3D: true,
  };

  // Add the header for the columns
  const dataWithHeader = [["Unit of Pricing", "Count"], ...data];

  return (
    <>
      <div className="container ">
        <div className="stats">
          <h4 className="text-center">Unit of Pricing Distribution</h4>
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

export default PharmChart;
