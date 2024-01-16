import { useNavigate } from "react-router-dom";

//components
import PrimaryButtons from "components/buttons/PrimaryButtons";
import SecondaryButtons from "components/buttons/SecondaryButtons";
import { clearBooking } from "store/actions";

interface HaulageButtonProps {
    confirming_booking?: boolean;
    clearBooking?: any
}

const HaulageButtons = ({ confirming_booking, clearBooking }: HaulageButtonProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-end gap-x-6 mt-8">
            <SecondaryButtons
                title="Cancel"
                style={{ padding: "12px 14px" }}
                // onClick={() => clearBooking()}
                onClick={() => {
                    clearBooking();
                    navigate('/dashboard');
                }}
                disabled={false}
                loading={false}
                type={"button"}
                icon={""}
            />
            <PrimaryButtons
                title="Confirm"
                style={{}}
                disabled={false}
                loading={confirming_booking}
                icon={""}
            />
        </div>
    )
}

export default HaulageButtons