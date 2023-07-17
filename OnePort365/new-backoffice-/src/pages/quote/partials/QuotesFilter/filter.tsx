import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from 'components/buttons/DatasheetButton';
import { filterQuotes } from 'store/actions';
import chevronDown from "assets/icons/chevron-down.svg";
import chevronUp from "assets/icons/chevron-up.svg";
import FilterContent from "./filterContent";

const Filter = (props:any) => {
    const {loading, filter_quotes} = props
    const [showFilter, setShowFilter] = useState(false);
    // console.log(filter_quotes)

    // useEffect(() => {
    //     props.filterQuotes();
    // }, [filterQuotes])

    return (
        <>
            
            <>
                <div className='grid grid-cols-10 gap-4'>
                    <div className="col-span-2 px-2 py-2 top-divider right-divider bottom-divider left-divider w-full">
                    {
                        loading ? 
                        (
                            <div className="text-center my-3">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading Filters" loading={loading} />
                                </Link>
                            </div>
                        ) : ( 
                            <>
                                <div className="flex items-center"
                                    onClick={() => {
                                        setShowFilter(!showFilter);
                                    }}
                                >
                                    <p className="upload-text mr-3">Click to Filter</p>
                                    <div className="ml-auto">
                                    <img
                                        src={showFilter ? chevronUp : chevronDown}
                                        alt=""
                                        width={16}
                                    />
                                    </div>
                                </div>
                            </>
                            
                        )
                    }
                       
                    </div>
                </div>
                {
                    showFilter ? (
                        <>
                            <FilterContent 
                                filter={filter_quotes}
                            />
                        </>
                    ) : (
                        <></>
                    )
                }
            </>
        </>
    )
}

// export default Filter;


const mapStateToProps = (state: any) => {
    const { filter_quotes, error, loading } = state.quotes;
    return { filter_quotes, error, loading };
};

export default connect(mapStateToProps, {filterQuotes})(Filter);
